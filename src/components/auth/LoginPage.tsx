'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useToastStore } from '@/lib/stores/toastStore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const addToast = useToastStore((state) => state.addToast)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Εισάγετε ένα έγκυρο email'
    }

    if (password.length < 6) {
      newErrors.password = 'Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, email, password)

      addToast('Επιτυχογενής σύνδεση!', 'success')
      router.push('/')
    } catch (error: any) {
      const message = error.code === 'auth/user-not-found'
        ? 'Ο λογαριασμός δεν βρέθηκε'
        : error.code === 'auth/wrong-password'
        ? 'Λάθος κωδικός'
        : 'Σφάλμα σύνδεσης'

      addToast(message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md card">
        <h1 className="text-3xl font-bold mb-6 text-center">🔐 Σύνδεση</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="your@email.com"
          />

          <Input
            label="Κωδικός"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="••••••"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            Σύνδεση
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="mb-2">Δεν έχετε λογαριασμό;</p>
          <Link href="/auth/signup" className="text-primary font-bold hover:opacity-70">
            Δημιουργήστε έναν τώρα →
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
