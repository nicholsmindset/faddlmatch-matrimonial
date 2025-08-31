// Temporary: Disable Sentry for staging deployment
// import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

// Only initialize Sentry if DSN is available and we're in production
if (SENTRY_DSN && process.env.NODE_ENV === 'production') {
  // Sentry.init({
  //   dsn: SENTRY_DSN,
  //   tracesSampleRate: 0.1,
  //   environment: process.env.NODE_ENV,
  // });
}
  
  // Filter out known issues
  beforeSend(event, hint) {
    // Filter out network errors and other noise
    if (event.exception) {
      const error = hint.originalException;
      
      // Filter out network errors
      if (error && typeof error === 'object' && 'message' in error) {
        const message = (error as Error).message.toLowerCase();
        if (
          message.includes('network error') ||
          message.includes('fetch failed') ||
          message.includes('load failed')
        ) {
          return null;
        }
      }
    }
    
    return event;
  },
  
  // Additional context
  initialScope: {
    tags: {
      component: 'client',
    },
  },
});