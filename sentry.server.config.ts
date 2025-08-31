// Temporary: Disable Sentry for staging deployment  
// import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;

// Only initialize Sentry if DSN is available and we're in production
if (SENTRY_DSN && process.env.NODE_ENV === 'production') {
  // Sentry.init({
  //   dsn: SENTRY_DSN,
  //   tracesSampleRate: 0.1,
  //   environment: process.env.NODE_ENV,
  // });
}
  
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