/**
 * Bundle Card Component - RecoverSups Theme
 * Compatible with Bundler app JavaScript API
 * @version 2.0.0
 */

export class BundleCardManager {
  constructor() {
    this.config = {
      bundlerWidgetSelector: '[data-bundler-widget]',
      bundleCardSelector: '[data-bundle-card]',
      addToCartSelector: '[data-bundler-add-to-cart]',
      manualAddSelector: '[data-manual-bundle-add]',
      bundlerApiTimeout: 5000
    };
    
    this.bundlerLoaded = false;
    this.bundleCards = [];
    
    this.init();
  }
  
  init() {
    this.detectBundlerApp();
    this.setupEventListeners();
    this.initializeBundleCards();
  }
  
  detectBundlerApp() {
    // Check if Bundler app is available
    if (typeof window.bndlr !== 'undefined') {
      this.bundlerLoaded = true;
      this.setupBundlerIntegration();
    } else {
      // Wait for Bundler to load
      this.waitForBundler();
    }
  }
  
  waitForBundler() {
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds with 100ms intervals
    
    const checkBundler = () => {
      attempts++;
      
      if (typeof window.bndlr !== 'undefined') {
        this.bundlerLoaded = true;
        this.setupBundlerIntegration();
        return;
      }
      
      if (attempts < maxAttempts) {
        setTimeout(checkBundler, 100);
      } else {
        console.warn('Bundler app not detected, falling back to manual bundle handling');
        this.setupManualBundleHandling();
      }
    };
    
    checkBundler();
  }
  
  setupBundlerIntegration() {
    console.log('Bundler app detected, setting up integration');
    
    // Listen for Bundler events
    document.addEventListener('bundler:loaded', () => {
      this.onBundlerLoaded();
    });
    
    document.addEventListener('bundler:bundle_widget_created', (event) => {
      this.onBundleWidgetCreated(event);
    });
    
    document.addEventListener('bndlr:bundle_added_to_cart', (event) => {
      this.onBundleAddedToCart(event);
    });
    
    document.addEventListener('bundler:total_cart_values', (event) => {
      this.onCartValuesUpdated(event);
    });
    
    // Initialize existing widgets
    this.initializeBundlerWidgets();
  }
  
  setupManualBundleHandling() {
    console.log('Setting up manual bundle handling');
    
    // Handle manual bundle additions
    document.addEventListener('click', (e) => {
      if (e.target.matches(this.config.manualAddSelector)) {
        e.preventDefault();
        this.handleManualBundleAdd(e.target);
      }
    });
  }
  
