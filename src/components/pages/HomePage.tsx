'use client'

import Link from 'next/link'

export function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 md:p-20 text-white">
        <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">
          Λεξιλόγειον
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl">
          Το συνεργατικό wiki λεξικό για τη μάθηση της ελληνικής γλώσσας με gamification, challenges και study tools.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link href="/entries" className="bg-white text-primary px-6 py-3 rounded-lg font-bold hover:opacity-90 transition">
            ➡️ Εξερεύνηση Λημμάτων
          </Link>
          <Link href="/auth/login" className="border-2 border-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:bg-opacity-10 transition">
            🔐 Σύνδεση
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">✨ Γιατί Λεξιλόγειον;</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '📚',
              title: 'Συνεργατικό',
              description: 'Δημιουργήστε και μοιραστείτε λήμματα με τη δική σας κοινότητα μάθησης.'
            },
            {
              icon: '🎮',
              title: 'Gamification',
              description: 'Flashcards, quizzes, και challenges για μια διαδραστική εμπειρία μάθησης.'
            },
            {
              icon: '📊',
              title: 'Smart Analytics',
              description: 'Παρακολουθήστε την πρόοδό σας με σύγχρονες στατιστικές και insights.'
            },
            {
              icon: '🔄',
              title: 'Spaced Repetition',
              description: 'Επιστημονικά-βασισμένη διάταξη επανάληψης για καλύτερη απομνημόνευση.'
            },
            {
              icon: '🌐',
              title: 'Προσβάσιμο',
              description: 'Πλήρης υποστήριξη dark mode, accessibility και mobile-first design.'
            },
            {
              icon: '🛡️',
              title: 'Ασφαλές',
              description: 'Enterprise-grade ασφάλεια, encryption και data privacy compliance.'
            },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 hover:shadow-md transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 dark:bg-slate-900 rounded-2xl p-12">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">5000+</div>
            <p className="text-gray-600 dark:text-gray-400">Λήμματα</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-secondary mb-2">1,234</div>
            <p className="text-gray-600 dark:text-gray-400">Χρήστες Ενεργοί</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-warning mb-2">100+</div>
            <p className="text-gray-600 dark:text-gray-400">Challenges</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-success mb-2">10K</div>
            <p className="text-gray-600 dark:text-gray-400">Likes Συνολικά</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Πρέτοιμοι να ξεκινήσετε;</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Δημιουργήστε τον λογαριασμό σας σήμερα και αρχίστε τη μάθησή σας!</p>
        <Link href="/auth/signup" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition">
          Δημιουργία Λογαριασμού 🚀
        </Link>
      </section>
    </div>
  )
}
