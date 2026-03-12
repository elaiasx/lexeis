'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useToastStore } from '@/lib/stores/toastStore'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'

export function SignupPage() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const addToast = useToastStore((state) => state.addToast)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.username.length < 3) {
      newErrors.username = 'Το όνομα πρέπει να έχει τουλάχιστον 3 χαρακτήρες'
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Εισάγετε ένα έγκυρο email'
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Οι κωδικοί δεν ταιριάζουν'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const auth = getAuth()
      const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password)

      // Update profile with username
      await updateProfile(user, { displayName: formData.username })

      // Create user document in Realtime Database
      const db = getDatabase()
      await set(ref(db, `users/${user.uid}`), {
        username: formData.username,
        email: formData.email,
        createdAt: new Date().toISOString(),
        role: 'student',
        xp: 0,
        level: 1,
        streak: 0,
        badges: [],
        bookmarks: [],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username}`,
      })

      addToast('Λογαριασμός δημιουργήθηκε με επιτυχία!', 'success')
      router.push('/')
    } catch (error: any) {
      const message = error.code === 'auth/email-already-in-use'
        ? 'Το email χρησιμοποιείται ήδη'
        : 'Σφάλμα δημιουργίας λογαριασμού'

      addToast(message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md card">
        <h1 className="text-3xl font-bold mb-6 text-center">✨ Δημιουργία Λογαριασμού</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <Input
            label="Όνομα Χρήστη"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            error={errors.username}
            placeholder="lexeis_fan"
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            placeholder="your@email.com"
          />

          <Input
            label="Κωδικός"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            placeholder="••••••"
          />

          <Input
            label="Επιβεβαίωση Κωδικού"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
            placeholder="••••••"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            Δημιουργία
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="mb-2">Έχετε ήδη λογαριασμό;</p>
          <Link href="/auth/login" className="text-primary font-bold hover:opacity-70">
            Συνδεθείτε εδώ →
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-800">
          <Link href="/" className="text-primary font-bold hover:opacity-70 text-sm">
            ← Επιστροφή στην αρχική
          </Link>
        </div>
      </div>
    </div>
  )
}
