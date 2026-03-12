'use client'

import React, { ReactNode } from 'react'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  disabled?: boolean
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseStyles = 'font-bold rounded-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-poppins'

  const variants = {
    primary: 'bg-primary text-white hover:opacity-90',
    secondary: 'bg-secondary text-white hover:opacity-90',
    ghost: 'border border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-800',
    danger: 'bg-danger text-white hover:opacity-90',
  }

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block">
          <span className="inline-block animate-spin">⟳</span> Loading...
        </span>
      ) : (
        children
      )}
    </button>
  )
}
