import * as Sentry from '@sentry/nextjs';

/**
 * Error monitoring utilities for FADDL MATCH
 * Works with or without Sentry configuration
 */

export function captureError(error: Error, context?: Record<string, any>) {
  // Log to console for development
  console.error('Error captured:', error, context);
  
  // Send to Sentry if configured
  if (process.env.SENTRY_DSN) {
    Sentry.captureException(error, {
      tags: {
        component: 'error-monitoring',
        app: 'faddl-match',
      },
      extra: context,
    });
  }
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', context?: Record<string, any>) {
  // Log to console for development
  console[level === 'warning' ? 'warn' : level === 'error' ? 'error' : 'log'](message, context);
  
  // Send to Sentry if configured
  if (process.env.SENTRY_DSN) {
    Sentry.captureMessage(message, level, {
      tags: {
        component: 'error-monitoring',
        app: 'faddl-match',
      },
      extra: context,
    });
  }
}

export function setUserContext(userId: string, email?: string) {
  if (process.env.SENTRY_DSN) {
    Sentry.setUser({
      id: userId,
      email: email,
    });
  }
}

export function addBreadcrumb(message: string, category: string, data?: Record<string, any>) {
  if (process.env.SENTRY_DSN) {
    Sentry.addBreadcrumb({
      message,
      category,
      level: 'info',
      data,
    });
  }
}

// Islamic matrimonial specific error types
export const ErrorTypes = {
  AUTHENTICATION: 'auth_error',
  PROFILE_CREATION: 'profile_error', 
  MATCHING: 'matching_error',
  MESSAGING: 'messaging_error',
  PAYMENT: 'payment_error',
  FAMILY_INTEGRATION: 'family_error',
} as const;

export type ErrorType = typeof ErrorTypes[keyof typeof ErrorTypes];

export function captureIslamicPlatformError(
  error: Error, 
  errorType: ErrorType, 
  userId?: string,
  context?: Record<string, any>
) {
  const enrichedContext = {
    ...context,
    errorType,
    userId,
    platform: 'faddl-match',
    userType: 'muslim-matrimonial',
  };
  
  captureError(error, enrichedContext);
}