// Core Types
export interface User {
  id: string
  username: string
  usernameLower: string
  email?: string
  role: 'student' | 'teacher' | 'admin'
  createdAt: number
  updatedAt: number
  avatar?: string
  bio?: string
  bookmarks?: Record<string, boolean>
  studyItems?: Record<string, StudyItem>
  streak?: number
  xp?: number
  level?: number
  badges?: string[]
}

export interface Entry {
  id?: string
  lemma: string
  semaies: string
  definition?: string
  synonyma: string
  antonyma: string
  paradeigma: string
  example?: string
  etymology?: string
  week: number
  tag: string
  author: string
  authorId: string
  isPublic: boolean
  createdAt: number
  updatedAt: number
  likes: number
  views: number
  likedBy?: Record<string, boolean>
  collaborators?: Record<string, boolean>
  difficulty?: 'easy' | 'medium' | 'hard'
  teacherFeatured?: boolean
  version?: number
}

export interface Comment {
  id?: string
  text: string
  author: string
  authorId: string
  timestamp: number
  entryId: string
  edited?: boolean
  editedAt?: number
}

export interface StudyItem {
  entryId: string
  addedAt: number
  lastReviewed?: number
  reviewCount: number
  difficulty: 'easy' | 'medium' | 'hard'
  lastInterval?: number
  repetitions?: number
  nextReview?: string
}

export interface Challenge {
  id?: string
  title: string
  description?: string
  tag: string
  startAt: number
  endAt: number
  scoringMode: 'entries' | 'likes'
  isPublic: boolean
  createdAt: number
  createdBy: string
}

export interface Message {
  id?: string
  text: string
  fromId: string
  fromName: string
  toId: string
  toName: string
  timestamp: number
  read: boolean
  entryId?: string
}

export interface ErrorLog {
  id?: string
  message: string
  stack?: string
  timestamp: number
  userId?: string
  context?: Record<string, any>
  severity: 'info' | 'warning' | 'error' | 'critical'
}

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export type AppState = {
  currentUser: User | null
  entries: Record<string, Entry>
  users: Record<string, User>
  comments: Record<string, Record<string, Comment>>
  bookmarks: Record<string, boolean>
  studyItems: Record<string, StudyItem>
  challenges: Record<string, Challenge>
  messages: Record<string, Message>
  tags: string[]
  isLoading: boolean
  error: string | null
}
