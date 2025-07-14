/**
 * RecoverSups Theme - Main JavaScript Entry Point
 * Modular ES6 architecture for supplements e-commerce
 * @version 2.0.0
 */

import CartManager from './cart-manager.js';
import { NavigationModule } from './module-navigation.js';
import { PerformanceOptimizer } from './performance-optimizations.js';

class RecoverSupsTheme {
  constructor() {
    this.config = {
      // Global settings
      debounceTime: 300,
      animationDuration: 300,
      
      // Performance settings
      lazyLoadOffset: 100,
      scrollThrottleDelay: 100,
      
      // Shopify settings
      moneyFormat: '${{amount}}',
      cartType: 'drawer',
      
      // Feature flags
      features: {
        productRecommendations: true,
        quickView: true,
        wishlist: false,
        compareProducts: false
      }
    };
    
    this.modules = {};
    this.state = {
      loaded: false,
      mobile: window.innerWidth < 768
    };
    
    this.init();
  }
  
  init() {
    this.setupGlobalEvents();
    this.loadCoreModules();
    this.setupAccessibility();
    this.setupPerformanceOptimizations();
    
    // Mark as loaded
    this.state.loaded = true;
    document.dispatchEvent(new CustomEvent('theme:loaded'));
  }
  
  setupGlobalEvents() {
    // Throttled resize handler
    window.addEventListener('resize', this.throttle(() => {
      const wasMobile = this.state.mobile;
      this.state.mobile = window.innerWidth < 768;
      
      if (wasMobile !== this.state.mobile) {
        document.dispatchEvent(new CustomEvent('theme:breakpoint-change', {
          detail: { mobile: this.state.mobile }
        }));
      }
    }, this.config.scrollThrottleDelay));
    
    // Global click handler for analytics
    document.addEventListener('click', this.handleGlobalClick.bind(this));
    
    // Global form submission handler
    document.addEventListener('submit', this.handleGlobalSubmit.bind(this));
  }
  
  loadCoreModules() {
    // Initialize performance optimizer first
    this.modules.performance = new PerformanceOptimizer();
    
    // Initialize cart functionality (CartManager is singleton, auto-initialized)
    this.modules.cart = window.cartManager || new CartManager();
    
    // Initialize navigation
    if (document.querySelector('.header__nav')) {
      this.modules.navigation = new NavigationModule();
    }
    
    // Load other modules on demand
    this.loadModule('productForm');
    this.loadModule('animations');
  }
  
  loadModule(moduleName) {
    switch (moduleName) {
      case 'productForm':
        this.initProductForms();
        break;
      case 'animations':
        this.initAnimations();
        break;
      case 'lazyLoading':
        this.initLazyLoading();
        break;
    }
  }
  
  initProductForms() {
    // Enhanced product form handling beyond basic add to cart
    document.querySelectorAll('[data-product-form]').forEach(form => {
      new ProductFormHandler(form);
    });
  }
  
  initAnimations() {
    // Intersection Observer for scroll animations
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      });
      
      document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
      });
    }
  }
  
  initLazyLoading() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: `${this.config.lazyLoadOffset}px`
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
  
  setupAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView();
        }
      });
    }
    
    // Focus management for modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.handleTabTrapping(e);
      }
    });
  }
  
  handleTabTrapping(e) {
    const modals = document.querySelectorAll('.modal--open, .drawer--open');
    if (modals.length === 0) return;
    
    const modal = modals[modals.length - 1]; // Last opened modal
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
  
  setupPerformanceOptimizations() {
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Service worker registration (if available)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker not available, continue silently
      });
    }
  }
  
  preloadCriticalResources() {
    // Preload critical CSS
    const criticalFonts = [
      '/assets/fonts/montserrat-v25-latin-600.woff2',
      '/assets/fonts/open-sans-v34-latin-regular.woff2'
    ];
    
    criticalFonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }
  
  handleGlobalClick(event) {
    const target = event.target;
    
    // Track button clicks for analytics
    if (target.matches('button, .btn') || target.closest('button, .btn')) {
      this.trackEvent('button_click', {
        button_text: target.textContent?.trim(),
        page_location: window.location.href
      });
    }
    
    // Handle external links
    if (target.matches('a[href^="http"]') && !target.href.includes(window.location.hostname)) {
      this.trackEvent('external_link_click', {
        link_url: target.href,
        link_text: target.textContent?.trim()
      });
    }
  }
  
  handleGlobalSubmit(event) {
    const form = event.target;
    
    // Track form submissions
    if (form.matches('form')) {
      this.trackEvent('form_submit', {
        form_id: form.id || 'unknown',
        form_action: form.action || window.location.href
      });
    }
  }
  
  trackEvent(eventName, parameters = {}) {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, parameters);
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
      fbq('trackCustom', eventName, parameters);
    }
    
    // Custom analytics
    if (window.analytics && typeof window.analytics.track === 'function') {
      window.analytics.track(eventName, parameters);
    }
  }
  
  // Utility methods
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  
  // Public API
  getModule(name) {
    return this.modules[name];
  }
  
  getConfig() {
    return this.config;
  }
  
  getState() {
    return this.state;
  }
}

