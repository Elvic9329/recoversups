/**
 * Cart Drawer Functionality
 * Advanced cart system with Shopify Cart API integration for Recoversups.pe
 */

class CartDrawer {
  constructor() {
    this.drawer = document.querySelector('.cart-drawer');
    this.overlay = document.querySelector('.cart-drawer-overlay');
    this.content = document.querySelector('.cart-drawer__content');
    this.itemsContainer = document.querySelector('.cart-drawer__items');
    this.emptyState = document.querySelector('.cart-drawer__empty');
    this.footer = document.querySelector('.cart-drawer__footer');
    this.countElement = document.querySelector('.cart-drawer__count');
    this.headerCount = document.querySelector('.header-cart-count');
    
    this.isOpen = false;
    this.isLoading = false;
    this.cart = { items: [], item_count: 0, total_price: 0 };
    
    this.init();
  }

  init() {
    this.attachEvents();
    this.loadCartData();
    this.updateCartCount();
  }

  attachEvents() {
    // Cart toggle events
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-cart-open]') || e.target.closest('[data-cart-open]')) {
        e.preventDefault();
        this.openDrawer();
      }
      
      if (e.target.matches('.cart-drawer__close') || e.target.closest('.cart-drawer__close')) {
        e.preventDefault();
        this.closeDrawer();
      }
      
      if (e.target.matches('.cart-drawer-overlay')) {
        this.closeDrawer();
      }
    });

    // Quantity update events
    document.addEventListener('click', (e) => {
      if (e.target.matches('.cart-item__qty-btn[data-action="increase"]')) {
        e.preventDefault();
        const key = e.target.getAttribute('data-key');
        const currentQty = parseInt(e.target.parentElement.querySelector('.cart-item__qty-input').value);
        this.updateQuantity(key, currentQty + 1);
      }
      
      if (e.target.matches('.cart-item__qty-btn[data-action="decrease"]')) {
        e.preventDefault();
        const key = e.target.getAttribute('data-key');
        const currentQty = parseInt(e.target.parentElement.querySelector('.cart-item__qty-input').value);
        this.updateQuantity(key, Math.max(0, currentQty - 1));
      }
      
      if (e.target.matches('.cart-item__remove')) {
        e.preventDefault();
        const key = e.target.getAttribute('data-key');
        this.removeItem(key);
      }
    });

    // Quantity input change
    document.addEventListener('change', (e) => {
      if (e.target.matches('.cart-item__qty-input')) {
        const key = e.target.getAttribute('data-key');
        const newQty = Math.max(0, parseInt(e.target.value) || 0);
        this.updateQuantity(key, newQty);
      }
    });

    // Add to cart forms
    document.addEventListener('submit', (e) => {
      if (e.target.matches('[data-cart-form]') || e.target.closest('[data-cart-form]')) {
        e.preventDefault();
        this.addToCart(e.target);
      }
    });

    // Keyboard events
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeDrawer();
      }
    });
  }

  async loadCartData() {
    try {
      const response = await fetch('/cart.js');
      this.cart = await response.json();
      this.updateCartUI();
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  async addToCart(form) {
    if (this.isLoading) return;

    const formData = new FormData(form);
    const productData = {
      id: formData.get('id'),
      quantity: parseInt(formData.get('quantity')) || 1,
      properties: {}
    };

    // Add any additional properties
    for (let [key, value] of formData.entries()) {
      if (key.startsWith('properties[')) {
        const propKey = key.replace('properties[', '').replace(']', '');
        productData.properties[propKey] = value;
      }
    }

    this.setLoading(true);
    this.showToast('Agregando al carrito...', 'loading');

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        const result = await response.json();
        await this.loadCartData();
        this.showToast('¡Producto agregado al carrito!', 'success');
        this.openDrawer();
        
        // Add animation to the added item
        setTimeout(() => {
          const addedItem = document.querySelector(`[data-key="${result.key}"]`);
          if (addedItem) {
            addedItem.classList.add('cart-item--adding');
            setTimeout(() => addedItem.classList.remove('cart-item--adding'), 300);
          }
        }, 100);
      } else {
        throw new Error('Error adding to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.showToast('Error al agregar al carrito', 'error');
    } finally {
      this.setLoading(false);
    }
  }

  async updateQuantity(key, quantity) {
    if (this.isLoading) return;

    this.setLoading(true);

    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: key,
          quantity: quantity
        })
      });

      if (response.ok) {
        this.cart = await response.json();
        this.updateCartUI();
        
        if (quantity === 0) {
          this.showToast('Producto eliminado del carrito', 'info');
        }
      } else {
        throw new Error('Error updating quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      this.showToast('Error al actualizar cantidad', 'error');
    } finally {
      this.setLoading(false);
    }
  }

  async removeItem(key) {
    const item = document.querySelector(`[data-key="${key}"]`);
    if (item) {
      item.classList.add('removing');
    }

    await this.updateQuantity(key, 0);
  }

  openDrawer() {
    this.isOpen = true;
    document.body.classList.add('cart-drawer-open');
    this.overlay.classList.add('open');
    this.drawer.classList.add('open');
    
    // Focus management
    const closeButton = this.drawer.querySelector('.cart-drawer__close');
    if (closeButton) {
      closeButton.focus();
    }
  }

  closeDrawer() {
    this.isOpen = false;
    document.body.classList.remove('cart-drawer-open');
    this.overlay.classList.remove('open');
    this.drawer.classList.remove('open');
  }

  updateCartUI() {
    this.updateCartCount();
    this.renderCartItems();
    this.updateCartSummary();
    this.updateShippingProgress();
    this.toggleEmptyState();
  }

  updateCartCount() {
    const count = this.cart.item_count || 0;
    
    if (this.countElement) {
      this.countElement.textContent = count;
      this.countElement.style.display = count > 0 ? 'flex' : 'none';
    }
    
    if (this.headerCount) {
      this.headerCount.textContent = count;
      this.headerCount.style.display = count > 0 ? 'flex' : 'none';
    }

    // Update cart icon badges throughout the site
    document.querySelectorAll('[data-cart-count]').forEach(element => {
      element.textContent = count;
      element.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  renderCartItems() {
    if (!this.itemsContainer) return;

    this.itemsContainer.innerHTML = '';

    this.cart.items.forEach(item => {
      const itemElement = this.createCartItemElement(item);
      this.itemsContainer.appendChild(itemElement);
    });
  }

  createCartItemElement(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.setAttribute('data-key', item.key);

    const originalPrice = item.original_price !== item.final_price 
      ? `<span class="original-price">${this.formatMoney(item.original_price)}</span>`
      : '';

    div.innerHTML = `
      <div class="cart-item__image">
        <img src="${item.featured_image?.url || '/assets/placeholder.png'}" 
             alt="${item.product_title}" 
             loading="lazy">
      </div>
      <div class="cart-item__details">
        <h4 class="cart-item__title">
          <a href="${item.url}">${item.product_title}</a>
        </h4>
        ${item.variant_title ? `<p class="cart-item__variant">${item.variant_title}</p>` : ''}
        <div class="cart-item__price-row">
          <div class="cart-item__price">
            ${originalPrice}
            <span class="${item.original_price !== item.final_price ? 'sale-price' : ''}">
              ${this.formatMoney(item.final_price)}
            </span>
          </div>
          <div class="cart-item__quantity">
            <button type="button" class="cart-item__qty-btn" data-action="decrease" data-key="${item.key}">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
            <input type="number" 
                   class="cart-item__qty-input" 
                   value="${item.quantity}" 
                   min="0" 
                   data-key="${item.key}">
            <button type="button" class="cart-item__qty-btn" data-action="increase" data-key="${item.key}">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <button type="button" class="cart-item__remove" data-key="${item.key}" title="Eliminar producto">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    `;

    return div;
  }

  updateCartSummary() {
    const summaryElement = document.querySelector('.cart-summary');
    if (!summaryElement) return;

    const subtotal = this.cart.total_price || 0;
    const shipping = 0; // Free shipping logic can be added here
    const discount = this.cart.total_discount || 0;
    const total = subtotal - discount + shipping;

    summaryElement.innerHTML = `
      <div class="cart-summary__row">
        <span class="cart-summary__label">Subtotal</span>
        <span class="cart-summary__value">${this.formatMoney(subtotal)}</span>
      </div>
      ${discount > 0 ? `
        <div class="cart-summary__row cart-summary__row--discount">
          <span class="cart-summary__label">Descuento</span>
          <span class="cart-summary__value cart-summary__value--discount">-${this.formatMoney(discount)}</span>
        </div>
      ` : ''}
      <div class="cart-summary__row">
        <span class="cart-summary__label">Envío</span>
        <span class="cart-summary__value">${shipping === 0 ? 'Gratis' : this.formatMoney(shipping)}</span>
      </div>
      <div class="cart-summary__row cart-summary__row--total">
        <span class="cart-summary__label">Total</span>
        <span class="cart-summary__value cart-summary__value--total">${this.formatMoney(total)}</span>
      </div>
    `;

    // Update checkout button price
    const checkoutPrice = document.querySelector('.checkout-price');
    if (checkoutPrice) {
      checkoutPrice.textContent = this.formatMoney(total);
    }
  }

  updateShippingProgress() {
    const progressBar = document.querySelector('.shipping-progress__fill');
    const progressText = document.querySelector('.shipping-progress__text');
    
    if (!progressBar || !progressText) return;

    const freeShippingThreshold = 15000; // S/150 in cents
    const currentTotal = this.cart.total_price || 0;
    const progress = Math.min((currentTotal / freeShippingThreshold) * 100, 100);
    const remaining = Math.max(freeShippingThreshold - currentTotal, 0);

    progressBar.style.width = `${progress}%`;

    if (remaining > 0) {
      progressText.innerHTML = `Te faltan <span class="shipping-remaining">${this.formatMoney(remaining)}</span> para envío gratis`;
    } else {
      progressText.innerHTML = '¡Felicidades! Tienes envío gratis';
    }
  }

  toggleEmptyState() {
    const hasItems = this.cart.items && this.cart.items.length > 0;
    
    if (this.emptyState) {
      this.emptyState.style.display = hasItems ? 'none' : 'flex';
    }
    
    if (this.footer) {
      this.footer.style.display = hasItems ? 'block' : 'none';
    }
  }

  setLoading(loading) {
    this.isLoading = loading;
    const loadingElement = document.querySelector('.cart-loading');
    
    if (loadingElement) {
      loadingElement.classList.toggle('show', loading);
    }
    
    // Disable all cart buttons during loading
    document.querySelectorAll('.cart-item__qty-btn, .cart-item__remove').forEach(btn => {
      btn.disabled = loading;
    });
  }

  showToast(message, type = 'success') {
    const existingToast = document.querySelector('.cart-toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'loading' ? '⟳' : 'ℹ';
    const iconColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';

    toast.innerHTML = `
      <div class="cart-toast__content">
        <div class="cart-toast__icon" style="background: ${iconColor};">
          ${icon}
        </div>
        <div class="cart-toast__text">
          <p class="cart-toast__title">${message}</p>
        </div>
      </div>
    `;

    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    if (type !== 'loading') {
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
      }, 3000);
    }

    return toast;
  }

  formatMoney(cents) {
    const amount = cents / 100;
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(amount);
  }
}

// Initialize cart when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.cartDrawer = new CartDrawer();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CartDrawer;
}