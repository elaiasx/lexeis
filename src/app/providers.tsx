'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { AppProvider } from '@/lib/context/AppContext'
import { ToastProvider } from '@/components/toast/ToastProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AppProvider>
    </ThemeProvider>
  )
}
