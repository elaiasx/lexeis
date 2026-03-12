'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useApp } from '@/lib/context/AppContext'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'

export function EntriesPage() {
  const { entries: entriesObj, isLoading } = useApp()
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all')

  // Convert entries object to array
  const entries = Array.isArray(entriesObj) 
    ? entriesObj 
    : Object.entries(entriesObj || {}).map(([id, entry]: any) => ({ id, ...entry }))

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = entry.lemma.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof entry.semaies === 'string' 
        ? entry.semaies.toLowerCase().includes(searchTerm.toLowerCase())
        : Array.isArray(entry.semaies)
        ? entry.semaies.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()))
        : false)
    
    const matchesDifficulty = selectedDifficulty === 'all' || entry.difficulty === selectedDifficulty

    return matchesSearch && matchesDifficulty
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">📚 Λήμματα</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{entries.length} λήμματα στη βάση δεδομένων</p>
        </div>
        <Button variant="primary" size="lg" onClick={() => setIsCreateModalOpen(true)}>
          ➕ Νέο Λήμμα
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <Input
          placeholder="🔍 Αναζήτηση λημμάτων..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex gap-2 flex-wrap">
          {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
            <Button
              key={diff}
              variant={selectedDifficulty === diff ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedDifficulty(diff)}
            >
              {diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : diff === 'hard' ? '🔴' : '⭐'} {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Entries Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full text-center py-12">
            <div className="inline-block animate-spin text-4xl">⟳</div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Φόρτωση λημμάτων...</p>
          </div>
        ) : filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <Link key={entry.id} href={`/entries/${entry.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <div className="pb-4 border-b border-gray-200 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-primary">{entry.lemma}</h3>
                  <p className="text-xs text-gray-500 mt-1">by {entry.author}</p>
                </div>

                <div className="py-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                    {entry.semaies[0] || 'Κανένα σημείωμα'}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap items-center justify-between">
                  <div className="flex gap-2">
                    <Badge variant="success">{entry.difficulty}</Badge>
                    <Badge variant="secondary">❤️ {entry.likes || 0}</Badge>
                  </div>
                  <span className="text-lg">→</span>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-600 dark:text-gray-400">
            <p className="text-lg">Δεν βρέθηκαν λήμματα 😢</p>
            <p className="text-sm mt-2">Δοκιμάστε διαφορετικό όρο αναζήτησης</p>
          </div>
        )}
      </div>

      {/* Create Entry Modal */}
      <CreateEntryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}

function CreateEntryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { createEntry } = useApp()
  const [formData, setFormData] = useState({
    lemma: '',
    meaning: '',
    difficulty: 'easy' as const,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createEntry({
        lemma: formData.lemma,
        semaies: [formData.meaning],
        difficulty: formData.difficulty,
        author: 'guest',
        isPublic: true,
        likes: 0,
      } as any)

      onClose()
      setFormData({ lemma: '', meaning: '', difficulty: 'easy' })
    } catch (error) {
      console.error('Error creating entry:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="✨ Νέο Λήμμα" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Λήμμα (Greek Word)"
          value={formData.lemma}
          onChange={(e) => setFormData({ ...formData, lemma: e.target.value })}
          placeholder="π.χ. αγάπη"
          required
        />

        <div>
          <label className="block text-sm font-bold mb-2">Σημασία</label>
          <textarea
            value={formData.meaning}
            onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
            placeholder="Εισάγετε την κύρια σημασία..."
            className="input-field min-h-[100px] resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Δυσκολία</label>
          <select
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
            className="input-field"
          >
            <option value="easy">🟢 Εύκολο</option>
            <option value="medium">🟡 Μέσο</option>
            <option value="hard">🔴 Δύσκολο</option>
          </select>
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="flex-1">
            Δημιουργία
          </Button>
          <Button type="button" variant="ghost" size="lg" onClick={onClose} className="flex-1">
            Ακύρωση
          </Button>
        </div>
      </form>
    </Modal>
  )
}
