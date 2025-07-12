/**
 * Cart Component - RecoverSups Theme
 * Handles cart functionality, AJAX operations, and cart drawer
 * Uses modern JavaScript patterns and error handling
 */

class CartManager {
  constructor() {
    this.selectors = {
      cartToggle: '[data-cart-toggle]',
      cartDrawer: '[data-cart-drawer]',
      cartOverlay: '[data-cart-overlay]',
      cartClose: '[data-cart-close]',
      cartItems: '[data-cart-items]',
      cartCount: '[data-cart-count]',
      cartTotal: '[data-cart-total]',
      cartSubtotal: '[data-cart-subtotal]',
      addToCart: '[data-add-to-cart]',
      productForm: '[data-product-form]',
      cartQuantity: '[data-cart-quantity]',
      cartRemove: '[data-cart-remove]',
      cartNote: '[data-cart-note]',
      checkoutBtn: '[data-checkout-btn]'
    };
    
    this.state = {
      cart: null,
      isUpdating: false,
      drawerOpen: false
    };
    
    this.routes = {
      cartAdd: '/cart/add.js',
      cartUpdate: '/cart/update.js',
      cartChange: '/cart/change.js',
      cart: '/cart.js',
      cartClear: '/cart/clear.js'
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.fetchCart();
  }
  
  bindEvents() {
    // Event delegation for better performance
    document.addEventListener('click', this.handleClick.bind(this));
    document.addEventListener('change', this.handleChange.bind(this));
    document.addEventListener('submit', this.handleSubmit.bind(this));
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }
  
  handleClick(event) {
    const target = event.target;
    
    // Cart toggle
    if (target.matches(this.selectors.cartToggle) || target.closest(this.selectors.cartToggle)) {
      event.preventDefault();
      this.toggleDrawer();
      return;
    }
    
    // Cart close
    if (target.matches(this.selectors.cartClose) || target.closest(this.selectors.cartClose)) {
      event.preventDefault();
      this.closeDrawer();
      return;
    }
    
    // Remove item
    if (target.matches(this.selectors.cartRemove) || target.closest(this.selectors.cartRemove)) {
      event.preventDefault();
      const key = target.dataset.key || target.closest('[data-key]')?.dataset.key;
      if (key) this.removeItem(key);
      return;
    }
    
    // Close drawer when clicking overlay
    if (target.matches(this.selectors.cartOverlay)) {
      this.closeDrawer();
    }
  }
  
  handleChange(event) {
    const target = event.target;
    
    // Quantity change
    if (target.matches(this.selectors.cartQuantity)) {
      const key = target.dataset.key || target.closest('[data-key]')?.dataset.key;
      const quantity = parseInt(target.value, 10);
      
      if (key && quantity >= 0) {
        this.updateQuantity(key, quantity);
      }
    }
    
    // Cart note
    if (target.matches(this.selectors.cartNote)) {
      this.debounce(() => this.updateNote(target.value), 500)();
    }
  }
  
  handleSubmit(event) {
    const target = event.target;
    
    // Product form submission
    if (target.matches(this.selectors.productForm) || target.closest(this.selectors.productForm)) {
      event.preventDefault();
      this.addToCart(target);
    }
  }
  
  handleKeydown(event) {
    // Escape key closes cart drawer
    if (event.key === 'Escape' && this.state.drawerOpen) {
      this.closeDrawer();
    }
  }
  
  async addToCart(form) {
    if (this.state.isUpdating) return;
    
    const formData = new FormData(form);
    const button = form.querySelector(this.selectors.addToCart);
    const originalText = button?.textContent;
    
    try {
      this.setLoadingState(button, 'Adding...');
      this.state.isUpdating = true;
      
      const response = await fetch(this.routes.cartAdd, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const item = await response.json();
      
      // Success feedback
      this.setSuccessState(button, 'Added!');
      this.openDrawer();
      await this.fetchCart();
      
      // Dispatch custom event
      document.dispatchEvent(new CustomEvent('cart:item-added', {
        detail: { item }
      }));
      
    } catch (error) {
      console.error('Add to cart error:', error);
      this.setErrorState(button, 'Error');
      this.showNotification('Failed to add item to cart', 'error');
    } finally {
      this.state.isUpdating = false;
      setTimeout(() => this.resetButtonState(button, originalText), 2000);
    }
  }
  
  async updateQuantity(key, quantity) {
    if (this.state.isUpdating) return;
    
    try {
      this.state.isUpdating = true;
      this.showCartLoading();
      
      const response = await fetch(this.routes.cartChange, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      await this.fetchCart();
      
      // Dispatch custom event
      document.dispatchEvent(new CustomEvent('cart:quantity-updated', {
        detail: { key, quantity }
      }));
      
    } catch (error) {
      console.error('Update quantity error:', error);
      this.showNotification('Failed to update quantity', 'error');
    } finally {
      this.state.isUpdating = false;
      this.hideCartLoading();
    }
  }
  
  async removeItem(key) {
    if (this.state.isUpdating) return;
    
    try {
      this.state.isUpdating = true;
      this.showCartLoading();
      
      const response = await fetch(this.routes.cartChange, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: 0 })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      await this.fetchCart();
      
      // Dispatch custom event
      document.dispatchEvent(new CustomEvent('cart:item-removed', {
        detail: { key }
      }));
      
    } catch (error) {
      console.error('Remove item error:', error);
      this.showNotification('Failed to remove item', 'error');
    } finally {
      this.state.isUpdating = false;
      this.hideCartLoading();
    }
  }
  
  async updateNote(note) {
    try {
      const response = await fetch(this.routes.cartUpdate, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
    } catch (error) {
      console.error('Update note error:', error);
    }
  }
  
  async fetchCart() {
    try {
      const response = await fetch(this.routes.cart);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.state.cart = await response.json();
      this.updateCartUI();
      
    } catch (error) {
      console.error('Fetch cart error:', error);
    }
  }
  
  updateCartUI() {
    const cart = this.state.cart;
    if (!cart) return;
    
    // Update cart count
    document.querySelectorAll(this.selectors.cartCount).forEach(el => {
      el.textContent = cart.item_count;
      el.style.display = cart.item_count > 0 ? 'block' : 'none';
    });
    
    // Update cart total
    document.querySelectorAll(this.selectors.cartTotal).forEach(el => {
      el.textContent = this.formatPrice(cart.total_price);
    });
    
    // Update cart subtotal
    document.querySelectorAll(this.selectors.cartSubtotal).forEach(el => {
      el.textContent = this.formatPrice(cart.total_price);
    });
    
    // Update cart items
    this.updateCartItems();
  }
  
  updateCartItems() {
    const cartItemsContainer = document.querySelector(this.selectors.cartItems);
    if (!cartItemsContainer) return;
    
    const cart = this.state.cart;
    
    if (!cart || cart.item_count === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-drawer__empty">
          <p class="cart-drawer__empty-text">Your cart is empty</p>
          <a href="/collections/all" class="btn btn--primary">Continue Shopping</a>
        </div>
      `;
      return;
    }
    
    const itemsHTML = cart.items.map(item => `
      <div class="cart-item" data-key="${item.key}">
        <div class="cart-item__image">
          <img src="${item.featured_image?.url || '/assets/placeholder.svg'}" 
               alt="${item.product_title}" 
               loading="lazy">
        </div>
        <div class="cart-item__details">
          <h3 class="cart-item__title">${item.product_title}</h3>
          ${item.variant_title ? `<p class="cart-item__variant">${item.variant_title}</p>` : ''}
          <div class="cart-item__price">
            ${item.original_price !== item.final_price ? `
              <span class="cart-item__original-price">${this.formatPrice(item.original_price)}</span>
            ` : ''}
            <span class="cart-item__final-price">${this.formatPrice(item.final_price)}</span>
          </div>
        </div>
        <div class="cart-item__quantity">
          <label class="visually-hidden" for="quantity-${item.key}">Quantity</label>
          <input type="number" 
                 id="quantity-${item.key}"
                 class="cart-item__quantity-input" 
                 value="${item.quantity}" 
                 min="0" 
                 data-cart-quantity 
                 data-key="${item.key}">
        </div>
        <div class="cart-item__total">
          ${this.formatPrice(item.final_line_price)}
        </div>
        <button type="button" 
                class="cart-item__remove" 
                data-cart-remove 
                data-key="${item.key}"
                aria-label="Remove ${item.product_title}">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    `).join('');
    
    cartItemsContainer.innerHTML = itemsHTML;
  }
  
  toggleDrawer() {
    if (this.state.drawerOpen) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }
  
  openDrawer() {
    const drawer = document.querySelector(this.selectors.cartDrawer);
    const overlay = document.querySelector(this.selectors.cartOverlay);
    
    if (drawer) {
      drawer.classList.add('cart-drawer--open');
      overlay?.classList.add('cart-overlay--visible');
      document.body.style.overflow = 'hidden';
      this.state.drawerOpen = true;
      
      // Focus first interactive element
      const firstButton = drawer.querySelector('button, input, a');
      firstButton?.focus();
    }
  }
  
  closeDrawer() {
    const drawer = document.querySelector(this.selectors.cartDrawer);
    const overlay = document.querySelector(this.selectors.cartOverlay);
    
    if (drawer) {
      drawer.classList.remove('cart-drawer--open');
      overlay?.classList.remove('cart-overlay--visible');
      document.body.style.overflow = '';
      this.state.drawerOpen = false;
    }
  }
  
  // UI Helper Methods
  setLoadingState(button, text) {
    if (button) {
      button.disabled = true;
      button.textContent = text;
      button.classList.add('btn--loading');
    }
  }
  
  setSuccessState(button, text) {
    if (button) {
      button.textContent = text;
      button.classList.remove('btn--loading');
      button.classList.add('btn--success');
    }
  }
  
  setErrorState(button, text) {
    if (button) {
      button.textContent = text;
      button.classList.remove('btn--loading');
      button.classList.add('btn--error');
    }
  }
  
  resetButtonState(button, originalText) {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
      button.classList.remove('btn--loading', 'btn--success', 'btn--error');
    }
  }
  
  showCartLoading() {
    const cartItems = document.querySelector(this.selectors.cartItems);
    if (cartItems) {
      cartItems.classList.add('cart-items--loading');
    }
  }
  
  hideCartLoading() {
    const cartItems = document.querySelector(this.selectors.cartItems);
    if (cartItems) {
      cartItems.classList.remove('cart-items--loading');
    }
  }
  
  showNotification(message, type = 'info') {
    // Simple notification system - could be enhanced
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
  
  // Utility Methods
  formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price / 100);
  }
  
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize cart when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new CartManager());
} else {
  new CartManager();
}

// Export for global access
window.CartManager = CartManager;