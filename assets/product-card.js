/**
 * RecoverSups Product Card JavaScript
 * Handles product card interactions, quick view, wishlist, and add to cart functionality
 */

class ProductCard {
  constructor() {
    this.quickViewModal = null;
    this.currentProduct = null;
    this.wishlist = JSON.parse(localStorage.getItem('rs_wishlist') || '[]');
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeQuickView();
    this.updateWishlistStates();
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      // Quick view button
      if (e.target.closest('.product-card-action--quick-view')) {
        e.preventDefault();
        const button = e.target.closest('.product-card-action--quick-view');
        const productHandle = button.dataset.productHandle;
        this.openQuickView(productHandle);
      }

      // Wishlist button
      if (e.target.closest('.product-card-action--wishlist')) {
        e.preventDefault();
        const button = e.target.closest('.product-card-action--wishlist');
        const productId = button.dataset.productId;
        this.toggleWishlist(productId, button);
      }

      // Product card form submission
      if (e.target.closest('.product-card-form')) {
        const form = e.target.closest('.product-card-form');
        if (e.target.type === 'submit' || e.target.classList.contains('product-card-add-to-cart')) {
          e.preventDefault();
          this.handleAddToCart(form);
        }
      }

      // Variant selection
      if (e.target.classList.contains('product-card-variant-select')) {
        this.handleVariantChange(e.target);
      }

      // Quick view modal interactions
      if (e.target.closest('#productQuickViewClose') || e.target.closest('.product-quick-view-overlay')) {
        if (e.target.closest('.product-quick-view-overlay') && !e.target.closest('.product-quick-view-modal')) {
          this.closeQuickView();
        }
        if (e.target.closest('#productQuickViewClose')) {
          this.closeQuickView();
        }
      }
    });

    // Handle variant selection changes
    document.addEventListener('change', (e) => {
      if (e.target.classList.contains('product-card-variant-select')) {
        this.handleVariantChange(e.target);
      }
    });

    // ESC key to close quick view
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.quickViewModal && this.quickViewModal.classList.contains('active')) {
        this.closeQuickView();
      }
    });
  }

  initializeQuickView() {
    this.quickViewModal = document.getElementById('productQuickViewOverlay');
    if (!this.quickViewModal) {
      // Create quick view modal if it doesn't exist
      this.createQuickViewModal();
    }
  }

  createQuickViewModal() {
    const modalHTML = `
      <div class="product-quick-view-overlay" id="productQuickViewOverlay">
        <div class="product-quick-view-modal" id="productQuickViewModal">
          <button class="product-quick-view-close" id="productQuickViewClose" aria-label="Close quick view">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div class="product-quick-view-content" id="productQuickViewContent">
            <div class="product-quick-view-loading" id="productQuickViewLoading">
              <div class="product-quick-view-spinner"></div>
              <p>Loading product details...</p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.quickViewModal = document.getElementById('productQuickViewOverlay');
  }

  async openQuickView(productHandle) {
    if (!this.quickViewModal) {
      this.createQuickViewModal();
    }

    this.quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Show loading state
    const loadingEl = document.getElementById('productQuickViewLoading');
    const contentEl = document.getElementById('productQuickViewContent');
    
    if (loadingEl) loadingEl.style.display = 'block';

    try {
      // Fetch product data
      const response = await fetch(`/products/${productHandle}.js`);
      if (!response.ok) throw new Error('Product not found');
      
      const product = await response.json();
      this.currentProduct = product;
      
      // Populate modal with product data
      this.populateQuickView(product);
      
    } catch (error) {
      console.error('Error loading product:', error);
      this.showQuickViewError();
    }
  }

  populateQuickView(product) {
    const contentEl = document.getElementById('productQuickViewContent');
    const loadingEl = document.getElementById('productQuickViewLoading');
    
    if (loadingEl) loadingEl.style.display = 'none';

    const quickViewHTML = `
      <div class="product-quick-view-product" id="productQuickViewProduct">
        <div class="product-quick-view-images">
          <div class="product-quick-view-main-image" id="productQuickViewMainImage">
            <img src="${product.featured_image}" alt="${product.title}">
          </div>
          <div class="product-quick-view-thumbnails" id="productQuickViewThumbnails">
            ${product.images.slice(0, 4).map((image, index) => `
              <div class="product-quick-view-thumbnail ${index === 0 ? 'active' : ''}" data-image="${image}">
                <img src="${image}" alt="${product.title}">
              </div>
            `).join('')}
          </div>
        </div>
        <div class="product-quick-view-details">
          <div class="product-quick-view-header">
            <h2 class="product-quick-view-title">${product.title}</h2>
            ${product.vendor ? `<div class="product-quick-view-vendor">${product.vendor}</div>` : ''}
          </div>
          <div class="product-quick-view-price">
            <span class="product-quick-view-price-current">${this.formatMoney(product.price)}</span>
            ${product.compare_at_price > product.price ? 
              `<span class="product-quick-view-price-compare">${this.formatMoney(product.compare_at_price)}</span>` : 
              ''
            }
          </div>
          <div class="product-quick-view-description">
            ${product.description || ''}
          </div>
          ${this.renderQuickViewVariants(product)}
          <div class="product-quick-view-actions">
            <form class="product-quick-view-form" id="productQuickViewForm">
              <input type="hidden" name="id" value="${product.variants[0].id}">
              <div class="product-quick-view-quantity">
                <label for="productQuickViewQuantity">Quantity:</label>
                <input type="number" id="productQuickViewQuantity" name="quantity" value="1" min="1">
              </div>
              <div class="product-quick-view-buttons">
                <button type="submit" class="product-quick-view-add-to-cart" id="productQuickViewAddToCart">
                  <span class="product-quick-view-add-to-cart-text">Add to Cart</span>
                  <span class="product-quick-view-add-to-cart-loading">Adding...</span>
                </button>
                <button type="button" class="product-quick-view-full-details" onclick="window.location.href='${product.url}'">
                  View Full Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    contentEl.innerHTML = quickViewHTML;

    // Setup thumbnail clicks
    this.setupQuickViewThumbnails();
    
    // Setup quick view form
    this.setupQuickViewForm();
  }

  renderQuickViewVariants(product) {
    if (product.variants.length <= 1) return '';

    const options = product.options.map(option => `
      <div class="product-quick-view-variant-group">
        <label class="product-quick-view-variant-label">${option.name}:</label>
        <div class="product-quick-view-variant-options">
          ${option.values.map(value => `
            <div class="product-quick-view-variant-option" data-option="${option.name}" data-value="${value}">
              ${value}
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    return `<div class="product-quick-view-variants">${options}</div>`;
  }

  setupQuickViewThumbnails() {
    const thumbnails = document.querySelectorAll('.product-quick-view-thumbnail');
    const mainImage = document.getElementById('productQuickViewMainImage');

    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        thumb.classList.add('active');
        
        // Update main image
        const imageUrl = thumb.dataset.image;
        mainImage.innerHTML = `<img src="${imageUrl}" alt="${this.currentProduct.title}">`;
      });
    });
  }

  setupQuickViewForm() {
    const form = document.getElementById('productQuickViewForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleQuickViewAddToCart(form);
    });

    // Setup variant selection
    const variantOptions = document.querySelectorAll('.product-quick-view-variant-option');
    variantOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Remove active class from siblings
        const siblings = option.parentElement.querySelectorAll('.product-quick-view-variant-option');
        siblings.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked option
        option.classList.add('active');
        
        // Update variant ID in form
        this.updateQuickViewVariant();
      });
    });
  }

  updateQuickViewVariant() {
    const selectedOptions = {};
    const activeOptions = document.querySelectorAll('.product-quick-view-variant-option.active');
    
    activeOptions.forEach(option => {
      selectedOptions[option.dataset.option] = option.dataset.value;
    });

    // Find matching variant
    const matchingVariant = this.currentProduct.variants.find(variant => {
      return variant.options.every((option, index) => {
        const optionName = this.currentProduct.options[index].name;
        return selectedOptions[optionName] === option;
      });
    });

    if (matchingVariant) {
      // Update form with variant ID
      const hiddenInput = document.querySelector('#productQuickViewForm input[name="id"]');
      if (hiddenInput) {
        hiddenInput.value = matchingVariant.id;
      }

      // Update price
      const priceEl = document.querySelector('.product-quick-view-price-current');
      if (priceEl) {
        priceEl.textContent = this.formatMoney(matchingVariant.price);
      }

      const comparePriceEl = document.querySelector('.product-quick-view-price-compare');
      if (comparePriceEl) {
        if (matchingVariant.compare_at_price > matchingVariant.price) {
          comparePriceEl.textContent = this.formatMoney(matchingVariant.compare_at_price);
          comparePriceEl.style.display = 'inline';
        } else {
          comparePriceEl.style.display = 'none';
        }
      }
    }
  }

  showQuickViewError() {
    const contentEl = document.getElementById('productQuickViewContent');
    const loadingEl = document.getElementById('productQuickViewLoading');
    
    if (loadingEl) loadingEl.style.display = 'none';

    const errorHTML = `
      <div class="product-quick-view-error">
        <div class="product-quick-view-error-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
        <h3>Unable to load product</h3>
        <p>Please try again or visit the product page directly.</p>
        <button class="product-quick-view-retry" onclick="location.reload()">Retry</button>
      </div>
    `;

    contentEl.innerHTML = errorHTML;
  }

  closeQuickView() {
    if (this.quickViewModal) {
      this.quickViewModal.classList.remove('active');
      document.body.style.overflow = '';
      this.currentProduct = null;
    }
  }

  async handleAddToCart(form) {
    const button = form.querySelector('.product-card-add-to-cart');
    const textSpan = button.querySelector('.product-card-add-to-cart-text');
    const loadingSpan = button.querySelector('.product-card-add-to-cart-loading');
    const successSpan = button.querySelector('.product-card-add-to-cart-success');

    // Add loading state
    form.classList.add('loading');
    button.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Add to cart failed');

      const result = await response.json();

      // Show success state
      form.classList.remove('loading');
      form.classList.add('success');

      // Update cart count if function exists
      if (window.updateCartCount) {
        window.updateCartCount();
      }

      // Reset after 2 seconds
      setTimeout(() => {
        form.classList.remove('success');
        button.disabled = false;
      }, 2000);

    } catch (error) {
      console.error('Error adding to cart:', error);
      form.classList.remove('loading');
      
      // Show error state
      if (textSpan) textSpan.textContent = 'Error';
      
      // Reset after 2 seconds
      setTimeout(() => {
        if (textSpan) textSpan.textContent = 'Add to Cart';
        button.disabled = false;
      }, 2000);
    }
  }

  async handleQuickViewAddToCart(form) {
    const button = form.querySelector('.product-quick-view-add-to-cart');
    
    // Add loading state
    button.classList.add('loading');
    button.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Add to cart failed');

      const result = await response.json();

      // Show success feedback
      const textSpan = button.querySelector('.product-quick-view-add-to-cart-text');
      if (textSpan) textSpan.textContent = 'Added!';

      // Update cart count if function exists
      if (window.updateCartCount) {
        window.updateCartCount();
      }

      // Reset after 2 seconds
      setTimeout(() => {
        button.classList.remove('loading');
        button.disabled = false;
        if (textSpan) textSpan.textContent = 'Add to Cart';
      }, 2000);

    } catch (error) {
      console.error('Error adding to cart:', error);
      button.classList.remove('loading');
      
      const textSpan = button.querySelector('.product-quick-view-add-to-cart-text');
      if (textSpan) textSpan.textContent = 'Error';
      
      // Reset after 2 seconds
      setTimeout(() => {
        if (textSpan) textSpan.textContent = 'Add to Cart';
        button.disabled = false;
      }, 2000);
    }
  }

  handleVariantChange(select) {
    const selectedOption = select.options[select.selectedIndex];
    const price = selectedOption.dataset.price;
    const comparePrice = selectedOption.dataset.comparePrice;

    // Update price display
    const priceContainer = select.closest('.product-card').querySelector('.product-card-price');
    if (priceContainer && price) {
      const currentPriceEl = priceContainer.querySelector('.product-card-price-current');
      const comparePriceEl = priceContainer.querySelector('.product-card-price-compare');

      if (currentPriceEl) currentPriceEl.textContent = price;
      
      if (comparePriceEl) {
        if (comparePrice) {
          comparePriceEl.textContent = comparePrice;
          comparePriceEl.style.display = 'inline';
        } else {
          comparePriceEl.style.display = 'none';
        }
      }
    }
  }

  toggleWishlist(productId, button) {
    const isInWishlist = this.wishlist.includes(productId);

    if (isInWishlist) {
      this.wishlist = this.wishlist.filter(id => id !== productId);
      button.classList.remove('active');
    } else {
      this.wishlist.push(productId);
      button.classList.add('active');
    }

    // Save to localStorage
    localStorage.setItem('rs_wishlist', JSON.stringify(this.wishlist));

    // Update button state
    this.updateWishlistStates();
  }

  updateWishlistStates() {
    const wishlistButtons = document.querySelectorAll('.product-card-action--wishlist');
    wishlistButtons.forEach(button => {
      const productId = button.dataset.productId;
      if (this.wishlist.includes(productId)) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  formatMoney(cents) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(cents / 100);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ProductCard();
  });
} else {
  new ProductCard();
}