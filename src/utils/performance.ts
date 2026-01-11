/**
 * Performance Monitoring Utilities
 * Tracks Core Web Vitals and reports to analytics
 */

// Types for Web Vitals
interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

// Thresholds for Core Web Vitals
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },    // Largest Contentful Paint
  FID: { good: 100, poor: 300 },       // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },      // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 },     // First Contentful Paint
  TTFB: { good: 800, poor: 1800 },     // Time to First Byte
  INP: { good: 200, poor: 500 },       // Interaction to Next Paint
};

/**
 * Get rating based on metric value
 */
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Report metric to analytics (console in dev, analytics in prod)
 */
function reportMetric(metric: WebVitalMetric): void {
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    const color = metric.rating === 'good' ? 'green' : metric.rating === 'needs-improvement' ? 'orange' : 'red';
    console.log(
      `%c[Web Vital] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`,
      `color: ${color}`
    );
  }

  // Send to Google Analytics in production
  if (typeof window !== 'undefined' && 'gtag' in window && process.env.NODE_ENV === 'production') {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      metric_rating: metric.rating,
    });
  }
}

/**
 * Measure Largest Contentful Paint (LCP)
 */
export function measureLCP(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
      
      const metric: WebVitalMetric = {
        name: 'LCP',
        value: lastEntry.startTime,
        rating: getRating('LCP', lastEntry.startTime),
        delta: lastEntry.startTime,
        id: `lcp-${Date.now()}`,
      };
      
      reportMetric(metric);
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    // Silently fail if observer not supported
  }
}

/**
 * Measure First Input Delay (FID)
 */
export function measureFID(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const firstEntry = entries[0] as PerformanceEventTiming;
      
      const metric: WebVitalMetric = {
        name: 'FID',
        value: firstEntry.processingStart - firstEntry.startTime,
        rating: getRating('FID', firstEntry.processingStart - firstEntry.startTime),
        delta: firstEntry.processingStart - firstEntry.startTime,
        id: `fid-${Date.now()}`,
      };
      
      reportMetric(metric);
    });

    observer.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    // Silently fail if observer not supported
  }
}

/**
 * Measure Cumulative Layout Shift (CLS)
 */
export function measureCLS(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  let clsValue = 0;
  let sessionValue = 0;
  let sessionEntries: PerformanceEntry[] = [];

  try {
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as (PerformanceEntry & { hadRecentInput: boolean; value: number })[]) {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0] as PerformanceEntry & { startTime: number } | undefined;
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1] as PerformanceEntry & { startTime: number } | undefined;
          
          if (sessionValue && 
              entry.startTime - (lastSessionEntry?.startTime || 0) < 1000 &&
              entry.startTime - (firstSessionEntry?.startTime || 0) < 5000) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }

          if (sessionValue > clsValue) {
            clsValue = sessionValue;
          }
        }
      }
    });

    observer.observe({ type: 'layout-shift', buffered: true });

    // Report CLS when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        const metric: WebVitalMetric = {
          name: 'CLS',
          value: clsValue,
          rating: getRating('CLS', clsValue),
          delta: clsValue,
          id: `cls-${Date.now()}`,
        };
        reportMetric(metric);
      }
    });
  } catch (e) {
    // Silently fail if observer not supported
  }
}

/**
 * Measure First Contentful Paint (FCP)
 */
export function measureFCP(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntriesByName('first-contentful-paint');
      if (entries.length > 0) {
        const entry = entries[0] as PerformanceEntry & { startTime: number };
        const metric: WebVitalMetric = {
          name: 'FCP',
          value: entry.startTime,
          rating: getRating('FCP', entry.startTime),
          delta: entry.startTime,
          id: `fcp-${Date.now()}`,
        };
        reportMetric(metric);
      }
    });

    observer.observe({ type: 'paint', buffered: true });
  } catch (e) {
    // Silently fail if observer not supported
  }
}

/**
 * Measure Time to First Byte (TTFB)
 */
export function measureTTFB(): void {
  if (typeof window === 'undefined') return;

  try {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      const metric: WebVitalMetric = {
        name: 'TTFB',
        value: ttfb,
        rating: getRating('TTFB', ttfb),
        delta: ttfb,
        id: `ttfb-${Date.now()}`,
      };
      reportMetric(metric);
    }
  } catch (e) {
    // Silently fail
  }
}

/**
 * Initialize all performance measurements
 */
export function initPerformanceMonitoring(): void {
  if (typeof window === 'undefined') return;

  // Wait for page to fully load
  if (document.readyState === 'complete') {
    measureAllMetrics();
  } else {
    window.addEventListener('load', measureAllMetrics);
  }
}

function measureAllMetrics(): void {
  measureLCP();
  measureFID();
  measureCLS();
  measureFCP();
  measureTTFB();
}

/**
 * Report custom performance marks
 */
export function markPerformance(name: string): void {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(name);
  }
}

/**
 * Measure between two performance marks
 */
export function measurePerformance(name: string, startMark: string, endMark: string): number | null {
  if (typeof performance !== 'undefined' && performance.measure) {
    try {
      const measure = performance.measure(name, startMark, endMark);
      return measure.duration;
    } catch (e) {
      return null;
    }
  }
  return null;
}
