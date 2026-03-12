import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function GET() {
  try {
    // simple write using admin credentials; requires service account env vars
    await adminDb.ref('adminTest').set({
      message: 'hello from admin',
      timestamp: Date.now(),
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
