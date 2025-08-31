import { z } from 'zod';

// Enhanced validation schemas with better error messages
export const enhancedValidation = {
  // Email validation with common domain checks
  email: z.string()
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long')
    .refine((email) => {
      const domain = email.split('@')[1];
      return domain && domain.includes('.') && domain.length > 3;
    }, 'Please enter a valid email domain'),

  // Password validation with strength requirements
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(128, 'Password is too long')
    .refine((password) => /[A-Z]/.test(password), 'Password must contain at least one uppercase letter')
    .refine((password) => /[a-z]/.test(password), 'Password must contain at least one lowercase letter')
    .refine((password) => /[0-9]/.test(password), 'Password must contain at least one number')
    .refine((password) => /[!@#$%^&*(),.?\":{}|<>]/.test(password), 'Password must contain at least one special character'),

  // Age validation (18-100 years old)
  dateOfBirth: z.string()
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18 && age - 1 <= 100;
      }
      return age >= 18 && age <= 100;
    }, 'You must be between 18 and 100 years old'),

  // Text content validation with profanity filter placeholder
  profileText: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters')
    .refine((text) => {
      // Basic profanity filter - in production, use a proper service
      const bannedWords = ['spam', 'scam']; // Add more as needed
      const lowerText = text.toLowerCase();
      return !bannedWords.some(word => lowerText.includes(word));
    }, 'Please ensure your description is appropriate'),

  // Location validation
  city: z.string()
    .min(2, 'City name must be at least 2 characters')
    .max(50, 'City name is too long')
    .regex(/^[a-zA-Z\s\-']+$/, 'City name contains invalid characters'),

  // UUID validation for IDs
  userId: z.string()
    .uuid('Invalid user ID format'),

  // Pagination validation
  pagination: z.object({
    page: z.string()
      .regex(/^\d+$/, 'Page must be a valid number')
      .transform(val => parseInt(val))
      .refine(val => val > 0, 'Page must be greater than 0'),
    limit: z.string()
      .regex(/^\d+$/, 'Limit must be a valid number')
      .transform(val => parseInt(val))
      .refine(val => val >= 1 && val <= 100, 'Limit must be between 1 and 100')
  })
};

// Sanitization utilities
export const sanitize = {
  text: (input: string): string => {
    return input
      .trim()
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .substring(0, 1000); // Prevent extremely long inputs
  },

  html: (input: string): string => {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  },

  filename: (input: string): string => {
    return input
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .substring(0, 255);
  }
};

// Rate limiting helpers
export const rateLimitKeys = {
  login: (email: string) => `login:${email}`,
  register: (ip: string) => `register:${ip}`,
  message: (userId: string) => `message:${userId}`,
  passwordReset: (email: string) => `reset:${email}`
};

export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  errors?: string[];
};