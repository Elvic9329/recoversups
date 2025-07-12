/**
 * Performance Optimizations - RecoverSups Theme
 * Advanced performance techniques and lazy loading with ES6 modules
 * @version 2.0.0
 */

export class PerformanceOptimizer {
  constructor() {
    this.config = {
      lazyLoadOffset: 100,
      intersectionThreshold: 0.1,
      debounceTime: 300
    };
    
    this.init();
  }
  
  init() {
    this.initLazyLoading();
    this.initResourceHints();
    this.initCriticalResourcePreloading();
    this.initImageOptimizations();
    this.setupPerformanceObserver();
  }
  
  initLazyLoading() {
    // Lazy load images with Intersection Observer
    if ('IntersectionObserver' in window) {
      this.lazyLoadImages();
      this.lazyLoadSections();
      this.lazyLoadIframes();
    } else {
      // Fallback for older browsers
      this.fallbackLazyLoad();
    }
  }
  
  lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Load the actual image
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          
          // Add loaded class for animations
          img.classList.add('lazy-loaded');
          img.classList.remove('lazy');
          
          // Stop observing this image
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: `${this.config.lazyLoadOffset}px`,
      threshold: this.config.intersectionThreshold
    });
    
    // Observe all lazy images
    document.querySelectorAll('img[data-src], img.lazy').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  lazyLoadSections() {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          
          // Load section-specific resources
          this.loadSectionResources(section);
          
          // Trigger section loaded event
          section.dispatchEvent(new CustomEvent('section:loaded'));
          
          sectionObserver.unobserve(section);
        }
      });
    }, {
      rootMargin: '200px',
      threshold: 0.1
    });
    
    // Observe sections that need lazy loading
    document.querySelectorAll('[data-lazy-section]').forEach(section => {
      sectionObserver.observe(section);
    });
  }
  
  lazyLoadIframes() {
    const iframeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const iframe = entry.target;
          
          if (iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
            iframe.classList.add('lazy-loaded');
          }
          
          iframeObserver.unobserve(iframe);
        }
      });
    }, {
      rootMargin: '50px'
    });
    
    document.querySelectorAll('iframe[data-src]').forEach(iframe => {
      iframeObserver.observe(iframe);
    });
  }
  
  loadSectionResources(section) {
    const sectionType = section.dataset.sectionType;
    
    switch (sectionType) {
      case 'product-recommendations':
        this.loadProductRecommendations(section);
        break;
      case 'video-section':
        this.loadVideoSection(section);
        break;
      case 'testimonials':
        this.loadTestimonials(section);
        break;
      case 'shop-by-goal':
        this.loadShopByGoalSection(section);
        break;
      case 'product-bundles':
        this.loadProductBundles(section);
        break;
      case 'fitness-testimonials':
        this.loadFitnessTestimonials(section);
        break;
      case 'product-comparison':
        this.loadProductComparison(section);
        break;
    }
  }
  
  loadProductRecommendations(section) {
    const productId = section.dataset.productId;
    if (!productId) return;
    
    fetch(`/recommendations/products.json?product_id=${productId}&limit=4`)
      .then(response => response.json())
      .then(data => {
        if (data.products && data.products.length > 0) {
          this.renderProductRecommendations(section, data.products);
        }
      })
      .catch(error => {
        console.error('Failed to load product recommendations:', error);
      });
  }
  
  renderProductRecommendations(section, products) {
    const container = section.querySelector('[data-recommendations-container]');
    if (!container) return;
    
    const html = products.map(product => `
      <div class="product-card">
        <a href="${product.url}" class="product-card__link">
          <img src="${product.featured_image || '/assets/placeholder.svg'}" 
               alt="${product.title}" 
               class="product-card__image"
               loading="lazy">
          <h3 class="product-card__title">${product.title}</h3>
          <p class="product-card__price">${this.formatPrice(product.price)}</p>
        </a>
      </div>
    `).join('');
    
    container.innerHTML = html;
  }
  
  initResourceHints() {
    // Preload critical fonts
    const criticalFonts = [
      '/assets/fonts/montserrat-v25-latin-600.woff2',
      '/assets/fonts/open-sans-v34-latin-regular.woff2'
    ];
    
    criticalFonts.forEach(font => {
      if (!document.querySelector(`link[href="${font}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });
    
    // Prefetch likely next pages
    this.prefetchLikelyPages();
  }
  
  prefetchLikelyPages() {
    // Prefetch collection pages from navigation
    const collectionLinks = document.querySelectorAll('a[href*="/collections/"]');
    const prefetchedUrls = new Set();
    
    collectionLinks.forEach(link => {
      if (prefetchedUrls.has(link.href)) return;
      
      link.addEventListener('mouseenter', () => {
        if (!prefetchedUrls.has(link.href)) {
          this.prefetchPage(link.href);
          prefetchedUrls.add(link.href);
        }
      }, { once: true });
    });
  }
  
  prefetchPage(url) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  }
  
  initCriticalResourcePreloading() {
    // Preload hero images
    const heroImages = document.querySelectorAll('.hero-slide img[src]');
    heroImages.forEach((img, index) => {
      if (index === 0) { // Only preload first hero image
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = img.src;
        link.as = 'image';
        document.head.appendChild(link);
      }
    });
  }
  
  initImageOptimizations() {
    // Add blur-up effect for lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
      if (!img.style.backgroundImage && img.dataset.placeholder) {
        img.style.backgroundImage = `url(${img.dataset.placeholder})`;
        img.style.backgroundSize = 'cover';
        img.style.backgroundPosition = 'center';
      }
    });
    
    // Optimize images based on device pixel ratio
    this.optimizeImagesByDPR();
  }
  
  optimizeImagesByDPR() {
    const dpr = window.devicePixelRatio || 1;
    const images = document.querySelectorAll('img[data-sizes]');
    
    images.forEach(img => {
      const sizes = img.dataset.sizes.split(',');
      const optimizedSrc = this.getOptimizedImageSrc(sizes, dpr);
      
      if (optimizedSrc && img.dataset.src) {
        img.dataset.src = optimizedSrc;
      }
    });
  }
  
  getOptimizedImageSrc(sizes, dpr) {
    // Simple implementation - could be enhanced
    const targetSize = Math.ceil(sizes[0] * dpr);
    return sizes.find(size => size >= targetSize) || sizes[sizes.length - 1];
  }
  
  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      // Monitor Core Web Vitals
      this.observeCoreWebVitals();
      
      // Monitor long tasks
      this.observeLongTasks();
    }
  }
  
  observeCoreWebVitals() {
    // LCP Observer
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      this.trackPerformanceMetric('LCP', lastEntry.startTime);
    });
    
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Browser doesn't support LCP
    }
    
    // FID Observer
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        this.trackPerformanceMetric('FID', entry.processingStart - entry.startTime);
      });
    });
    
    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // Browser doesn't support FID
    }
  }
  
  observeLongTasks() {
    const longTaskObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.duration > 50) {
          this.trackPerformanceMetric('LongTask', entry.duration);
        }
      });
    });
    
    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Browser doesn't support longtask
    }
  }
  
  trackPerformanceMetric(name, value) {
    // Send to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: Math.round(value),
        custom_parameter_1: navigator.connection?.effectiveType || 'unknown'
      });
    }
    
    // Log for debugging in dev mode
    if (window.location.hostname.includes('localhost') || window.location.hostname.includes('ngrok')) {
      console.log(`Performance: ${name} = ${Math.round(value)}ms`);
    }
  }
  
  fallbackLazyLoad() {
    // Simple fallback for browsers without Intersection Observer
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const loadImage = (img) => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.add('lazy-loaded');
      }
    };
    
    // Load images on scroll with throttling
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          lazyImages.forEach(img => {
            if (this.isInViewport(img)) {
              loadImage(img);
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
  }
  
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top < window.innerHeight + this.config.lazyLoadOffset &&
      rect.bottom > -this.config.lazyLoadOffset
    );
  }
  
  loadShopByGoalSection(section) {
    // Load goal-specific content and animations
    const goals = section.querySelectorAll('[data-goal-card]');
    goals.forEach(goal => {
      goal.classList.add('animate-on-scroll');
    });
  }
  
  loadProductBundles(section) {
    // Lazy load bundle product data
    const bundleId = section.dataset.bundleId;
    if (!bundleId) return;
    
    fetch(`/products/${bundleId}.js`)
      .then(response => response.json())
      .then(product => {
        this.renderBundleData(section, product);
      })
      .catch(error => {
        console.error('Failed to load bundle data:', error);
      });
  }
  
  loadFitnessTestimonials(section) {
    // Lazy load testimonial videos/images
    const testimonials = section.querySelectorAll('[data-testimonial]');
    testimonials.forEach(testimonial => {
      const video = testimonial.querySelector('video[data-src]');
      if (video) {
        video.src = video.dataset.src;
      }
    });
  }
  
  loadProductComparison(section) {
    // Load comparison data for selected products
    const productIds = section.dataset.productIds?.split(',');
    if (!productIds) return;
    
    Promise.all(
      productIds.map(id => fetch(`/products/${id}.js`).then(r => r.json()))
    ).then(products => {
      this.renderComparisonTable(section, products);
    }).catch(error => {
      console.error('Failed to load comparison products:', error);
    });
  }
  
  renderBundleData(section, product) {
    const container = section.querySelector('[data-bundle-container]');
    if (!container) return;
    
    // Render bundle-specific data
    container.innerHTML = `
      <div class="bundle-info">
        <h3>${product.title}</h3>
        <p class="bundle-savings">Save ${this.calculateBundleSavings(product)}%</p>
      </div>
    `;
  }
  
  renderComparisonTable(section, products) {
    const container = section.querySelector('[data-comparison-container]');
    if (!container) return;
    
    // Render comparison table
    const tableHTML = this.buildComparisonTable(products);
    container.innerHTML = tableHTML;
  }
  
  buildComparisonTable(products) {
    // Build comparison table HTML
    return `
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Feature</th>
            ${products.map(p => `<th>${p.title}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Price</td>
            ${products.map(p => `<td>${this.formatPrice(p.price)}</td>`).join('')}
          </tr>
        </tbody>
      </table>
    `;
  }
  
  calculateBundleSavings(product) {
    // Calculate savings percentage for bundles
    const compare_at_price = product.compare_at_price || 0;
    const price = product.price || 0;
    
    if (compare_at_price > price) {
      return Math.round(((compare_at_price - price) / compare_at_price) * 100);
    }
    return 0;
  }
  
  // Enhanced image optimization for supplements
  initSupplementImageOptimizations() {
    // Preload nutrition fact images
    const nutritionImages = document.querySelectorAll('[data-nutrition-image]');
    nutritionImages.forEach(img => {
      if (this.isInViewport(img)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = img.dataset.src;
        link.as = 'image';
        document.head.appendChild(link);
      }
    });
    
    // Optimize product gallery images
    this.optimizeProductGallery();
  }
  
  optimizeProductGallery() {
    const galleries = document.querySelectorAll('.product-gallery');
    galleries.forEach(gallery => {
      const images = gallery.querySelectorAll('img[data-src]');
      
      // Preload first 2 images
      images.forEach((img, index) => {
        if (index < 2) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = img.dataset.src;
          link.as = 'image';
          document.head.appendChild(link);
        }
      });
    });
  }
  
  // Service Worker registration for caching
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration);
        })
        .catch(error => {
          console.log('SW registration failed:', error);
        });
    }
  }
  
  // Memory optimization
  cleanupUnusedResources() {
    // Remove unused images from memory
    const unusedImages = document.querySelectorAll('img:not([src]):not([data-src])');
    unusedImages.forEach(img => {
      if (img.parentNode) {
        img.parentNode.removeChild(img);
      }
    });
    
    // Clear old performance entries
    if (performance.clearResourceTimings) {
      performance.clearResourceTimings();
    }
  }
  
  formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price / 100);
  }
}