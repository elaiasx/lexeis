import admin, { ServiceAccount } from 'firebase-admin'
import { getApps } from 'firebase-admin/app'
import { getDatabase as getAdminDatabase } from 'firebase-admin/database'
import { getAuth as getAdminAuth } from 'firebase-admin/auth'
import { getStorage as getAdminStorage } from 'firebase-admin/storage'

// Firebase admin credentials must be kept on the server and never shipped
// to the browser.  In a Next.js project you typically call this module
// from an API route or `getServerSideProps`/`getStaticProps` so it only
// runs on the server side.

// Build a ServiceAccount object from environment variables.  The
// private key often contains newline characters which are encoded as
// "\n" when stored in an env file, so we make a quick replacement.
function getServiceAccount(): ServiceAccount {
  if (!process.env.FIREBASE_ADMIN_PROJECT_ID ||
      !process.env.FIREBASE_ADMIN_CLIENT_EMAIL ||
      !process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
    throw new Error(
      'Missing Firebase admin credentials. See .env.example and README.'
    )
  }

  return {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }
}

// we defer the type annotation to the initializer so TypeScript
// can infer the correct union of `App` types from both imports.
const adminApp =
  getApps().length === 0
    ? admin.initializeApp({
        credential: admin.credential.cert(getServiceAccount()),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      })
    : getApps()[0]


export const adminDb = getAdminDatabase(adminApp)
export const adminAuth = getAdminAuth(adminApp)
export const adminStorage = getAdminStorage(adminApp)

export default adminApp
