// Analytics utility for production monitoring

export type AnalyticsEvent = {
  event: string;
  userId?: string;
  properties?: Record<string, any>;
  timestamp?: Date;
};

class Analytics {
  private isProduction = process.env.NODE_ENV === 'production';
  private userId: string | null = null;

  // Initialize analytics with user context
  identify(userId: string, traits?: Record<string, any>) {
    this.userId = userId;
    
    if (this.isProduction && typeof window !== 'undefined') {
      // Google Analytics identify
      if (window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!, {
          user_id: userId,
          custom_map: traits
        });
      }
    }

    this.track('user_identified', { userId, ...traits });
  }

  // Track events
  track(event: string, properties?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      userId: this.userId || undefined,
      properties: {
        ...properties,
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
        timestamp: new Date(),
      },
      timestamp: new Date(),
    };

    // Console log in development
    if (!this.isProduction) {
      console.log('📊 Analytics Event:', analyticsEvent);
    }

    if (this.isProduction && typeof window !== 'undefined') {
      // Google Analytics
      if (window.gtag) {
        window.gtag('event', event, {
          event_category: properties?.category || 'general',
          event_label: properties?.label,
          value: properties?.value,
          user_id: this.userId,
          ...properties,
        });
      }

      // Custom analytics endpoint
      this.sendToEndpoint(analyticsEvent);
    }
  }

  // Page view tracking
  page(pageName?: string, properties?: Record<string, any>) {
    const pageData = {
      page: pageName || (typeof window !== 'undefined' ? window.location.pathname : ''),
      title: typeof document !== 'undefined' ? document.title : '',
      ...properties,
    };

    if (this.isProduction && typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!, {
        page_title: pageData.title,
        page_location: window.location.href,
        user_id: this.userId,
      });
    }

    this.track('page_view', pageData);
  }

  // Application-specific events
  userRegistered(userId: string, method: string) {
    this.track('user_registered', {
      userId,
      method,
      category: 'authentication',
    });
  }

  userLoggedIn(userId: string, method: string) {
    this.track('user_logged_in', {
      userId,
      method,
      category: 'authentication',
    });
  }

  messagesSent(recipientId: string, messageLength: number) {
    this.track('message_sent', {
      recipientId: recipientId.substring(0, 8) + '...', // Partial ID for privacy
      messageLength,
      category: 'messaging',
    });
  }

  profileViewed(viewedUserId: string) {
    this.track('profile_viewed', {
      viewedUserId: viewedUserId.substring(0, 8) + '...', // Partial ID for privacy
      category: 'engagement',
    });
  }

  likeGiven(likedUserId: string) {
    this.track('like_given', {
      likedUserId: likedUserId.substring(0, 8) + '...', // Partial ID for privacy
      category: 'engagement',
    });
  }

  matchMade(matchedUserId: string) {
    this.track('match_made', {
      matchedUserId: matchedUserId.substring(0, 8) + '...', // Partial ID for privacy
      category: 'engagement',
    });
  }

  // Error tracking
  error(error: Error, context?: Record<string, any>) {
    this.track('error_occurred', {
      error: error.message,
      stack: error.stack,
      ...context,
      category: 'error',
    });
  }

  // Performance tracking
  performance(metric: string, value: number, unit: string = 'ms') {
    this.track('performance_metric', {
      metric,
      value,
      unit,
      category: 'performance',
    });
  }

  // Send to custom analytics endpoint
  private async sendToEndpoint(event: AnalyticsEvent) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.warn('Failed to send analytics event:', error);
    }
  }
}

// Global analytics instance
export const analytics = new Analytics();

// Google Analytics types
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

// React hook for analytics
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    analytics.page(pathname);
  }, [pathname]);

  return analytics;
}