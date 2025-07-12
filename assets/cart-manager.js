/**
 * Cart Manager - RecoverSups Theme
 * 
 * Centralized cart management system using Singleton pattern
 * Consolidates all cart-related functionality from multiple files
 * Handles AJAX cart operations, UI updates, and state management
 */

class CartManager {
  constructor() {
    if (CartManager.instance) {
      return CartManager.instance;
    }
    
    this.cart = null;
    this.isLoading = false;
    this.eventListeners = new Map();
    this.config = {
      enableNotifications: true,
      enableAnalytics: true,
      freeShippingThreshold: 7500, // $75.00 in cents
      maxRetries: 3,
      retryDelay: 1000
    };
    
    CartManager.instance = this;
    this.init();
    return this;
  }
  
  /**
   * Initialize cart manager
   */
  async init() {
    try {
      await this.loadCart();
      this.bindGlobalEvents();
      this.initializeComponents();
      this.dispatchEvent('cart:manager:ready', { cart: this.cart });
    } catch (error) {
      console.error('CartManager initialization failed:', error);
    }
  }
  
  /**
   * Load current cart state from Shopify
   */
  async loadCart() {
    try {
      const response = await fetch('/cart.js');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.cart = await response.json();
      return this.cart;
    } catch (error) {
      console.error('Failed to load cart:', error);
      throw error;
    }
  }
  
