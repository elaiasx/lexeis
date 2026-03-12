import { Toast } from '@/types'
import { create } from 'zustand'

interface ToastStore {
  toasts: Toast[]
  addToast: (message: string, type: Toast['type'], duration?: number) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  
  addToast: (message, type, duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9)
    
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }]
    }))

    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id)
        }))
      }, duration)
    }
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }))
  },

  clearToasts: () => {
    set({ toasts: [] })
  }
}))

export const showToast = (message: string, type: Toast['type'] = 'info', duration?: number) => {
  useToastStore.getState().addToast(message, type, duration)
}
