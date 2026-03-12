'use client'

import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export function Input({
  label,
  error,
  helperText,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random()}`

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`input-field ${error ? 'border-danger focus:ring-danger' : ''}`}
        {...props}
      />
      {error && <p className="text-danger text-sm mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{helperText}</p>
      )}
    </div>
  )
}
