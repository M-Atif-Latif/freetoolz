/**
 * Image Optimization Utility for Top 1% Performance
 * Implements progressive image loading with blur-up effect
 */

export interface ImageOptimizationConfig {
  enableBlurUp?: boolean;
  enableLazyLoading?: boolean;
  enableWebP?: boolean;
  imageQuality?: 'low' | 'medium' | 'high';
}

/**
 * Progressive Image component configuration
 * Use data attributes for lazy loading
 * 
 * Example:
 * <img 
 *   data-src="image.jpg"
 *   data-srcset="image-sm.jpg 400w, image-md.jpg 800w, image-lg.jpg 1200w"
 *   src="data:image/svg+xml,%3Csvg..."
 *   class="progressive-image"
 *   alt="Description"
 * />
 */
export class ProgressiveImageLoader {
  private observerOptions: IntersectionObserverInit;
  private observer: IntersectionObserver | null = null;
  private loadedImages = new Set<HTMLImageElement>();
  
  constructor(config: ImageOptimizationConfig = {}) {
    this.observerOptions = {
      rootMargin: config.enableLazyLoading ? '50px' : '0px',
      threshold: 0.01,
    };
    
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        this.observerOptions
      );
    }
  }
  
  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target as HTMLImageElement);
      }
    });
  }
  
  private loadImage(img: HTMLImageElement) {
    if (this.loadedImages.has(img)) return;
    
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;
    const sizes = img.dataset.sizes;
    
    // Preload image
    const tempImg = new Image();
    
    tempImg.onload = () => {
      if (src) img.src = src;
      if (srcset) img.srcset = srcset;
      if (sizes) img.sizes = sizes;
      
      img.classList.add('loaded');
      this.loadedImages.add(img);
      
      if (this.observer) {
        this.observer.unobserve(img);
      }
    };
    
    tempImg.onerror = () => {
      img.classList.add('error');
    };
    
    // Load WebP if supported, fallback to original
    if (this.supportsWebP() && img.dataset.webp) {
      tempImg.src = img.dataset.webp;
    } else if (src) {
      tempImg.src = src;
    }
  }
  
  private supportsWebP(): boolean {
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    return canvas.toDataURL('image/webp').includes('image/webp');
  }
  
  public observe(selector = '.progressive-image, img[data-src]') {
    if (!this.observer) return;
    
    const images = document.querySelectorAll(selector);
    images.forEach(img => {
      this.observer?.observe(img);
      
      // Fallback: load immediately if no intersection observer working
      if (!('IntersectionObserver' in window)) {
        this.loadImage(img as HTMLImageElement);
      }
    });
  }
  
  public unobserve(img: HTMLImageElement) {
    this.observer?.unobserve(img);
  }
  
  public disconnect() {
    this.observer?.disconnect();
    this.loadedImages.clear();
  }
}

/**
 * Generate blur-up placeholder data URL
 * Small SVG placeholder while image loads
 * 
 * Usage: Set as src attribute for instant placeholder
 */
export function generateBlurPlaceholder(width: number = 100, height: number = 100, color: string = '#e5e7eb'): string {
  const svg = `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 ${width} ${height}"
    >
      <rect width="${width}" height="${height}" fill="${color}"/>
    </svg>
  `;
  
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23${color.replace('#', '')}'/%3E%3C/svg%3E`;
}

/**
 * Preload critical images for above-the-fold content
 * Only for images that are immediately visible
 */
export function preloadCriticalImages(imageSrcs: string[]) {
  imageSrcs.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

/**
 * Apply adaptive image quality based on device capabilities
 * Returns reduced quality for low-end devices or slow networks
 */
export function getAdaptiveImageQuality(): 'low' | 'medium' | 'high' {
  const connection = (navigator as any).connection;
  const deviceMemory = (navigator as any).deviceMemory;
  
  if (connection?.effectiveType === '3g' || connection?.effectiveType === '2g') {
    return 'low'; // Use 70% quality
  }
  
  if (deviceMemory && deviceMemory <= 2) {
    return 'low'; // Low memory device
  }
  
  if (connection?.effectiveType === '4g' && deviceMemory && deviceMemory <= 4) {
    return 'medium'; // Use 85% quality
  }
  
  return 'high'; // Use full quality
}

/**
 * Generate responsive image srcset
 * Creates multiple sizes for different viewports
 * 
 * Usage:
 * const srcset = generateResponsiveSrcset('image.jpg', [400, 800, 1200]);
 * img.srcset = srcset;
 */
export function generateResponsiveSrcset(
  basePath: string, 
  widths: number[] = [400, 600, 800, 1000, 1200, 1600]
): string {
  return widths
    .map(width => {
      // Assumes image service supports ?w= parameter (e.g., Cloudinary, Imgix)
      const url = basePath.includes('?') 
        ? `${basePath}&w=${width}` 
        : `${basePath}?w=${width}`;
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * image sizes attribute for responsive design
 * Tells browser which image to load for specific viewport
 * 
 * Usage:
 * img.sizes = generateResponsiveSizes();
 */
export function generateResponsiveSizes(): string {
  return `
    (max-width: 480px) 100vw,
    (max-width: 768px) 90vw,
    (max-width: 1024px) 80vw,
    (max-width: 1280px) 75vw,
    70vw
  `.trim().replace(/\s+/g, ' ');
}

/**
 * CSS-based lazy loading placeholder
 * Add this to your CSS:
 * 
 * img.lazy: {
 *   opacity: 0;
 *   transition: opacity 0.3s ease-in-out;
 * }
 * 
 * img.lazy.loaded {
 *   opacity: 1;
 * }
 */
export const lazyImageCSS = `
  /* Lazy loading fade-in effect */
  .progressive-image {
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
    background-size: cover;
    background-position: center;
  }
  
  .progressive-image.loaded {
    opacity: 1;
  }
  
  .progressive-image.error {
    opacity: 0.5;
    background: #f3f4f6;
  }
  
  /* Low-quality image blur effect while loading */
  .progressive-image[data-src].blurred {
    filter: blur(20px);
    transform: scale(1.05);
  }
  
  .progressive-image[data-src].blurred.loaded {
    filter: none;
    transform: scale(1);
  }
`;

/**
 * Initialize all image optimizations
 * Call once on page load
 */
export function initializeImageOptimizations(config: ImageOptimizationConfig = {}) {
  const loader = new ProgressiveImageLoader(config);
  loader.observe();
  
  // Cleanup on route change (for SPAs)
  window.addEventListener('beforeunload', () => {
    loader.disconnect();
  });
  
  return loader;
}

export default {
  ProgressiveImageLoader,
  generateBlurPlaceholder,
  preloadCriticalImages,
  getAdaptiveImageQuality,
  generateResponsiveSrcset,
  generateResponsiveSizes,
  lazyImageCSS,
  initializeImageOptimizations,
};