/**
 * Enhanced Product Form Handler
 * Handles variant selection, inventory checking, and form validation
 */
class ProductFormHandler {
  constructor(form) {
    this.form = form;
    this.productId = form.dataset.productId;
    this.currentVariant = null;
    
    this.selectors = {
      variantSelect: '[data-variant-select]',
      optionSelect: '[data-option-select]',
      priceElement: '[data-price]',
      comparePriceElement: '[data-compare-price]',
      skuElement: '[data-sku]',
      inventoryElement: '[data-inventory]',
      submitButton: '[data-add-to-cart]'
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.updateVariant();
  }
  
  bindEvents() {
    // Variant selection
    this.form.addEventListener('change', (e) => {
      if (e.target.matches(this.selectors.variantSelect) || 
          e.target.matches(this.selectors.optionSelect)) {
        this.updateVariant();
      }
    });
  }
  
  updateVariant() {
    const formData = new FormData(this.form);
    const variantId = formData.get('id');
    
    if (variantId && window.productVariants) {
      this.currentVariant = window.productVariants.find(v => v.id == variantId);
      this.updateUI();
    }
  }
  
  updateUI() {
    if (!this.currentVariant) return;
    
    // Update price
    const priceElement = this.form.querySelector(this.selectors.priceElement);
    if (priceElement) {
      priceElement.textContent = this.formatPrice(this.currentVariant.price);
    }
    
    // Update compare price
    const comparePriceElement = this.form.querySelector(this.selectors.comparePriceElement);
    if (comparePriceElement) {
      if (this.currentVariant.compare_at_price > this.currentVariant.price) {
        comparePriceElement.textContent = this.formatPrice(this.currentVariant.compare_at_price);
        comparePriceElement.style.display = 'inline';
      } else {
        comparePriceElement.style.display = 'none';
      }
    }
    
    // Update SKU
    const skuElement = this.form.querySelector(this.selectors.skuElement);
    if (skuElement) {
      skuElement.textContent = this.currentVariant.sku || '';
    }
    
    // Update inventory
    const inventoryElement = this.form.querySelector(this.selectors.inventoryElement);
    if (inventoryElement) {
      this.updateInventoryMessage();
    }
    
    // Update submit button
    this.updateSubmitButton();
  }
  
  updateInventoryMessage() {
    const inventoryElement = this.form.querySelector(this.selectors.inventoryElement);
    if (!inventoryElement || !this.currentVariant) return;
    
    const quantity = this.currentVariant.inventory_quantity;
    const policy = this.currentVariant.inventory_policy;
    
    if (!this.currentVariant.available) {
      inventoryElement.textContent = 'Out of stock';
      inventoryElement.className = 'inventory-message inventory-message--out-of-stock';
    } else if (policy === 'deny' && quantity <= 10) {
      inventoryElement.textContent = `Only ${quantity} left in stock`;
      inventoryElement.className = 'inventory-message inventory-message--low-stock';
    } else {
      inventoryElement.textContent = 'In stock';
      inventoryElement.className = 'inventory-message inventory-message--in-stock';
    }
  }
  
  updateSubmitButton() {
    const submitButton = this.form.querySelector(this.selectors.submitButton);
    if (!submitButton || !this.currentVariant) return;
    
    if (this.currentVariant.available) {
      submitButton.disabled = false;
      submitButton.textContent = 'Add to Cart';
    } else {
      submitButton.disabled = true;
      submitButton.textContent = 'Sold Out';
    }
  }
  
  formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price / 100);
  }
}

// Initialize theme when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.theme = new RecoverSupsTheme();
  });
} else {
  window.theme = new RecoverSupsTheme();
}

// Export for global access
window.RecoverSupsTheme = RecoverSupsTheme;