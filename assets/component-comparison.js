/**
 * Product Comparison Component - RecoverSups Theme
 * Advanced product comparison functionality with dynamic selection and actions
 * @version 2.0.0
 */

export class ProductComparison {
  constructor() {
    this.config = {
      tableSelector: '[data-comparison-table]',
      productSelectorSelector: '[data-product-selector]',
      clearButtonSelector: '[data-comparison-clear]',
      printButtonSelector: '[data-comparison-print]',
      addAllButtonSelector: '[data-comparison-add-all]',
      variantSelectorSelector: '.comparison-variant-selector',
      addToCartFormSelector: '.comparison-form',
      maxProducts: 3,
      debounceTime: 300
    };
    
    this.comparisonData = {
      products: [],
      selectedVariants: {},
      isLoading: false
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setupTables();
    this.loadStoredComparison();
    this.initializeVariantSelectors();
  }
  
  bindEvents() {
    // Product selector events
    document.addEventListener('click', (e) => {
      if (e.target.matches(this.config.productSelectorSelector) || 
          e.target.closest(this.config.productSelectorSelector)) {
        this.handleProductSelector(e.target.closest(this.config.productSelectorSelector));
      }
    });
    
    // Clear comparison
    document.addEventListener('click', (e) => {
      if (e.target.matches(this.config.clearButtonSelector) ||
          e.target.closest(this.config.clearButtonSelector)) {
        e.preventDefault();
        this.clearComparison();
      }
    });
    
    // Print comparison
    document.addEventListener('click', (e) => {
      if (e.target.matches(this.config.printButtonSelector) ||
          e.target.closest(this.config.printButtonSelector)) {
        e.preventDefault();
        this.printComparison();
      }
    });
    
    // Add all to cart
    document.addEventListener('click', (e) => {
      if (e.target.matches(this.config.addAllButtonSelector) ||
          e.target.closest(this.config.addAllButtonSelector)) {
        e.preventDefault();
        this.addAllToCart();
      }
    });
    
    // Variant selector changes
    document.addEventListener('change', (e) => {
      if (e.target.matches(this.config.variantSelectorSelector)) {
        this.handleVariantChange(e.target);
      }
    });
    
    // Add to cart form submissions
    document.addEventListener('submit', (e) => {
      if (e.target.matches(this.config.addToCartFormSelector)) {
        e.preventDefault();
        this.handleAddToCart(e.target);
      }
    });
    
    // Keyboard navigation
    this.setupKeyboardNavigation();
  }
  
  setupTables() {
    const tables = document.querySelectorAll(this.config.tableSelector);
    
    tables.forEach(table => {
      this.setupStickyHeaders(table);
      this.setupResponsiveTable(table);
      this.initializeTableData(table);
    });
  }
  
  setupStickyHeaders(table) {
    const stickyEnabled = table.dataset.stickyHeaders === 'true';
    
    if (stickyEnabled) {
      // Add intersection observer for sticky header styling
      const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const header = entry.target.querySelector('.comparison-table__head');
          if (header) {
            header.classList.toggle('is-sticky', !entry.isIntersecting);
          }
        });
      }, {
        threshold: 0,
        rootMargin: '-1px 0px 0px 0px'
      });
      
      headerObserver.observe(table);
    }
  }
  
  setupResponsiveTable(table) {
    const wrapper = table.closest('.comparison-table-wrapper');
    if (!wrapper) return;
    
    // Add scroll indicators
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'table-scroll-indicator';
    scrollIndicator.innerHTML = `
      <div class="scroll-indicator scroll-indicator--left">
        <span>Scroll left</span>
      </div>
      <div class="scroll-indicator scroll-indicator--right">
        <span>Scroll right</span>
      </div>
    `;
    
    wrapper.appendChild(scrollIndicator);
    
    // Handle scroll indicators
    wrapper.addEventListener('scroll', () => {
      this.updateScrollIndicators(wrapper);
    });
    
    // Initial check
    this.updateScrollIndicators(wrapper);
  }
  
  updateScrollIndicators(wrapper) {
    const leftIndicator = wrapper.querySelector('.scroll-indicator--left');
    const rightIndicator = wrapper.querySelector('.scroll-indicator--right');
    
    if (!leftIndicator || !rightIndicator) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = wrapper;
    
    leftIndicator.style.opacity = scrollLeft > 0 ? '1' : '0';
    rightIndicator.style.opacity = scrollLeft < scrollWidth - clientWidth ? '1' : '0';
  }
  
  initializeTableData(table) {
    const maxProducts = parseInt(table.dataset.maxProducts) || this.config.maxProducts;
    const productCells = table.querySelectorAll('.comparison-cell--product');
    
    productCells.forEach((cell, index) => {
      const productData = this.extractProductData(cell);
      if (productData && index < maxProducts) {
        this.comparisonData.products[index] = productData;
      }
    });
  }
  
  extractProductData(cell) {
    const titleElement = cell.querySelector('.product-header__title');
    const imageElement = cell.querySelector('.product-header__image img');
    
    if (!titleElement) return null;
    
    return {
      title: titleElement.textContent.trim(),
      image: imageElement ? imageElement.src : null,
      handle: cell.dataset.productHandle || '',
      id: cell.dataset.productId || '',
      featured: cell.classList.contains('comparison-cell--featured')
    };
  }
  
  initializeVariantSelectors() {
    const selectors = document.querySelectorAll(this.config.variantSelectorSelector);
    
    selectors.forEach(selector => {
      const productHandle = selector.dataset.productVariants;
      if (productHandle) {
        // Store initial selection
        this.comparisonData.selectedVariants[productHandle] = selector.value;
        
        // Update price display when variant changes
        this.updatePriceForVariant(selector);
      }
    });
  }
  
  handleProductSelector(button) {
    const slot = button.dataset.productSelector;
    const slotElement = button.closest('.product-slot');
    
    if (!slot || !slotElement) return;
    
    // Open product picker modal (this would integrate with your product picker)
    this.openProductPicker(slot, slotElement);
  }
  
  openProductPicker(slot, slotElement) {
    // This is a placeholder for product picker integration
    // In a real implementation, this would open a modal with product search/selection
    
    console.log(`Opening product picker for slot ${slot}`);
    
    // Example: Show a simple prompt for demo purposes
    const productHandle = prompt('Enter product handle to add to comparison:');
    
    if (productHandle) {
      this.addProductToSlot(slot, productHandle, slotElement);
    }
  }
  
  async addProductToSlot(slot, productHandle, slotElement) {
    try {
      this.setLoadingState(true);
      
      // Fetch product data
      const response = await fetch(`/products/${productHandle}.js`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      
      const product = await response.json();
      
      // Update slot with product data
      this.updateProductSlot(slotElement, product);
      
      // Update comparison data
      this.comparisonData.products[parseInt(slot) - 1] = {
        title: product.title,
        image: product.featured_image,
        handle: product.handle,
        id: product.id,
        featured: false,
        product: product
      };
      
      // Save to localStorage
      this.saveComparisonData();
      
      this.showNotification(`${product.title} added to comparison`, 'success');
      
    } catch (error) {
      console.error('Error adding product to comparison:', error);
      this.showNotification('Failed to add product to comparison', 'error');
    } finally {
      this.setLoadingState(false);
    }
  }
  
  updateProductSlot(slotElement, product) {
    const button = slotElement.querySelector('.product-selector-btn');
    if (!button) return;
    
    // Replace button with product info
    button.innerHTML = `
      <img src="${product.featured_image}" alt="${product.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
      <span style="font-size: 0.75rem; text-align: center; line-height: 1.2;">${product.title}</span>
      <button type="button" style="margin-top: 4px; padding: 2px 8px; font-size: 0.7rem; background: #ef4444; color: white; border: none; border-radius: 2px;" onclick="this.closest('.product-slot').querySelector('.product-selector-btn').innerHTML = this.closest('.product-slot').querySelector('.product-selector-btn').dataset.originalContent || 'Select Product'">Remove</button>
    `;
    
    // Store original content for removal
    if (!button.dataset.originalContent) {
      button.dataset.originalContent = 'Select Product';
    }
  }
  
  handleVariantChange(selector) {
    const productHandle = selector.dataset.productVariants;
    const variantId = selector.value;
    
    if (productHandle) {
      this.comparisonData.selectedVariants[productHandle] = variantId;
      this.updatePriceForVariant(selector);
      this.saveComparisonData();
    }
  }
  
  updatePriceForVariant(selector) {
    const variantId = selector.value;
    const row = selector.closest('tr');
    
    if (!row || !variantId) return;
    
    // This would typically fetch variant-specific pricing
    // For now, we'll just update the form's hidden input
    const form = selector.closest('form');
    const hiddenInput = form?.querySelector('input[name="id"]');
    
    if (hiddenInput) {
      hiddenInput.value = variantId;
    }
  }
  
  async handleAddToCart(form) {
    if (this.comparisonData.isLoading) return;
    
    try {
      this.setLoadingState(true);
      const button = form.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      
      button.textContent = 'Adding...';
      button.disabled = true;
      
      const formData = new FormData(form);
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description || 'Failed to add to cart');
      }
      
      const item = await response.json();
      
      this.showNotification('Product added to cart!', 'success');
      this.updateCartCount();
      
      // Track event
      this.trackComparisonAddToCart(item);
      
    } catch (error) {
      console.error('Add to cart error:', error);
      this.showNotification(error.message || 'Failed to add to cart', 'error');
    } finally {
      this.setLoadingState(false);
      
      // Reset button
      const button = form.querySelector('button[type="submit"]');
      button.textContent = button.dataset.originalText || 'Add to Cart';
      button.disabled = false;
    }
  }
  
  async addAllToCart() {
    if (this.comparisonData.isLoading) return;
    
    try {
      this.setLoadingState(true);
      const forms = document.querySelectorAll(this.config.addToCartFormSelector);
      const addPromises = [];
      
      forms.forEach(form => {
        const formData = new FormData(form);
        addPromises.push(
          fetch('/cart/add.js', {
            method: 'POST',
            body: formData
          }).then(response => {
            if (!response.ok) {
              throw new Error(`Failed to add ${form.dataset.productTitle || 'product'}`);
            }
            return response.json();
          })
        );
      });
      
      const results = await Promise.allSettled(addPromises);
      const successful = results.filter(result => result.status === 'fulfilled');
      const failed = results.filter(result => result.status === 'rejected');
      
      if (successful.length > 0) {
        this.showNotification(`${successful.length} products added to cart!`, 'success');
        this.updateCartCount();
      }
      
      if (failed.length > 0) {
        this.showNotification(`${failed.length} products failed to add`, 'warning');
      }
      
    } catch (error) {
      console.error('Add all to cart error:', error);
      this.showNotification('Failed to add all products to cart', 'error');
    } finally {
      this.setLoadingState(false);
    }
  }
  
  clearComparison() {
    // Reset comparison data
    this.comparisonData.products = [];
    this.comparisonData.selectedVariants = {};
    
    // Clear localStorage
    localStorage.removeItem('productComparison');
    
    // Reset product selectors
    const selectors = document.querySelectorAll('.product-selector-btn');
    selectors.forEach(selector => {
      if (selector.dataset.originalContent) {
        selector.innerHTML = selector.dataset.originalContent;
      }
    });
    
    this.showNotification('Comparison cleared', 'info');
  }
  
  printComparison() {
    // Create print-specific styles
    const printStyles = `
      <style>
        @media print {
          body * { visibility: hidden; }
          .comparison-table-container,
          .comparison-table-container * { visibility: visible; }
          .comparison-table-container { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
          }
          .comparison-cta,
          .comparison-row--cta { display: none !important; }
        }
      </style>
    `;
    
    // Add styles to head temporarily
    const styleElement = document.createElement('style');
    styleElement.innerHTML = printStyles;
    document.head.appendChild(styleElement);
    
    // Print
    window.print();
    
    // Remove styles after printing
    setTimeout(() => {
      document.head.removeChild(styleElement);
    }, 1000);
  }
  
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Handle keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'p':
            e.preventDefault();
            this.printComparison();
            break;
          case 'Delete':
          case 'Backspace':
            e.preventDefault();
            this.clearComparison();
            break;
        }
      }
    });
  }
  
  loadStoredComparison() {
    try {
      const stored = localStorage.getItem('productComparison');
      if (stored) {
        const data = JSON.parse(stored);
        this.comparisonData = { ...this.comparisonData, ...data };
      }
    } catch (error) {
      console.error('Error loading stored comparison:', error);
    }
  }
  
  saveComparisonData() {
    try {
      localStorage.setItem('productComparison', JSON.stringify({
        products: this.comparisonData.products,
        selectedVariants: this.comparisonData.selectedVariants,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Error saving comparison data:', error);
    }
  }
  
  setLoadingState(isLoading) {
    this.comparisonData.isLoading = isLoading;
    
    // Update UI loading states
    const loadingElements = document.querySelectorAll('[data-comparison-loading]');
    loadingElements.forEach(element => {
      element.style.opacity = isLoading ? '0.6' : '1';
      element.style.pointerEvents = isLoading ? 'none' : 'auto';
    });
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
        
        // Dispatch cart updated event
        document.dispatchEvent(new CustomEvent('cart:updated', {
          detail: { cart }
        }));
      })
      .catch(error => {
        console.error('Error updating cart count:', error);
      });
  }
  
  trackComparisonAddToCart(item) {
    // Track analytics event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'add_to_cart', {
        event_category: 'Product Comparison',
        event_label: item.product_title,
        value: item.price / 100,
        currency: 'USD'
      });
    }
    
    // Custom event
    document.dispatchEvent(new CustomEvent('comparison:add_to_cart', {
      detail: { item, comparison: this.comparisonData }
    }));
  }
  
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type} notification--comparison`;
    notification.innerHTML = `
      <div class="notification__content">
        <span class="notification__message">${message}</span>
        <button class="notification__close" type="button" aria-label="Close notification">×</button>
      </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.classList.add('is-visible');
    });
    
    // Handle close button
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
      this.closeNotification(notification);
    });
    
    // Auto-remove after delay
    setTimeout(() => {
      this.closeNotification(notification);
    }, 5000);
  }
  
  closeNotification(notification) {
    notification.classList.remove('is-visible');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }
  
  // Public API
  getComparisonData() {
    return { ...this.comparisonData };
  }
  
  addProduct(productHandle) {
    const emptySlot = this.comparisonData.products.findIndex(p => !p);
    if (emptySlot !== -1) {
      const slotElement = document.querySelector(`[data-product-selector="${emptySlot + 1}"]`)?.closest('.product-slot');
      if (slotElement) {
        this.addProductToSlot(emptySlot + 1, productHandle, slotElement);
      }
    }
  }
  
  removeProduct(index) {
    if (this.comparisonData.products[index]) {
      this.comparisonData.products[index] = null;
      this.saveComparisonData();
      
      // Update UI
      const slotElement = document.querySelector(`[data-product-selector="${index + 1}"]`)?.closest('.product-slot');
      if (slotElement) {
        const button = slotElement.querySelector('.product-selector-btn');
        if (button && button.dataset.originalContent) {
          button.innerHTML = button.dataset.originalContent;
        }
      }
    }
  }
}

// Initialize comparison when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.productComparison = new ProductComparison();
  });
} else {
  window.productComparison = new ProductComparison();
}

// Export for use in other modules
export default ProductComparison;