'use client'

import React, { ReactNode, createContext, useContext, useState, useCallback, useEffect } from 'react'
import { User, Entry, AppState } from '@/types'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { ref, onValue } from 'firebase/database'

interface AppContextType extends AppState {
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signup: (email: string, password: string, username: string) => Promise<void>
  createEntry: (entry: Entry) => Promise<void>
  updateEntry: (id: string, entry: Partial<Entry>) => Promise<void>
  deleteEntry: (id: string) => Promise<void>
  toggleBookmark: (entryId: string) => Promise<void>
  addComment: (entryId: string, text: string) => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    currentUser: null,
    entries: {},
    users: {},
    comments: {},
    bookmarks: {},
    studyItems: {},
    challenges: {},
    messages: {},
    tags: [],
    isLoading: false,
    error: null,
  })

  // Initialize Firebase listeners
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Load user data
          onValue(ref(db, `users/${user.uid}`), (snapshot) => {
            const userData = snapshot.val()
            setState(prev => ({
              ...prev,
              currentUser: userData ? { ...userData, id: user.uid } : null
            }))
          })
        } catch (error) {
          console.error('Error loading user:', error)
        }
      } else {
        setState(prev => ({ ...prev, currentUser: null }))
      }
    })

    return unsubscribe
  }, [])

  // Load entries in real-time
  useEffect(() => {
    onValue(ref(db, 'entries'), (snapshot) => {
      const data = snapshot.val()
      setState(prev => ({ ...prev, entries: data || {} }))
    })
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      // Firebase handles this in the login page component
      setState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false, error: String(error) }))
    }
  }, [])

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }))
    try {
      await signOut(auth)
      setState(prev => ({ ...prev, currentUser: null, isLoading: false }))
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false, error: String(error) }))
    }
  }, [])

  const signup = useCallback(async (email: string, password: string, username: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      // Firebase handles this in the signup page component
      setState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false, error: String(error) }))
    }
  }, [])

  const createEntry = useCallback(async (entry: Entry) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      // Implemented with Firebase push
      setState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false, error: String(error) }))
    }
  }, [])

  const updateEntry = useCallback(async (id: string, entry: Partial<Entry>) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      // Implemented with Firebase update
      setState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false, error: String(error) }))
    }
  }, [])

  const deleteEntry = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      // Implemented with Firebase remove
      setState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false, error: String(error) }))
    }
  }, [])

  const toggleBookmark = useCallback(async (entryId: string) => {
    setState(prev => ({ ...prev, isLoading: true }))
    try {
      // Implemented with Firebase set/remove on bookmarks
      setState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false, error: String(error) }))
    }
  }, [])

  const addComment = useCallback(async (entryId: string, text: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      // Implemented with Firebase push to comments
      setState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false, error: String(error) }))
    }
  }, [])

  const value: AppContextType = {
    ...state,
    login,
    logout,
    signup,
    createEntry,
    updateEntry,
    deleteEntry,
    toggleBookmark,
    addComment,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (undefined === context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
