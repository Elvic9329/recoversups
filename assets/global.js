/**
 * RecoverSups Global JavaScript
 * Main theme JavaScript with performance optimization and lazy loading
 */

(function() {
  'use strict';

  // RecoverSups Theme Object
  window.RS = window.RS || {};

  // Theme configuration
  window.RS.config = {
    version: '1.0.0',
    debug: false,
    performance: {
      enableTracking: true,
      enableWebVitals: false
    },
    lazyLoading: {
      rootMargin: '50px 0px',
      threshold: 0.01,
      enableImages: true,
      enableComponents: true
    }
  };

  // Lazy Loading Implementation
  window.RS.lazyLoad = {
    observer: null,

    init: function() {
      if (!('IntersectionObserver' in window)) {
        this.fallback();
        return;
      }

      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        {
          rootMargin: window.RS.config.lazyLoading.rootMargin,
          threshold: window.RS.config.lazyLoading.threshold
        }
      );

      this.observeImages();
      this.observeComponents();

      if (window.RS.performance) {
        window.RS.performance.markers.push({
          name: 'lazy-loading-initialized',
          time: performance.now()
        });
      }
    },

    handleIntersection: function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;

          if (element.dataset.src) {
            this.loadImage(element);
          } else if (element.dataset.component) {
            this.loadComponent(element);
          }

          this.observer.unobserve(element);
        }
      });
    },

    loadImage: function(img) {
      const src = img.dataset.src;
      const srcset = img.dataset.srcset;

      // Create new image to preload
      const imageLoader = new Image();

      imageLoader.onload = () => {
        // Apply loaded image
        img.src = src;
        if (srcset) { img.srcset = srcset; }

        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');

        // Trigger fade-in animation
        setTimeout(() => {
          img.classList.add('fade-in');
        }, 10);

        if (window.RS.performance) {
          window.RS.performance.markers.push({
            name: 'image-lazy-loaded',
            time: performance.now(),
            src: src
          });
        }
      };

      imageLoader.onerror = () => {
        img.classList.add('lazy-error');
        console.warn('Failed to load lazy image:', src);
      };

      imageLoader.src = src;
      if (srcset) { imageLoader.srcset = srcset; }
    },

    loadComponent: function(element) {
      const componentName = element.dataset.component;
      const componentData = element.dataset.componentData ? JSON.parse(element.dataset.componentData) : {};

      element.classList.remove('lazy-loading');
      element.classList.add('component-loading');

      // Simulate component loading (replace with actual component logic)
      setTimeout(() => {
        element.classList.remove('component-loading');
        element.classList.add('component-loaded', 'fade-in');

        if (window.RS.performance) {
          window.RS.performance.markers.push({
            name: 'component-lazy-loaded',
            time: performance.now(),
            component: componentName
          });
        }
      }, 100);
    },

    observeImages: function() {
      if (!window.RS.config.lazyLoading.enableImages) { return; }

      const lazyImages = document.querySelectorAll('img[data-src], img[data-srcset]');
      lazyImages.forEach(img => {
        img.classList.add('lazy-loading');
        this.observer.observe(img);
      });
    },

    observeComponents: function() {
      if (!window.RS.config.lazyLoading.enableComponents) { return; }

      const lazyComponents = document.querySelectorAll('[data-component]');
      lazyComponents.forEach(component => {
        component.classList.add('lazy-loading');
        this.observer.observe(component);
      });
    },

    fallback: function() {
      // Fallback for browsers without IntersectionObserver
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => {
        this.loadImage(img);
      });

      const lazyComponents = document.querySelectorAll('[data-component]');
      lazyComponents.forEach(component => {
        this.loadComponent(component);
      });

      console.warn('IntersectionObserver not supported, using fallback lazy loading');
    }
  };

  // Performance monitoring enhancement
  window.RS.performance = window.RS.performance || {
    startTime: performance.now(),
    markers: []
  };

  // Enhanced Web Vitals and Performance tracking
  window.RS.webVitals = {
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,

    track: function() {
      if (typeof PerformanceObserver !== 'undefined') {
        // Core Web Vitals
        this.trackFCP();
        this.trackLCP();
        this.trackCLS();
        this.trackFID();
        this.trackTTFB();

        // Additional performance metrics
        this.trackResourceLoading();
        this.trackMemoryUsage();
      }
    },

    trackFCP: function() {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            this.fcp = entry.startTime;
            window.RS.performance.markers.push({
              name: 'first-contentful-paint',
              time: entry.startTime,
              status: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor'
            });
          }
        });
      });
      observer.observe({ entryTypes: ['paint'] });
    },

    trackLCP: function() {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];

        this.lcp = lastEntry.startTime;
        window.RS.performance.markers.push({
          name: 'largest-contentful-paint',
          time: lastEntry.startTime,
          element: lastEntry.element?.tagName || 'unknown',
          status: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor'
        });
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    },

    trackCLS: function() {
      let clsValue = 0;
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.cls = clsValue;

        // Update CLS marker
        const existingMarker = window.RS.performance.markers.find(m => m.name === 'cumulative-layout-shift');
        if (existingMarker) {
          existingMarker.value = clsValue;
          existingMarker.status = clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor';
        } else {
          window.RS.performance.markers.push({
            name: 'cumulative-layout-shift',
            value: clsValue,
            status: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
          });
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    },

    trackFID: function() {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          this.fid = entry.processingStart - entry.startTime;
          window.RS.performance.markers.push({
            name: 'first-input-delay',
            time: this.fid,
            status: this.fid < 100 ? 'good' : this.fid < 300 ? 'needs-improvement' : 'poor'
          });
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    },

    trackTTFB: function() {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      if (navigationEntry) {
        this.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        window.RS.performance.markers.push({
          name: 'time-to-first-byte',
          time: this.ttfb,
          status: this.ttfb < 800 ? 'good' : this.ttfb < 1800 ? 'needs-improvement' : 'poor'
        });
      }
    },

    trackResourceLoading: function() {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (entry.initiatorType === 'img' || entry.initiatorType === 'css' || entry.initiatorType === 'script') {
            window.RS.performance.markers.push({
              name: `resource-${entry.initiatorType}`,
              url: entry.name,
              duration: entry.duration,
              size: entry.transferSize || 0,
              status: entry.duration < 1000 ? 'good' : entry.duration < 2000 ? 'needs-improvement' : 'poor'
            });
          }
        });
      });
      observer.observe({ entryTypes: ['resource'] });
    },

    trackMemoryUsage: function() {
      if ('memory' in performance) {
        const memory = performance.memory;
        window.RS.performance.markers.push({
          name: 'memory-usage',
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
          usagePercent: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)
        });
      }
    },

    generateReport: function() {
      const report = {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        metrics: {
          fcp: this.fcp,
          lcp: this.lcp,
          cls: this.cls,
          fid: this.fid,
          ttfb: this.ttfb
        },
        markers: window.RS.performance.markers,
        scores: this.calculateScores()
      };

      return report;
    },

    calculateScores: function() {
      const scores = {
        performance: 0,
        accessibility: 0,
        bestPractices: 0,
        seo: 0
      };

      // Performance score based on Core Web Vitals
      let performanceScore = 0;
      if (this.fcp && this.fcp < 1800) { performanceScore += 25; } else if (this.fcp && this.fcp < 3000) { performanceScore += 15; }

      if (this.lcp && this.lcp < 2500) { performanceScore += 25; } else if (this.lcp && this.lcp < 4000) { performanceScore += 15; }

      if (this.cls && this.cls < 0.1) { performanceScore += 25; } else if (this.cls && this.cls < 0.25) { performanceScore += 15; }

      if (this.fid && this.fid < 100) { performanceScore += 25; } else if (this.fid && this.fid < 300) { performanceScore += 15; }

      scores.performance = performanceScore;

      return scores;
    }
  };

  // Performance Testing Suite
  window.RS.performanceTest = {
    isRunning: false,
    testResults: [],

    run: function() {
      if (this.isRunning) { return; }

      this.isRunning = true;
      this.testResults = [];

      console.log('🚀 Starting RecoverSups Performance Tests...');

      // Test 1: Load Time Analysis
      this.testLoadTimes();

      // Test 2: Resource Analysis
      this.testResources();

      // Test 3: Render Performance
      this.testRenderPerformance();

      // Test 4: JavaScript Performance
      this.testJavaScriptPerformance();

      // Test 5: Memory Usage
      this.testMemoryUsage();

      // Generate final report
      setTimeout(() => {
        this.generateTestReport();
        this.isRunning = false;
      }, 3000);
    },

    testLoadTimes: function() {
      const timing = performance.timing;
      const navigation = performance.getEntriesByType('navigation')[0];

      const loadTimes = {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        loadComplete: timing.loadEventEnd - timing.navigationStart,
        firstByte: timing.responseStart - timing.requestStart,
        domInteractive: timing.domInteractive - timing.navigationStart
      };

      this.testResults.push({
        category: 'Load Times',
        results: loadTimes,
        status: loadTimes.loadComplete < 3000 ? 'good' : loadTimes.loadComplete < 5000 ? 'warning' : 'poor'
      });
    },

    testResources: function() {
      const resources = performance.getEntriesByType('resource');
      const analysis = {
        totalResources: resources.length,
        totalSize: 0,
        slowResources: [],
        largeResources: []
      };

      resources.forEach(resource => {
        const size = resource.transferSize || 0;
        analysis.totalSize += size;

        if (resource.duration > 1000) {
          analysis.slowResources.push({
            name: resource.name.split('/').pop(),
            duration: resource.duration
          });
        }

        if (size > 100000) {
          analysis.largeResources.push({
            name: resource.name.split('/').pop(),
            size: Math.round(size / 1024) + 'KB'
          });
        }
      });

      this.testResults.push({
        category: 'Resources',
        results: analysis,
        status: analysis.slowResources.length === 0 && analysis.largeResources.length < 3 ? 'good' : 'warning'
      });
    },

    testRenderPerformance: function() {
      const paintEntries = performance.getEntriesByType('paint');
      const renderMetrics = {};

      paintEntries.forEach(entry => {
        renderMetrics[entry.name] = entry.startTime;
      });

      this.testResults.push({
        category: 'Render Performance',
        results: renderMetrics,
        status: renderMetrics['first-contentful-paint'] < 1800 ? 'good' : 'warning'
      });
    },

    testJavaScriptPerformance: function() {
      const start = performance.now();

      // Simulate some JS work
      for (let i = 0; i < 100000; i++) {
        Math.random();
      }

      const jsExecutionTime = performance.now() - start;

      this.testResults.push({
        category: 'JavaScript Performance',
        results: {
          executionTime: jsExecutionTime,
          heapUsed: performance.memory ? performance.memory.usedJSHeapSize : 'N/A'
        },
        status: jsExecutionTime < 10 ? 'good' : jsExecutionTime < 50 ? 'warning' : 'poor'
      });
    },

    testMemoryUsage: function() {
      if (performance.memory) {
        const memory = performance.memory;
        const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;

        this.testResults.push({
          category: 'Memory Usage',
          results: {
            used: Math.round(memory.usedJSHeapSize / 1048576) + 'MB',
            total: Math.round(memory.totalJSHeapSize / 1048576) + 'MB',
            limit: Math.round(memory.jsHeapSizeLimit / 1048576) + 'MB',
            usagePercent: Math.round(usagePercent) + '%'
          },
          status: usagePercent < 50 ? 'good' : usagePercent < 80 ? 'warning' : 'poor'
        });
      }
    },

    generateTestReport: function() {
      console.log('📊 Performance Test Report:');
      console.log('='.repeat(50));

      this.testResults.forEach(test => {
        const icon = test.status === 'good' ? '✅' : test.status === 'warning' ? '⚠️' : '❌';
        console.log(`${icon} ${test.category}:`, test.results);
      });

      console.log('='.repeat(50));

      // Web Vitals summary
      const webVitalsReport = window.RS.webVitals.generateReport();
      console.log('📈 Web Vitals Report:', webVitalsReport);

      return {
        performanceTests: this.testResults,
        webVitals: webVitalsReport
      };
    }
  };

  // Initialize theme
  window.RS.init = function() {
    // Mark JavaScript as loaded
    if (window.RS.loadingStates) {
      window.RS.loadingStates.js = true;
    }

    // Initialize lazy loading
    window.RS.lazyLoad.init();

    // Start Web Vitals tracking (always enabled for performance monitoring)
    window.RS.webVitals.track();

    // Add performance test commands to console
    if (window.RS.config.debug) {
      console.log('🛠️ RecoverSups Performance Tools:');
      console.log('- RSTest.responsive.init() - Initialize responsive testing');
      console.log('- RS.performanceTest.run() - Run performance tests');
      console.log('- RS.webVitals.generateReport() - Generate Web Vitals report');
    }

    // Performance tracking
    if (window.RS.performance) {
      window.RS.performance.markers.push({
        name: 'global-js-loaded',
        time: performance.now()
      });
    }

    if (window.RS.config.debug) {
      console.log('RecoverSups Theme v' + window.RS.config.version + ' initialized');
      console.log('Lazy loading enabled:', window.RS.config.lazyLoading);
    }
  };

  // Utility functions for theme components
  window.RS.utils = {
    debounce: function(func, wait, immediate) {
      let timeout;
      return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
          timeout = null;
          if (!immediate) { func.apply(context, args); }
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) { func.apply(context, args); }
      };
    },

    throttle: function(func, limit) {
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
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.RS.init);
  } else {
    window.RS.init();
  }

})();
