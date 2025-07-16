/**
 * RecoverSups Responsive Testing Utilities
 * Tools for testing layout responsiveness across devices
 */

(function() {
  'use strict';

  // Responsive testing configuration
  window.RSTest = window.RSTest || {};

  window.RSTest.config = {
    breakpoints: {
      mobile: { width: 375, height: 667, name: 'iPhone SE' },
      mobileLarge: { width: 414, height: 896, name: 'iPhone 11 Pro Max' },
      tablet: { width: 768, height: 1024, name: 'iPad' },
      tabletLarge: { width: 1024, height: 1366, name: 'iPad Pro' },
      desktop: { width: 1280, height: 720, name: 'Desktop HD' },
      desktopLarge: { width: 1920, height: 1080, name: 'Desktop FHD' },
      ultrawide: { width: 2560, height: 1440, name: 'Ultrawide' }
    },
    testSelectors: [
      '.page-width',
      '.container',
      '.grid',
      '.site-header',
      '.site-footer',
      '.main-content',
      '.section',
      '.card-enhanced',
      '.btn',
      '.form-input-enhanced'
    ]
  };

  // Responsive testing utilities
  window.RSTest.responsive = {
    currentBreakpoint: null,
    testResults: [],

    // Initialize responsive testing
    init: function() {
      this.detectCurrentBreakpoint();
      this.addTestControls();
      this.bindEvents();
      
      console.log('RecoverSups Responsive Testing initialized');
      console.log('Current breakpoint:', this.currentBreakpoint);
    },

    // Detect current breakpoint
    detectCurrentBreakpoint: function() {
      const width = window.innerWidth;
      
      if (width < 640) {
        this.currentBreakpoint = 'mobile';
      } else if (width < 768) {
        this.currentBreakpoint = 'mobileLarge';
      } else if (width < 1024) {
        this.currentBreakpoint = 'tablet';
      } else if (width < 1280) {
        this.currentBreakpoint = 'tabletLarge';
      } else if (width < 1920) {
        this.currentBreakpoint = 'desktop';
      } else {
        this.currentBreakpoint = 'desktopLarge';
      }
    },

    // Add testing controls to page
    addTestControls: function() {
      if (document.getElementById('rs-test-controls')) return;

      const controls = document.createElement('div');
      controls.id = 'rs-test-controls';
      controls.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 15px;
        border-radius: 8px;
        font-family: monospace;
        font-size: 12px;
        z-index: 10000;
        max-width: 300px;
        display: none;
      `;

      let controlsHTML = `
        <div style="margin-bottom: 10px;">
          <strong>RecoverSups Responsive Test</strong>
          <button onclick="RSTest.responsive.toggleControls()" style="float: right; background: #b62921; color: white; border: none; padding: 2px 8px; border-radius: 4px; cursor: pointer;">×</button>
        </div>
        <div>Current: <span id="current-breakpoint">${this.currentBreakpoint}</span></div>
        <div>Size: <span id="current-size">${window.innerWidth}×${window.innerHeight}</span></div>
        <div style="margin: 10px 0;">
          <button onclick="RSTest.responsive.runTests()" style="background: #10b981; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-right: 5px;">Run Tests</button>
          <button onclick="RSTest.responsive.showBreakpoints()" style="background: #3b82f6; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Breakpoints</button>
        </div>
        <div id="test-results" style="max-height: 200px; overflow-y: auto;"></div>
      `;

      controls.innerHTML = controlsHTML;
      document.body.appendChild(controls);

      // Add toggle button
      const toggleBtn = document.createElement('button');
      toggleBtn.id = 'rs-test-toggle';
      toggleBtn.innerHTML = '📱';
      toggleBtn.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: #b62921;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 10001;
        font-size: 16px;
      `;
      toggleBtn.onclick = () => this.toggleControls();
      document.body.appendChild(toggleBtn);
    },

    // Toggle test controls visibility
    toggleControls: function() {
      const controls = document.getElementById('rs-test-controls');
      const toggle = document.getElementById('rs-test-toggle');
      
      if (controls.style.display === 'none') {
        controls.style.display = 'block';
        toggle.style.display = 'none';
      } else {
        controls.style.display = 'none';
        toggle.style.display = 'block';
      }
    },

    // Show available breakpoints
    showBreakpoints: function() {
      const resultsDiv = document.getElementById('test-results');
      let html = '<div style="margin-bottom: 10px;"><strong>Available Breakpoints:</strong></div>';
      
      Object.entries(window.RSTest.config.breakpoints).forEach(([key, bp]) => {
        html += `
          <div style="margin-bottom: 5px; padding: 5px; background: rgba(255,255,255,0.1); border-radius: 4px;">
            <div><strong>${bp.name}</strong></div>
            <div>${bp.width}×${bp.height} (${key})</div>
            <button onclick="RSTest.responsive.simulateBreakpoint('${key}')" 
                    style="background: #f59e0b; color: white; border: none; padding: 2px 6px; border-radius: 3px; cursor: pointer; margin-top: 3px;">
              Test
            </button>
          </div>
        `;
      });
      
      resultsDiv.innerHTML = html;
    },

    // Simulate breakpoint (for desktop testing)
    simulateBreakpoint: function(breakpointKey) {
      const bp = window.RSTest.config.breakpoints[breakpointKey];
      if (!bp) return;

      // Create simulation overlay
      const overlay = document.createElement('div');
      overlay.id = 'rs-breakpoint-simulation';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: ${bp.width}px;
        height: ${bp.height}px;
        border: 3px solid #b62921;
        background: white;
        z-index: 9999;
        overflow: auto;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
      `;

      // Clone current page content
      const content = document.documentElement.cloneNode(true);
      const iframe = document.createElement('iframe');
      iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
      `;
      
      overlay.appendChild(iframe);
      document.body.appendChild(overlay);

      // Add close button
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '×';
      closeBtn.style.cssText = `
        position: absolute;
        top: -30px;
        right: 0;
        background: #b62921;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px 4px 0 0;
        cursor: pointer;
      `;
      closeBtn.onclick = () => overlay.remove();
      overlay.appendChild(closeBtn);

      // Add title
      const title = document.createElement('div');
      title.innerHTML = `${bp.name} - ${bp.width}×${bp.height}`;
      title.style.cssText = `
        position: absolute;
        top: -30px;
        left: 0;
        background: #2d3748;
        color: white;
        padding: 5px 10px;
        border-radius: 4px 4px 0 0;
        font-family: monospace;
        font-size: 12px;
      `;
      overlay.appendChild(title);

      console.log(`Simulating ${bp.name} (${bp.width}×${bp.height})`);
    },

    // Run comprehensive responsive tests
    runTests: function() {
      this.testResults = [];
      const resultsDiv = document.getElementById('test-results');
      resultsDiv.innerHTML = '<div>Running tests...</div>';

      // Test 1: Container widths
      this.testContainerWidths();
      
      // Test 2: Grid responsiveness
      this.testGridResponsiveness();
      
      // Test 3: Typography scaling
      this.testTypographyScaling();
      
      // Test 4: Navigation behavior
      this.testNavigationBehavior();
      
      // Test 5: Image responsiveness
      this.testImageResponsiveness();

      // Display results
      this.displayTestResults();
    },

    // Test container widths
    testContainerWidths: function() {
      const containers = document.querySelectorAll('.page-width, .container');
      containers.forEach(container => {
        const styles = getComputedStyle(container);
        const maxWidth = styles.maxWidth;
        const padding = styles.paddingLeft;
        
        this.testResults.push({
          test: 'Container Width',
          element: container.className,
          result: `max-width: ${maxWidth}, padding: ${padding}`,
          status: maxWidth !== 'none' ? 'pass' : 'warning'
        });
      });
    },

    // Test grid responsiveness
    testGridResponsiveness: function() {
      const grids = document.querySelectorAll('.grid, .grid-enhanced, [class*="grid-"]');
      grids.forEach(grid => {
        const styles = getComputedStyle(grid);
        const gridColumns = styles.gridTemplateColumns;
        
        this.testResults.push({
          test: 'Grid Responsiveness',
          element: grid.className,
          result: `columns: ${gridColumns || 'none'}`,
          status: gridColumns !== 'none' ? 'pass' : 'fail'
        });
      });
    },

    // Test typography scaling
    testTypographyScaling: function() {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        const styles = getComputedStyle(heading);
        const fontSize = parseFloat(styles.fontSize);
        const lineHeight = styles.lineHeight;
        
        this.testResults.push({
          test: 'Typography Scaling',
          element: heading.tagName.toLowerCase(),
          result: `${fontSize}px / ${lineHeight}`,
          status: fontSize >= 14 ? 'pass' : 'warning'
        });
      });
    },

    // Test navigation behavior
    testNavigationBehavior: function() {
      const nav = document.querySelector('.site-header, nav, [role="navigation"]');
      if (nav) {
        const styles = getComputedStyle(nav);
        const position = styles.position;
        const zIndex = styles.zIndex;
        
        this.testResults.push({
          test: 'Navigation Behavior',
          element: nav.className || 'navigation',
          result: `position: ${position}, z-index: ${zIndex}`,
          status: position === 'sticky' || position === 'fixed' ? 'pass' : 'warning'
        });
      }
    },

    // Test image responsiveness
    testImageResponsiveness: function() {
      const images = document.querySelectorAll('img');
      let responsiveCount = 0;
      
      images.forEach(img => {
        const styles = getComputedStyle(img);
        const maxWidth = styles.maxWidth;
        const height = styles.height;
        
        if (maxWidth === '100%' || height === 'auto') {
          responsiveCount++;
        }
      });
      
      this.testResults.push({
        test: 'Image Responsiveness',
        element: 'images',
        result: `${responsiveCount}/${images.length} responsive`,
        status: responsiveCount / images.length > 0.8 ? 'pass' : 'warning'
      });
    },

    // Display test results
    displayTestResults: function() {
      const resultsDiv = document.getElementById('test-results');
      let html = '<div style="margin-bottom: 10px;"><strong>Test Results:</strong></div>';
      
      this.testResults.forEach(result => {
        const statusColor = result.status === 'pass' ? '#10b981' : 
                           result.status === 'warning' ? '#f59e0b' : '#ef4444';
        
        html += `
          <div style="margin-bottom: 5px; padding: 5px; background: rgba(255,255,255,0.1); border-radius: 4px; border-left: 3px solid ${statusColor};">
            <div style="font-weight: bold;">${result.test}</div>
            <div style="font-size: 11px; opacity: 0.8;">${result.element}</div>
            <div style="font-size: 11px;">${result.result}</div>
          </div>
        `;
      });
      
      resultsDiv.innerHTML = html;
      
      console.log('Responsive tests completed:', this.testResults);
    },

    // Bind events
    bindEvents: function() {
      window.addEventListener('resize', () => {
        this.detectCurrentBreakpoint();
        document.getElementById('current-breakpoint').textContent = this.currentBreakpoint;
        document.getElementById('current-size').textContent = `${window.innerWidth}×${window.innerHeight}`;
      });
    }
  };

  // Auto-initialize in development mode
  if (window.RS && window.RS.config && window.RS.config.debug) {
    document.addEventListener('DOMContentLoaded', () => {
      window.RSTest.responsive.init();
    });
  }

})();