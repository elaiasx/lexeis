'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-800 sticky top-0 z-40">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-poppins font-bold text-xl hover:opacity-80">
            <span className="text-2xl">📚</span>
            <span>Λεξιλόγειον</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition">
              Αρχική
            </Link>
            <Link href="/entries" className="text-sm font-medium hover:text-primary transition">
              Λήμματα
            </Link>
            <Link href="/challenges" className="text-sm font-medium hover:text-primary transition">
              Διαγωνισμοί
            </Link>
            <Link href="/gamification" className="text-sm font-medium hover:text-primary transition">
              Gamification
            </Link>
            <Link href="/study" className="text-sm font-medium hover:text-primary transition">
              Μελέτη
            </Link>
            <Link href="/auth/login" className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
              Σύνδεση
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <span className="text-2xl">{isOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
              Αρχική
            </Link>
            <Link href="/entries" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
              Λήμματα
            </Link>
            <Link href="/challenges" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
              Διαγωνισμοί
            </Link>
            <Link href="/gamification" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
              Gamification
            </Link>
            <Link href="/study" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
              Μελέτη
            </Link>
            <Link href="/auth/login" className="block px-4 py-2 bg-primary text-white rounded-lg text-center hover:opacity-90">
              Σύνδεση
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
