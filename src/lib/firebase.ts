import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase only once. During build or when API key is missing we skip initialization
let app: ReturnType<typeof initializeApp> | null = null

let hasWarned = false
if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  try {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }
  } catch (err) {
    if (!hasWarned) {
      console.warn('Firebase initialization error (will continue without Firebase):', err)
      hasWarned = true
    }
    app = null
  }
} else {
  // running in build-time or environment not configured
  if (!hasWarned) {
    console.warn('Firebase API key missing, skipping initialization')
    hasWarned = true
  }
}

// Initialize services (fallback stubs to avoid runtime errors)
export const auth = app ? getAuth(app) : ({} as ReturnType<typeof getAuth>)
export const db = app ? getDatabase(app) : ({} as ReturnType<typeof getDatabase>)
export const storage = app ? getStorage(app) : ({} as ReturnType<typeof getStorage>)

export default app
