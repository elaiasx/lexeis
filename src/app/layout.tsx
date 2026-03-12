import React from 'react'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Providers } from '@/app/providers'
import { MainLayout } from '@/components/layouts/MainLayout'
import { ErrorBoundary } from '@/components/error/ErrorBoundary'

export const metadata: Metadata = {
  title: 'Λεξιλόγειον - Συνεργατικό Wiki Λεξικό',
  description: 'Ένα συνεργατικό wiki λεξικό για τη μάθηση της ελληνικής γλώσσας με gamification, challenges και study tools.',
  keywords: ['ελληνικά', 'λεξικό', 'εκπαίδευση', 'wiki', 'collaborative'],
  authors: [{ name: 'Lexilogeion Team' }],
  creator: 'Lexilogeion Contributors',
  openGraph: {
    type: 'website',
    locale: 'el_GR',
    url: 'https://lexilogeion.vercel.app',
    siteName: 'Λεξιλόγειον',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Λεξιλόγειον',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@lexilogeion',
  },
  category: 'Education',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="el" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#FF6B6B" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <ErrorBoundary>
          <Providers>
            <MainLayout>
              {children}
            </MainLayout>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