  setupEventListeners() {
    // Handle Bundler add-to-cart buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches(this.config.addToCartSelector)) {
        e.preventDefault();
        this.handleBundlerAddToCart(e.target);
      }
    });
    
    // Handle card interactions
    document.addEventListener('mouseenter', (e) => {
      if (e.target.matches(this.config.bundleCardSelector)) {
        this.onCardHover(e.target);
      }
    }, true);
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.target.matches(`${this.config.bundleCardSelector} button`)) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.target.click();
        }
      }
    });
  }
  
  initializeBundleCards() {
    const cards = document.querySelectorAll(this.config.bundleCardSelector);
    
    cards.forEach((card, index) => {
      const cardData = {
        element: card,
        id: card.dataset.blockId,
        bundlerId: card.dataset.bundlerId,
        useBundler: card.dataset.useBundler === 'true',
        index: card.dataset.index || index
      };
      
      this.bundleCards.push(cardData);
      this.setupCard(cardData);
    });
  }
  
  setupCard(cardData) {
    const { element, bundlerId, useBundler } = cardData;
    
    if (useBundler && bundlerId && this.bundlerLoaded) {
      this.setupBundlerCard(element, bundlerId);
    }
    
    // Add loading state
    element.classList.add('bundle-card--loading');
    
    // Remove loading state after setup
    setTimeout(() => {
      element.classList.remove('bundle-card--loading');
      element.classList.add('bundle-card--ready');
    }, 300);
  }
  
  setupBundlerCard(cardElement, bundlerId) {
    const widgetContainer = cardElement.querySelector(this.config.bundlerWidgetSelector);
    
    if (widgetContainer && window.bndlr) {
      try {
        // Initialize Bundler widget for this specific bundle
        this.initializeBundlerWidget(widgetContainer, bundlerId);
      } catch (error) {
        console.error('Error setting up Bundler widget:', error);
        this.fallbackToManualHandling(cardElement);
      }
    }
  }
  
  initializeBundlerWidget(container, bundleId) {
    // Set bundle-specific attributes for Bundler app
    container.setAttribute('data-bundle-id', bundleId);
    container.classList.add('bundler-widget-container');
    
    // Trigger Bundler widget refresh for this specific bundle
    if (window.bndlr && window.bndlr.refresh) {
      window.bndlr.refresh();
    }
  }
  
  initializeBundlerWidgets() {
    const widgets = document.querySelectorAll(this.config.bundlerWidgetSelector);
    
    widgets.forEach(widget => {
      const bundleId = widget.dataset.bundleId;
      if (bundleId) {
        this.initializeBundlerWidget(widget, bundleId);
      }
    });
  }
  
  handleBundlerAddToCart(button) {
    const bundleId = button.dataset.bundleId;
    const card = button.closest(this.config.bundleCardSelector);
    
    if (!bundleId) {
      console.error('No bundle ID found for Bundler add-to-cart');
      return;
    }
    
    // Show loading state
    this.setButtonLoading(button, true);
    
    try {
      if (window.bndlr && window.bndlr.checkout) {
        // Use Bundler's checkout method
        window.bndlr.checkout(bundleId);
      } else {
        // Fallback: redirect to bundle URL
        const bundleUrl = `/products/${bundleId}`;
        window.location.href = bundleUrl;
      }
    } catch (error) {
      console.error('Error adding bundle to cart:', error);
      this.showNotification('Failed to add bundle to cart', 'error');
      this.setButtonLoading(button, false);
    }
  }
  
  async handleManualBundleAdd(button) {
    const productsData = button.dataset.products;
    const card = button.closest(this.config.bundleCardSelector);
    
    if (!productsData) {
      console.error('No products data found for manual bundle add');
      return;
    }
    
    try {
      const products = JSON.parse(productsData);
      this.setButtonLoading(button, true);
      
      // Add each product to cart
      const addPromises = products.map(productHandle => 
        this.addProductToCart(productHandle)
      );
      
      await Promise.all(addPromises);
      
      this.showNotification('Bundle added to cart successfully!', 'success');
      this.onBundleAddedToCart({ bundleId: 'manual', products });
      
    } catch (error) {
      console.error('Error adding manual bundle to cart:', error);
      this.showNotification('Failed to add bundle to cart', 'error');
    } finally {
      this.setButtonLoading(button, false);
    }
  }
  
  async addProductToCart(productHandle) {
    try {
      // Fetch product data
      const response = await fetch(`/products/${productHandle}.js`);
      const product = await response.json();
      
      if (!product.variants || product.variants.length === 0) {
        throw new Error(`No variants found for product: ${productHandle}`);
      }
      
      // Add first available variant to cart
      const variant = product.variants[0];
      const addResponse = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: variant.id,
          quantity: 1
        })
      });
      
      if (!addResponse.ok) {
        throw new Error(`Failed to add ${productHandle} to cart`);
      }
      
      return await addResponse.json();
      
    } catch (error) {
      console.error(`Error adding product ${productHandle} to cart:`, error);
      throw error;
    }
  }
  
  setButtonLoading(button, isLoading) {
    if (isLoading) {
      button.disabled = true;
      button.classList.add('btn--loading');
      
      const originalText = button.textContent;
      button.dataset.originalText = originalText;
      button.textContent = 'Adding...';
      
    } else {
      button.disabled = false;
      button.classList.remove('btn--loading');
      
      const originalText = button.dataset.originalText;
      if (originalText) {
        button.textContent = originalText;
      }
    }
  }
  
  onCardHover(card) {
    // Add visual feedback on hover
    card.classList.add('bundle-card--hovered');
    
    // Remove hover class after a delay
    setTimeout(() => {
      card.classList.remove('bundle-card--hovered');
    }, 300);
  }
  
  // Bundler Event Handlers
  onBundlerLoaded() {
    console.log('Bundler app fully loaded');
    this.initializeBundlerWidgets();
  }
  
  onBundleWidgetCreated(event) {
    console.log('Bundler widget created:', event.detail);
    
    // Customize widget appearance if needed
    if (event.detail && event.detail.widget) {
      this.customizeBundlerWidget(event.detail.widget);
    }
  }
  
  onBundleAddedToCart(event) {
    console.log('Bundle added to cart:', event.detail || event);
    
    // Show success notification
    this.showNotification('Bundle added to cart!', 'success');
    
    // Update cart count
    this.updateCartCount();
    
    // Track analytics
    this.trackBundleAddedEvent(event.detail || event);
  }
  
  onCartValuesUpdated(event) {
    console.log('Cart values updated:', event.detail);
    
    // Update any cart-related UI elements
    this.updateCartDisplay(event.detail);
  }
  
  customizeBundlerWidget(widget) {
    // Add custom CSS classes to Bundler widgets
    if (widget && widget.classList) {
      widget.classList.add('bundler-widget--custom');
      widget.classList.add('bundler-widget--recoversups');
    }
  }
  
  fallbackToManualHandling(cardElement) {
    console.warn('Falling back to manual bundle handling for card:', cardElement);
    
    // Add fallback class
    cardElement.classList.add('bundle-card--manual-fallback');
    
    // Show manual add-to-cart button
    const bundlerBtn = cardElement.querySelector(this.config.addToCartSelector);
    const manualBtn = cardElement.querySelector(this.config.manualAddSelector);
    
    if (bundlerBtn && manualBtn) {
      bundlerBtn.style.display = 'none';
      manualBtn.style.display = 'block';
    }
  }
  
  updateCartCount() {
    // Update cart count in header
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const countElements = document.querySelectorAll('[data-cart-count]');
        countElements.forEach(element => {
          element.textContent = cart.item_count;
        });
      })
      .catch(error => {
        console.error('Error updating cart count:', error);
      });
  }
  
  updateCartDisplay(cartData) {
    // Update any cart-related display elements
    if (cartData && cartData.total) {
      const totalElements = document.querySelectorAll('[data-cart-total]');
      totalElements.forEach(element => {
        element.textContent = this.formatMoney(cartData.total);
      });
    }
  }
  
  trackBundleAddedEvent(eventData) {
    // Track bundle addition for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'add_to_cart', {
        event_category: 'Bundle',
        event_label: eventData.bundleId || 'unknown',
        value: eventData.value || 0
      });
    }
    
    // Custom event for theme
    document.dispatchEvent(new CustomEvent('bundle:added', {
      detail: eventData
    }));
  }
  
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type} notification--bundle`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.classList.add('is-visible');
    });
    
    // Remove after delay
    setTimeout(() => {
      notification.classList.remove('is-visible');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }
  
  formatMoney(cents) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(cents / 100);
  }
  
  // Public API
  refreshBundlerWidgets() {
    if (window.bndlr && window.bndlr.refresh) {
      window.bndlr.refresh();
    }
  }
  
  getBundleData(bundleId) {
    if (window.bndlr && window.bndlr.getBundles) {
      return window.bndlr.getBundles().find(bundle => bundle.id === bundleId);
    }
    return null;
  }
}

// Initialize bundle card manager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.bundleCardManager = new BundleCardManager();
  });
} else {
  window.bundleCardManager = new BundleCardManager();
}

// Export for use in other modules
export default BundleCardManager;