import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  
  // Performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Session replay
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.01 : 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Environment
  environment: process.env.NODE_ENV,
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_APP_VERSION || 'unknown',
  
  // Integration configurations
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
    new Sentry.BrowserTracing({
      // Set up automatic route change tracking for Next.js App Router
      routingInstrumentation: Sentry.nextjsRouterInstrumentation({
        usePageRoutes: false, // Using App Router
      }),
    }),
  ],
  
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