  /**
   * Add item to cart with retry logic
   */
  async addItem(variantId, quantity = 1, properties = {}) {
    let retries = 0;
    
    while (retries < this.config.maxRetries) {
      try {
        this.setLoading(true);
        
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: variantId,
            quantity: quantity,
            properties: properties
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.description || 'Failed to add item to cart');
        }
        
        await this.loadCart();
        this.dispatchEvent('cart:item:added', { 
          variantId, 
          quantity, 
          cart: this.cart 
        });
        
        if (this.config.enableNotifications) {
          this.showNotification('Item added to cart', 'success');
        }
        
        return this.cart;
        
      } catch (error) {
        retries++;
        if (retries >= this.config.maxRetries) {
          console.error('Failed to add item after retries:', error);
          if (this.config.enableNotifications) {
            this.showNotification('Failed to add item to cart', 'error');
          }
          throw error;
        }
        await this.delay(this.config.retryDelay * retries);
      } finally {
        this.setLoading(false);
      }
    }
  }
  
  /**
   * Update item quantity in cart
   */
  async updateItem(key, quantity) {
    try {
      this.setLoading(true);
      
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: key,
          quantity: quantity
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update cart item');
      }
      
      await this.loadCart();
      this.dispatchEvent('cart:item:updated', { 
        key, 
        quantity, 
        cart: this.cart 
      });
      
      return this.cart;
      
    } catch (error) {
      console.error('Failed to update cart item:', error);
      if (this.config.enableNotifications) {
        this.showNotification('Failed to update cart', 'error');
      }
      throw error;
    } finally {
      this.setLoading(false);
    }
  }
  
  /**
   * Remove item from cart
   */
  async removeItem(key) {
    return this.updateItem(key, 0);
  }
  
  /**
   * Clear entire cart
   */
  async clearCart() {
    try {
      this.setLoading(true);
      
      const response = await fetch('/cart/clear.js', {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }
      
      await this.loadCart();
      this.dispatchEvent('cart:cleared', { cart: this.cart });
      
      if (this.config.enableNotifications) {
        this.showNotification('Cart cleared', 'info');
      }
      
      return this.cart;
      
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }
  
  /**
   * Update cart note
   */
  async updateNote(note) {
    try {
      const response = await fetch('/cart/update.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: note })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update cart note');
      }
      
      await this.loadCart();
      this.dispatchEvent('cart:note:updated', { 
        note, 
        cart: this.cart 
      });
      
      return this.cart;
      
    } catch (error) {
      console.error('Failed to update cart note:', error);
      throw error;
    }
  }
  
  /**
   * Get cart totals and metrics
   */
  getCartMetrics() {
    if (!this.cart) return null;
    
    const metrics = {
      itemCount: this.cart.item_count,
      totalPrice: this.cart.total_price,
      subtotalPrice: this.cart.total_price,
      currency: this.cart.currency,
      freeShippingEligible: this.cart.total_price >= this.config.freeShippingThreshold,
      freeShippingRemaining: Math.max(0, this.config.freeShippingThreshold - this.cart.total_price),
      totalSavings: 0,
      fitnessGoals: new Set(),
      productTypes: new Set()
    };
    
    // Calculate savings and extract metadata
    this.cart.items.forEach(item => {
      if (item.original_price > item.final_price) {
        metrics.totalSavings += (item.original_price - item.final_price) * item.quantity;
      }
      
      // Extract fitness goals and product types for recommendations
      if (item.product_type) {
        metrics.productTypes.add(item.product_type);
      }
    });
    
    metrics.fitnessGoals = Array.from(metrics.fitnessGoals);
    metrics.productTypes = Array.from(metrics.productTypes);
    
    return metrics;
  }
  
  /**
   * Get personalized recommendations based on cart contents
   */
  getRecommendations() {
    const metrics = this.getCartMetrics();
    if (!metrics) return [];
    
    const recommendations = [];
    
    // Rule-based recommendations
    if (metrics.productTypes.includes('Protein') && !metrics.productTypes.includes('Creatine')) {
      recommendations.push({
        type: 'complement',
        title: 'Add Creatine for Enhanced Strength',
        reason: 'Creatine works synergistically with protein for muscle building',
        collection: 'creatine'
      });
    }
    
    if (metrics.productTypes.includes('Pre-Workout') && !metrics.productTypes.includes('Post-Workout')) {
      recommendations.push({
        type: 'stack',
        title: 'Complete Your Workout Stack',
        reason: 'Post-workout recovery is essential for optimal results',
        collection: 'post-workout'
      });
    }
    
    // Free shipping incentive
    if (!metrics.freeShippingEligible && metrics.freeShippingRemaining <= 2500) {
      recommendations.push({
        type: 'shipping',
        title: 'Add $' + (metrics.freeShippingRemaining / 100).toFixed(2) + ' for Free Shipping',
        reason: 'Save on shipping costs',
        collection: 'add-ons'
      });
    }
    
    return recommendations;
  }
  
  /**
   * Bind global event listeners
   */
  bindGlobalEvents() {
    // Listen for add to cart forms
    document.addEventListener('submit', (event) => {
      if (event.target.matches('form[action*="/cart/add"]')) {
        event.preventDefault();
        this.handleAddToCartForm(event.target);
      }
    });
    
    // Listen for quantity changes
    document.addEventListener('change', (event) => {
      if (event.target.matches('input[name^="updates["]')) {
        this.handleQuantityChange(event.target);
      }
    });
    
    // Listen for cart drawer toggles
    document.addEventListener('click', (event) => {
      if (event.target.matches('[data-cart-toggle]') || 
          event.target.closest('[data-cart-toggle]')) {
        event.preventDefault();
        this.toggleCartDrawer();
      }
    });
    
    // Listen for remove buttons
    document.addEventListener('click', (event) => {
      if (event.target.matches('[data-cart-remove]') || 
          event.target.closest('[data-cart-remove]')) {
        event.preventDefault();
        const key = event.target.closest('[data-cart-remove]').dataset.cartRemove;
        this.removeItem(key);
      }
    });
  }
  
  /**
   * Handle add to cart form submission
   */
  async handleAddToCartForm(form) {
    const formData = new FormData(form);
    const variantId = formData.get('id');
    const quantity = parseInt(formData.get('quantity')) || 1;
    
    const properties = {};
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('properties[')) {
        const propKey = key.replace('properties[', '').replace(']', '');
        properties[propKey] = value;
      }
    }
    
    try {
      await this.addItem(variantId, quantity, properties);
      
      // Show cart drawer after successful add
      this.openCartDrawer();
      
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  }
  
  /**
   * Handle quantity input changes
   */
  async handleQuantityChange(input) {
    const key = input.name.match(/updates\[(.+)\]/)[1];
    const quantity = parseInt(input.value) || 0;
    
    try {
      await this.updateItem(key, quantity);
    } catch (error) {
      // Revert input value on error
      input.value = this.getItemQuantity(key);
    }
  }
  
  /**
   * Get current quantity for an item
   */
  getItemQuantity(key) {
    if (!this.cart) return 0;
    const item = this.cart.items.find(item => item.key === key);
    return item ? item.quantity : 0;
  }
  
  /**
   * Cart drawer management
   */
  toggleCartDrawer() {
    const drawer = document.querySelector('[data-cart-drawer]');
    if (!drawer) return;
    
    const isOpen = drawer.classList.contains('cart-drawer--open');
    if (isOpen) {
      this.closeCartDrawer();
    } else {
      this.openCartDrawer();
    }
  }
  
  openCartDrawer() {
    const drawer = document.querySelector('[data-cart-drawer]');
    const overlay = document.querySelector('[data-cart-overlay]');
    
    if (drawer) {
      drawer.classList.add('cart-drawer--open');
      document.body.style.overflow = 'hidden';
      
      if (overlay) {
        overlay.classList.add('cart-overlay--visible');
      }
      
      this.dispatchEvent('cart:drawer:opened');
    }
  }
  
  closeCartDrawer() {
    const drawer = document.querySelector('[data-cart-drawer]');
    const overlay = document.querySelector('[data-cart-overlay]');
    
    if (drawer) {
      drawer.classList.remove('cart-drawer--open');
      document.body.style.overflow = '';
      
      if (overlay) {
        overlay.classList.remove('cart-overlay--visible');
      }
      
      this.dispatchEvent('cart:drawer:closed');
    }
  }
  
  /**
   * Initialize cart-related components
   */
  initializeComponents() {
    this.updateCartCounters();
    this.updateCartTotals();
    this.updateShippingProgress();
  }
  
  /**
   * Update cart count displays
   */
  updateCartCounters() {
    const counters = document.querySelectorAll('[data-cart-count]');
    const count = this.cart ? this.cart.item_count : 0;
    
    counters.forEach(counter => {
      counter.textContent = count;
      counter.style.display = count > 0 ? 'block' : 'none';
    });
  }
  
  /**
   * Update cart total displays
   */
  updateCartTotals() {
    const totals = document.querySelectorAll('[data-cart-total]');
    const subtotals = document.querySelectorAll('[data-cart-subtotal]');
    
    if (this.cart) {
      const totalFormatted = this.formatMoney(this.cart.total_price);
      
      totals.forEach(total => {
        total.textContent = totalFormatted;
      });
      
      subtotals.forEach(subtotal => {
        subtotal.textContent = totalFormatted;
      });
    }
  }
  
  /**
   * Update shipping progress indicators
   */
  updateShippingProgress() {
    const progressBars = document.querySelectorAll('[data-shipping-progress]');
    const progressTexts = document.querySelectorAll('[data-shipping-text]');
    
    if (!this.cart) return;
    
    const metrics = this.getCartMetrics();
    const percentage = Math.min(100, (this.cart.total_price / this.config.freeShippingThreshold) * 100);
    
    progressBars.forEach(bar => {
      bar.style.width = percentage + '%';
    });
    
    progressTexts.forEach(text => {
      if (metrics.freeShippingEligible) {
        text.textContent = 'Free shipping applied!';
      } else {
        text.textContent = `Add ${this.formatMoney(metrics.freeShippingRemaining)} more for free shipping`;
      }
    });
  }
  
  /**
   * Show notification to user
   */
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `cart-notification cart-notification--${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: type === 'success' ? 'var(--rs-success)' : 
                  type === 'error' ? 'var(--rs-destructive)' : 'var(--rs-info)',
      color: 'white',
      padding: 'var(--rs-spacing-md)',
      borderRadius: 'var(--rs-radius-md)',
      zIndex: 'var(--rs-z-toast)',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });
    
    // Remove after delay
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
  
  /**
   * Set loading state
   */
  setLoading(loading) {
    this.isLoading = loading;
    
    // Update loading indicators
    const indicators = document.querySelectorAll('[data-cart-loading]');
    indicators.forEach(indicator => {
      indicator.style.display = loading ? 'block' : 'none';
    });
    
    // Disable cart forms during loading
    const forms = document.querySelectorAll('form[action*="/cart"]');
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, button, select');
      inputs.forEach(input => {
        input.disabled = loading;
      });
    });
    
    this.dispatchEvent('cart:loading:changed', { loading });
  }
  
  /**
   * Dispatch custom event
   */
  dispatchEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, { 
      detail: { ...detail, cartManager: this } 
    });
    document.dispatchEvent(event);
  }
  
  /**
   * Format money using Shopify's currency
   */
  formatMoney(cents) {
    const currency = this.cart ? this.cart.currency : 'USD';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(cents / 100);
  }
  
  /**
   * Utility delay function
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Add event listener with automatic cleanup
   */
  addEventListener(element, event, handler) {
    element.addEventListener(event, handler);
    
    const key = `${element}:${event}`;
    if (!this.eventListeners.has(key)) {
      this.eventListeners.set(key, []);
    }
    this.eventListeners.get(key).push(handler);
  }
  
  /**
   * Cleanup all event listeners
   */
  destroy() {
    for (const [key, handlers] of this.eventListeners) {
      const [element, event] = key.split(':');
      handlers.forEach(handler => {
        element.removeEventListener(event, handler);
      });
    }
    this.eventListeners.clear();
    CartManager.instance = null;
  }
}

// Initialize cart manager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.cartManager = new CartManager();
  });
} else {
  window.cartManager = new CartManager();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CartManager;
}

// Export for ES6 modules
export default CartManager;