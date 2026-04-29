/**
 * Performance Optimizations for Top 1% PageSpeed Score
 * Comprehensive utility for modern web performance techniques
 */

/**
 * Intersectionobserver-based image lazy loading with blur-up
 * Automatically observes all images with data-src attribute
 */
export function observeLazyImages() {
  if (!('IntersectionObserver' in window)) return;
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;
        
        if (src) img.src = src;
        if (srcset) img.srcset = srcset;
        
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px',
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

/**
 * Preload critical images/resources strategically
 */
export function preloadCriticalResources() {
  const criticalResources = [
    { href: '/logo.png', as: 'image' },
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = resource.as;
    link.href = resource.href;
    document.head.appendChild(link);
  });
}

/**
 * Implement requestIdleCallback with polyfill
 * Schedules callbacks during idle browser time
 */
export function scheduleIdleCallback(callback: () => void, timeout = 2000) {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout });
  } else {
    // Fallback using MessageChannel for higher priority than setTimeout
    const channel = new MessageChannel();
    channel.port2.onmessage = () => callback();
    channel.port1.postMessage(null);
  }
}

/**
 * Defer non-critical CSS by loading them asynchronously
 */
export function deferNonCriticalCSS() {
  const links = document.querySelectorAll('link[rel="stylesheet"][data-defer="true"]');
  links.forEach(node => {
    const link = node as HTMLLinkElement;
    const href = link.getAttribute('href');
    if (href) {
      link.setAttribute('rel', 'preload');
      link.setAttribute('as', 'style');
      link.onload = function() {
        link.onload = null;
        link.rel = 'stylesheet';
      };
    }
  });
}

/**
 * Enable resource hints strategically
 * dns-prefetch: Resolve DNS early
 * prefetch: Fetch resource in background
 * preconnect: Establish connection earlier
 */
export function addResourceHints() {
  const hints = [
    // Critical CDNs - preconnect
    { rel: 'preconnect', href: 'https://cdn.example.com' },
  ];
  
  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.rel === 'preconnect') {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
}

/**
 * Use Web Worker for heavy computations
 * Offload main thread work to background worker
 */
export function useWebWorker(scriptPath: string) {
  if (typeof Worker === 'undefined') {
    console.warn('Web Workers not supported');
    return null;
  }
  
  return new Worker(scriptPath, { type: 'module' });
}

/**
 * Monitor Core Web Vitals and send to analytics only if configured
 * LCP, FID, CLS tracking
 */
export function observeWebVitals(callback?: (metric: any) => void) {
  try {
    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (callback) callback({ metric: 'LCP', value: lastEntry.renderTime || lastEntry.loadTime });
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    
    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          if (callback) callback({ metric: 'CLS', value: clsValue });
        }
      });
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
    
    // First Input Delay (FID) / Interaction to Next Paint (INP)
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (callback) callback({ metric: 'FID', value: entry.processingDuration });
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
    
  } catch (e) {
    console.warn('Web Vitals not fully supported:', e);
  }
}

/**
 * Enable aggressive caching with Service Worker strategy
 * Cache-first strategy for static assets
 * Network-first strategy for API calls
 */
export function registerPerformanceStrategies() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(err => {
      console.debug('Service Worker registration failed:', err);
    });
  }
}

/**
 * Implement adaptive loading based on device capabilities
 * Reduce resolution/quality for slower devices (4G, slow CPU)
 */
export function getDeviceCapabilities() {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const cores = (navigator as any).hardwareConcurrency || 1;
  const ram = (navigator as any).deviceMemory || 4;
  
  return {
    effectiveType: connection?.effectiveType || '4g',
    downlink: connection?.downlink || 10,
    cores,
    ram,
    isSlowNetwork: connection?.effectiveType === '3g' || connection?.effectiveType === '4g',
    isLowEndDevice: cores <= 2 || ram <= 2,
  };
}

/**
 * Implement font-display strategy for Google Fonts
 * 'swap': Use fallback immediately, swap when loaded
 * 'optional': Only use if already loading, don't block
 */
export function optimizeFontLoading() {
  // This is typically set in CSS with @font-face, but can be dynamically adjusted
  const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
  fontLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.includes('display=')) {
      link.setAttribute('href', href + '&display=swap');
    }
  });
}

/**
 * Cleanup unused event listeners and observers
 * Call this on route changes to prevent memory leaks
 */
export function cleanupPerformanceObservers() {
  // Close all PerformanceObserver instances
  try {
    const observers = (window as any).__performanceObservers || [];
    observers.forEach((observer: any) => observer.disconnect?.());
    (window as any).__performanceObservers = [];
  } catch (e) {
    console.debug('Cleanup failed:', e);
  }
}

export default {
  observeLazyImages,
  preloadCriticalResources,
  scheduleIdleCallback,
  deferNonCriticalCSS,
  addResourceHints,
  useWebWorker,
  observeWebVitals,
  registerPerformanceStrategies,
  getDeviceCapabilities,
  optimizeFontLoading,
  cleanupPerformanceObservers,
};
