'use client'

import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div className={`card ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="pb-4 border-b border-gray-200 dark:border-slate-800">{children}</div>
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="py-4">{children}</div>
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="pt-4 border-t border-gray-200 dark:border-slate-800 flex gap-2">{children}</div>
}
