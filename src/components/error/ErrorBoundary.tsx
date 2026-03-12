'use client'

import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">❌ Κάτι Πήγε Στραβά</h1>
            <p className="text-gray-700 mb-6">
              {this.state.error?.message || 'Ένα σφάλμα προέκυψε. Παρακαλώ δοκιμάστε ξανά αργότερα.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              🔄 Ανανέωση Σελίδας
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
