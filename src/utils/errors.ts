/**
 * Error Handling Utility
 * Provides custom error classes and handlers for the application
 */

export class AppError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string,
    public context?: Record<string, any>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super('VALIDATION_ERROR', 422, message, context)
    this.name = 'ValidationError'
  }
}

export class AuthError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super('AUTH_ERROR', 401, message, context)
    this.name = 'AuthError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super('NOT_FOUND', 404, message, context)
    this.name = 'NotFoundError'
  }
}

export class PermissionError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super('PERMISSION_DENIED', 403, message, context)
    this.name = 'PermissionError'
  }
}

export class RateLimitError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super('RATE_LIMIT_EXCEEDED', 429, message, context)
    this.name = 'RateLimitError'
  }
}

// Global error logger
export const logError = (error: unknown, context?: Record<string, any>) => {
  const errorData = {
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    code: error instanceof AppError ? error.code : 'UNKNOWN',
    timestamp: new Date().toISOString(),
    context,
  }

  console.error('[ERROR]', errorData)

  // Send to error monitoring service (e.g., Sentry)
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // await sendToErrorService(errorData)
  }

  return errorData
}

// Retry logic with exponential backoff
export async function retryAsync<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      const delay = delayMs * Math.pow(2, i)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  throw new Error('Retry failed')
}
