'use client'

import React from 'react'
import { Navigation } from '@/components/layouts/Navigation'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navigation />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {children}
      </main>
      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 mt-16">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">📚 Λεξιλόγειον</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Συνεργατικό Wiki Λεξικό για τη μάθηση της ελληνικής γλώσσας.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Δρ</h4>
            <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="/" className="hover:text-primary">Αρχική</a></li>
              <li><a href="/" className="hover:text-primary">Λήμματα</a></li>
              <li><a href="/" className="hover:text-primary">Gamification</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Νομικά</h4>
            <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="/privacy" className="hover:text-primary">Privacy</a></li>
              <li><a href="/terms" className="hover:text-primary">Terms</a></li>
              <li><a href="/contact" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Σε Επαφή</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              📧 info@lexilogeion.gr<br />
              🐙 GitHub: lexilogeion<br />
              🐦 Twitter: @lexilogeion
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-slate-800 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2024 Λεξιλόγειον. Με ❤️ από την κοινότητα.</p>
        </div>
      </div>
    </footer>
  )
}
