interface LogContext {
  userId?: string;
  action?: string;
  timestamp?: string;
  [key: string]: any;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  
  private formatMessage(level: string, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? JSON.stringify(context) : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message} ${contextStr}`;
  }

  error(message: string, error?: Error, context?: LogContext) {
    const logContext = {
      ...context,
      error: error?.message,
      stack: this.isDevelopment ? error?.stack : undefined,
    };
    
    console.error(this.formatMessage('error', message, logContext));
    
    // In production, you'd send to external service like Sentry
    if (!this.isDevelopment && error) {
      // External error reporting would go here
    }
  }

  warn(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.warn(this.formatMessage('warn', message, context));
    }
  }

  info(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.info(this.formatMessage('info', message, context));
    }
  }

  debug(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('debug', message, context));
    }
  }
}

export const logger = new Logger();