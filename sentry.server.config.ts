import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  
  // Performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Environment
  environment: process.env.NODE_ENV,
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_APP_VERSION || 'unknown',
  
  // Keep integrations simple for now
  integrations: [],
  
  // Filter sensitive data
  beforeSend(event, hint) {
    // Remove sensitive data from events
    if (event.request) {
      // Remove authorization headers
      if (event.request.headers) {
        delete event.request.headers.authorization;
        delete event.request.headers.cookie;
      }
      
      // Remove sensitive query parameters
      if (event.request.query_string) {
        const url = new URL(`https://example.com?${event.request.query_string}`);
        url.searchParams.delete('token');
        url.searchParams.delete('password');
        url.searchParams.delete('secret');
        event.request.query_string = url.searchParams.toString();
      }
    }
    
    // Filter out database connection errors in development
    if (event.exception && process.env.NODE_ENV === 'development') {
      const error = hint.originalException;
      if (error && typeof error === 'object' && 'message' in error) {
        const message = (error as Error).message.toLowerCase();
        if (message.includes('econnrefused') || message.includes('database')) {
          return null;
        }
      }
    }
    
    return event;
  },
  
  // Additional context
  initialScope: {
    tags: {
      component: 'server',
    },
  },
});