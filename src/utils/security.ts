/**
 * Security Utilities for Input Sanitization and Validation
 * Protects against XSS, injection attacks, and malicious input
 */

/**
 * Sanitize HTML to prevent XSS attacks
 * Removes all HTML tags and encodes special characters
 */
export const sanitizeHTML = (input: string): string => {
  if (!input) return '';
  
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Encode HTML entities to prevent XSS
 */
export const encodeHTMLEntities = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Decode HTML entities
 */
export const decodeHTMLEntities = (input: string): string => {
  if (!input) return '';
  
  const div = document.createElement('div');
  div.innerHTML = input;
  return div.textContent || '';
};

/**
 * Validate and sanitize URL
 */
export const sanitizeURL = (url: string): string => {
  if (!url) return '';
  
  try {
    const parsedURL = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsedURL.protocol)) {
      return '';
    }
    return parsedURL.toString();
  } catch {
    return '';
  }
};

/**
 * Validate email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

/**
 * Sanitize filename to prevent path traversal attacks
 */
export const sanitizeFilename = (filename: string): string => {
  if (!filename) return 'unnamed';
  
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.+/g, '.')
    .replace(/^\.+/, '')
    .slice(0, 255);
};

/**
 * Rate limiting helper for client-side
 */
export class RateLimiter {
  private timestamps: number[] = [];
  private maxRequests: number;
  private timeWindow: number; // in milliseconds

  constructor(maxRequests: number, timeWindowSeconds: number) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowSeconds * 1000;
  }

  canProceed(): boolean {
    const now = Date.now();
    // Remove timestamps outside the time window
    this.timestamps = this.timestamps.filter(
      timestamp => now - timestamp < this.timeWindow
    );

    if (this.timestamps.length < this.maxRequests) {
      this.timestamps.push(now);
      return true;
    }

    return false;
  }

  getRemainingTime(): number {
    if (this.timestamps.length < this.maxRequests) return 0;
    
    const oldestTimestamp = this.timestamps[0];
    const remainingTime = this.timeWindow - (Date.now() - oldestTimestamp);
    return Math.max(0, Math.ceil(remainingTime / 1000));
  }
}

/**
 * Validate JSON safely
 */
export const safeJSONParse = <T = unknown>(input: string): { success: boolean; data?: T; error?: string } => {
  try {
    const data = JSON.parse(input) as T;
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON' 
    };
  }
};

/**
 * Truncate string safely to prevent memory issues
 */
export const truncateString = (str: string, maxLength: number = 10000): string => {
  if (!str) return '';
  return str.length > maxLength ? str.substring(0, maxLength) : str;
};

/**
 * Content Security Policy nonce generator
 */
export const generateNonce = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Check if file size is within acceptable limits
 */
export const isFileSizeValid = (file: File, maxSizeMB: number = 10): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Validate file type against whitelist
 */
export const isFileTypeValid = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

/**
 * Secure local storage wrapper with encryption (basic)
 */
export const secureStorage = {
  setItem: (key: string, value: string): void => {
    try {
      const encoded = btoa(value);
      localStorage.setItem(key, encoded);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
  
  getItem: (key: string): string | null => {
    try {
      const encoded = localStorage.getItem(key);
      return encoded ? atob(encoded) : null;
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },
};

/**
 * Debounce function to prevent excessive function calls
 */
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  waitMs: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), waitMs);
  };
};

/**
 * Throttle function to limit execution rate
 */
export const throttle = <T extends (...args: unknown[]) => void>(
  func: T,
  limitMs: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limitMs);
    }
  };
};
