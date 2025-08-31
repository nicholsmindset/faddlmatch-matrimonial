import { logger } from './logger';

type PerformanceMetrics = {
  executionTime: number;
  memoryUsage?: number;
  queryCount?: number;
  cacheHits?: number;
};

export class PerformanceMonitor {
  private startTime: number;
  private startMemory?: number;
  private label: string;

  constructor(label: string) {
    this.label = label;
    this.startTime = performance.now();
    
    if (typeof process !== 'undefined' && process.memoryUsage) {
      this.startMemory = process.memoryUsage().heapUsed;
    }
  }

  end(additionalMetrics?: Partial<PerformanceMetrics>): PerformanceMetrics {
    const executionTime = performance.now() - this.startTime;
    let memoryUsage: number | undefined;

    if (this.startMemory && typeof process !== 'undefined') {
      memoryUsage = process.memoryUsage().heapUsed - this.startMemory;
    }

    const metrics: PerformanceMetrics = {
      executionTime: Number(executionTime.toFixed(2)),
      memoryUsage: memoryUsage ? Number((memoryUsage / 1024 / 1024).toFixed(2)) : undefined,
      ...additionalMetrics
    };

    // Log slow operations (> 1000ms)
    if (executionTime > 1000) {
      logger.warn(`Slow operation detected: ${this.label}`, {
        metrics,
        threshold: '1000ms'
      });
    }

    // Log in development for debugging
    if (process.env.NODE_ENV === 'development') {
      logger.debug(`Performance: ${this.label}`, { metrics });
    }

    return metrics;
  }
}

export function withPerformanceMonitoring<T extends (...args: any[]) => any>(
  fn: T,
  label: string
): T {
  return (async (...args: any[]) => {
    const monitor = new PerformanceMonitor(label);
    try {
      const result = await fn(...args);
      monitor.end();
      return result;
    } catch (error) {
      const metrics = monitor.end();
      logger.error(`Function failed: ${label}`, error as Error, { metrics });
      throw error;
    }
  }) as T;
}

// Database query counter for optimization
export class QueryCounter {
  private static count = 0;
  
  static increment() {
    this.count++;
  }
  
  static reset() {
    const count = this.count;
    this.count = 0;
    return count;
  }
  
  static get current() {
    return this.count;
  }
}

export function measureDatabaseOperation<T>(
  operation: () => Promise<T>,
  label: string
): Promise<T> {
  return withPerformanceMonitoring(
    async () => {
      const initialQueries = QueryCounter.current;
      const result = await operation();
      const queryCount = QueryCounter.current - initialQueries;
      
      if (queryCount > 5) {
        logger.warn(`High query count detected: ${label}`, {
          queryCount,
          label
        });
      }
      
      return result;
    },
    `DB: ${label}`
  )();
}