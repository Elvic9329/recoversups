/**
 * Cart Module - RecoverSups Theme
 * Modular cart functionality with ES6 exports
 * @version 2.0.0
 */

export class CartModule {
  constructor(config = {}) {
    this.config = {
      drawerSelector: '.cart-drawer',
      toggleSelector: '[data-cart-toggle]',
      countSelector: '[data-cart-count]',
      itemsSelector: '[data-cart-items]',
      debounceTime: 300,
      ...config
    };
    
    this.isLoading = false;
    this.drawer = null;
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setupDrawer();
    this.updateCartCount();
  }
  
  bindEvents() {
    // Cart toggle events
    document.addEventListener('click', (e) => {
      if (e.target.matches(this.config.toggleSelector)) {
        e.preventDefault();
        this.toggleDrawer();
      }
    });
    
    // Add to cart forms
    document.addEventListener('submit', (e) => {
      if (e.target.matches('form[action*="/cart/add"]')) {
        e.preventDefault();
        this.addToCart(e.target);
      }
    });
    
    // Cart item quantity changes
    document.addEventListener('change', (e) => {
      if (e.target.matches('[data-cart-quantity]')) {
        this.updateQuantity(e.target);
      }
    });
    
    // Remove cart items
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-cart-remove]')) {
        e.preventDefault();
        this.removeItem(e.target);
      }
    });
  }
  
  setupDrawer() {
    this.drawer = document.querySelector(this.config.drawerSelector);
    if (!this.drawer) return;
    
    // Drawer overlay click
    this.drawer.addEventListener('click', (e) => {
      if (e.target === this.drawer) {
        this.closeDrawer();
      }
    });
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.drawer.classList.contains('is-open')) {
        this.closeDrawer();
      }
    });
  }
  
  async addToCart(form) {
    if (this.isLoading) return;
    
    this.isLoading = true;
    const submitButton = form.querySelector('[type="submit"]');
    const originalText = submitButton.textContent;
    
    try {
      submitButton.textContent = 'Adding...';
      submitButton.disabled = true;
      
      const formData = new FormData(form);
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const item = await response.json();
      
      // Update cart
      await this.refreshCart();
      this.openDrawer();
      
      // Success feedback
      this.showNotification('Product added to cart!', 'success');
      
    } catch (error) {
      console.error('Add to cart error:', error);
      this.showNotification('Failed to add product to cart', 'error');
    } finally {
      this.isLoading = false;
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  }
  
  async updateQuantity(input) {
    if (this.isLoading) return;
    
    this.isLoading = true;
    const key = input.dataset.cartKey;
    const quantity = parseInt(input.value);
    
    try {
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      await this.refreshCart();
      
    } catch (error) {
      console.error('Update quantity error:', error);
      this.showNotification('Failed to update quantity', 'error');
      input.value = input.dataset.originalValue || 1;
    } finally {
      this.isLoading = false;
    }
  }
  
  async removeItem(button) {
    if (this.isLoading) return;
    
    this.isLoading = true;
    const key = button.dataset.cartKey;
    
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: key,
          quantity: 0
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      await this.refreshCart();
      this.showNotification('Item removed from cart', 'success');
      
    } catch (error) {
      console.error('Remove item error:', error);
      this.showNotification('Failed to remove item', 'error');
    } finally {
      this.isLoading = false;
    }
  }
  
  async refreshCart() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      this.updateCartCount(cart.item_count);
      this.updateCartDrawer(cart);
      
      // Dispatch cart update event
      document.dispatchEvent(new CustomEvent('cart:updated', {
        detail: { cart }
      }));
      
    } catch (error) {
      console.error('Refresh cart error:', error);
    }
  }
  
  updateCartCount(count = null) {
    if (count === null) {
      // Fetch current count
      fetch('/cart.js')
        .then(response => response.json())
        .then(cart => {
          this.updateCartCountElements(cart.item_count);
        })
        .catch(error => console.error('Cart count error:', error));
    } else {
      this.updateCartCountElements(count);
    }
  }
  
  updateCartCountElements(count) {
    const countElements = document.querySelectorAll(this.config.countSelector);
    countElements.forEach(element => {
      element.textContent = count;
      element.style.display = count > 0 ? 'block' : 'none';
    });
  }
  
  updateCartDrawer(cart) {
    const itemsContainer = document.querySelector(this.config.itemsSelector);
    if (!itemsContainer) return;
    
    if (cart.items.length === 0) {
      itemsContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
      return;
    }
    
    // Update cart items (this would typically render from a template)
    // For now, we'll update existing items
    cart.items.forEach(item => {
      const itemElement = itemsContainer.querySelector(`[data-cart-key="${item.key}"]`);
      if (itemElement) {
        const quantityInput = itemElement.querySelector('[data-cart-quantity]');
        const priceElement = itemElement.querySelector('[data-item-price]');
        
        if (quantityInput) quantityInput.value = item.quantity;
        if (priceElement) priceElement.textContent = this.formatMoney(item.line_price);
      }
    });
    
    // Update total
    const totalElement = itemsContainer.querySelector('[data-cart-total]');
    if (totalElement) {
      totalElement.textContent = this.formatMoney(cart.total_price);
    }
  }
  
  openDrawer() {
    if (!this.drawer) return;
    
    this.drawer.classList.add('is-open');
    document.body.classList.add('cart-drawer-open');
    
    // Focus management for accessibility
    const firstFocusable = this.drawer.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      firstFocusable.focus();
    }
    
    // Dispatch event
    document.dispatchEvent(new CustomEvent('cart:drawer:opened'));
  }
  
  closeDrawer() {
    if (!this.drawer) return;
    
    this.drawer.classList.remove('is-open');
    document.body.classList.remove('cart-drawer-open');
    
    // Dispatch event
    document.dispatchEvent(new CustomEvent('cart:drawer:closed'));
  }
  
  toggleDrawer() {
    if (this.drawer && this.drawer.classList.contains('is-open')) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }
  
  formatMoney(cents) {
    return (cents / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }
  
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
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
    }, 3000);
  }
  
  // Public API
  getCartData() {
    return fetch('/cart.js').then(response => response.json());
  }
  
  clearCart() {
    return fetch('/cart/clear.js', { method: 'POST' })
      .then(() => this.refreshCart());
  }
}