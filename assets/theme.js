/**
 * FreshFit Theme - Main JavaScript
 * Modern JavaScript implementation for Shopify theme
 * @version 1.0.0
 */

class FreshFitTheme {
  constructor() {
    this.config = {
      selectors: {
        // Navigation
        mobileMenuToggle: '[data-mobile-menu-toggle]',
        mobileMenu: '[data-mobile-menu]',
        mobileMenuOverlay: '[data-mobile-menu-overlay]',
        
        // Search
        searchToggle: '[data-search-toggle]',
        searchForm: '[data-search-form]',
        searchInput: '[data-search-input]',
        searchResults: '[data-search-results]',
        searchOverlay: '[data-search-overlay]',
        
        // Cart
        cartToggle: '[data-cart-toggle]',
        cartDrawer: '[data-cart-drawer]',
        cartOverlay: '[data-cart-overlay]',
        cartItems: '[data-cart-items]',
        cartClose: '[data-cart-close]',
        cartCount: '[data-cart-count]',
        cartTotal: '[data-cart-total]',
        cartForm: '[data-cart-form]',
        addToCart: '[data-add-to-cart]',
        cartRemove: '[data-cart-remove]',
        cartQuantity: '[data-cart-quantity]',
        
        // Product
        productForm: '[data-product-form]',
        productImages: '[data-product-images]',
        productImageMain: '[data-product-image-main]',
        productImageThumbs: '[data-product-image-thumbs]',
        productZoom: '[data-product-zoom]',
        quickViewTrigger: '[data-quick-view]',
        quickViewModal: '[data-quick-view-modal]',
        quickViewClose: '[data-quick-view-close]',
        
        // Sliders
        heroSlider: '[data-hero-slider]',
        productSlider: '[data-product-slider]',
        testimonialSlider: '[data-testimonial-slider]',
        
        // Forms
        newsletterForm: '[data-newsletter-form]',
        contactForm: '[data-contact-form]',
        
        // UI Elements
        backToTop: '[data-back-to-top]',
        cookieBanner: '[data-cookie-banner]',
        cookieAccept: '[data-cookie-accept]',
        cookieDecline: '[data-cookie-decline]',
        darkModeToggle: '[data-dark-mode-toggle]',
        shareButtons: '[data-share-button]',
        
        // Animations
        animateElements: '[data-animate]',
        lazyImages: '[data-lazy]',
        
        // Accessibility
        skipLink: '[data-skip-link]',
        focusableElements: 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
      },
      
      classes: {
        active: 'active',
        open: 'open',
        loading: 'loading',
        error: 'error',
        success: 'success',
        hidden: 'hidden',
        visible: 'visible',
        animated: 'animated',
        darkMode: 'dark-mode',
        noScroll: 'no-scroll'
      },
      
      breakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1200
      },
      
      animations: {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      
      debounceDelay: 300,
      throttleDelay: 100
    };

    this.state = {
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      isLoading: false,
      cart: {
        items: [],
        total: 0,
        count: 0
      },
      search: {
        query: '',
        results: [],
        isActive: false
      },
      darkMode: false,
      cookieConsent: false,
      userPreferences: {}
    };

    this.init();
  }

  /**
   * Initialize theme
   */
  init() {
    this.loadUserPreferences();
    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.setupTouchGestures();
    this.setupAccessibility();
    this.updateViewport();
    this.initializeComponents();
    this.setupPerformanceMonitoring();
    
    // Mark as loaded
    document.documentElement.classList.add('theme-loaded');
    this.dispatchEvent('theme:loaded');
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Window events
    window.addEventListener('resize', this.debounce(this.updateViewport.bind(this), this.config.debounceDelay));
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), this.config.throttleDelay));
    window.addEventListener('beforeunload', this.saveUserPreferences.bind(this));
    
    // Mobile menu
    this.setupMobileMenu();
    
    // Search
    this.setupSearch();
    
    // Cart
    this.setupCart();
    
    // Product functionality
    this.setupProductFunctionality();
    
    // Forms
    this.setupForms();
    
    // UI components
    this.setupUIComponents();
    
    // Keyboard navigation
    document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
  }

  /**
   * Mobile menu functionality
   */
  setupMobileMenu() {
    const toggle = document.querySelector(this.config.selectors.mobileMenuToggle);
    const menu = document.querySelector(this.config.selectors.mobileMenu);
    const overlay = document.querySelector(this.config.selectors.mobileMenuOverlay);

    if (!toggle || !menu) return;

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleMobileMenu();
    });

    if (overlay) {
      overlay.addEventListener('click', () => this.closeMobileMenu());
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains(this.config.classes.open)) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    const menu = document.querySelector(this.config.selectors.mobileMenu);
    const overlay = document.querySelector(this.config.selectors.mobileMenuOverlay);
    const toggle = document.querySelector(this.config.selectors.mobileMenuToggle);

    if (menu.classList.contains(this.config.classes.open)) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    const menu = document.querySelector(this.config.selectors.mobileMenu);
    const overlay = document.querySelector(this.config.selectors.mobileMenuOverlay);
    const toggle = document.querySelector(this.config.selectors.mobileMenuToggle);

    menu.classList.add(this.config.classes.open);
    if (overlay) overlay.classList.add(this.config.classes.visible);
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    
    document.body.classList.add(this.config.classes.noScroll);
    
    // Focus first focusable element
    const firstFocusable = menu.querySelector(this.config.selectors.focusableElements);
    if (firstFocusable) firstFocusable.focus();
    
    this.dispatchEvent('mobile-menu:opened');
  }

  closeMobileMenu() {
    const menu = document.querySelector(this.config.selectors.mobileMenu);
    const overlay = document.querySelector(this.config.selectors.mobileMenuOverlay);
    const toggle = document.querySelector(this.config.selectors.mobileMenuToggle);

    menu.classList.remove(this.config.classes.open);
    if (overlay) overlay.classList.remove(this.config.classes.visible);
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    
    document.body.classList.remove(this.config.classes.noScroll);
    
    this.dispatchEvent('mobile-menu:closed');
  }

  /**
   * Search functionality
   */
  setupSearch() {
    const searchToggle = document.querySelector(this.config.selectors.searchToggle);
    const searchForm = document.querySelector(this.config.selectors.searchForm);
    const searchInput = document.querySelector(this.config.selectors.searchInput);
    const searchResults = document.querySelector(this.config.selectors.searchResults);
    const searchOverlay = document.querySelector(this.config.selectors.searchOverlay);

    if (searchToggle) {
      searchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleSearch();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', this.debounce(this.handleSearchInput.bind(this), this.config.debounceDelay));
      searchInput.addEventListener('keydown', this.handleSearchKeydown.bind(this));
    }

    if (searchOverlay) {
      searchOverlay.addEventListener('click', () => this.closeSearch());
    }

    // Close search on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.state.search.isActive) {
        this.closeSearch();
      }
    });
  }

  toggleSearch() {
    if (this.state.search.isActive) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }

  openSearch() {
    const searchForm = document.querySelector(this.config.selectors.searchForm);
    const searchInput = document.querySelector(this.config.selectors.searchInput);
    const searchOverlay = document.querySelector(this.config.selectors.searchOverlay);

    if (searchForm) searchForm.classList.add(this.config.classes.active);
    if (searchOverlay) searchOverlay.classList.add(this.config.classes.visible);
    if (searchInput) searchInput.focus();

    this.state.search.isActive = true;
    this.dispatchEvent('search:opened');
  }

  closeSearch() {
    const searchForm = document.querySelector(this.config.selectors.searchForm);
    const searchResults = document.querySelector(this.config.selectors.searchResults);
    const searchOverlay = document.querySelector(this.config.selectors.searchOverlay);

    if (searchForm) searchForm.classList.remove(this.config.classes.active);
    if (searchResults) searchResults.classList.remove(this.config.classes.visible);
    if (searchOverlay) searchOverlay.classList.remove(this.config.classes.visible);

    this.state.search.isActive = false;
    this.dispatchEvent('search:closed');
  }

  async handleSearchInput(e) {
    const query = e.target.value.trim();
    
    if (query.length < 2) {
      this.clearSearchResults();
      return;
    }

    this.state.search.query = query;
    
    try {
      const results = await this.performSearch(query);
      this.displaySearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      this.displaySearchError();
    }
  }

  async performSearch(query) {
    const response = await fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=10`);
    
    if (!response.ok) {
      throw new Error('Search request failed');
    }
    
    const data = await response.json();
    return data.resources.results.products || [];
  }

  displaySearchResults(results) {
    const searchResults = document.querySelector(this.config.selectors.searchResults);
    if (!searchResults) return;

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
    } else {
      searchResults.innerHTML = results.map(product => `
        <div class="search-result-item">
          <a href="${product.url}" class="search-result-link">
            <div class="search-result-image">
              ${product.image ? `<img src="${product.image}" alt="${product.title}" loading="lazy">` : ''}
            </div>
            <div class="search-result-content">
              <h4 class="search-result-title">${product.title}</h4>
              <div class="search-result-price">${this.formatPrice(product.price)}</div>
            </div>
          </a>
        </div>
      `).join('');
    }

    searchResults.classList.add(this.config.classes.visible);
  }

  clearSearchResults() {
    const searchResults = document.querySelector(this.config.selectors.searchResults);
    if (searchResults) {
      searchResults.classList.remove(this.config.classes.visible);
      searchResults.innerHTML = '';
    }
  }

  displaySearchError() {
    const searchResults = document.querySelector(this.config.selectors.searchResults);
    if (searchResults) {
      searchResults.innerHTML = '<div class="search-error">Search temporarily unavailable</div>';
      searchResults.classList.add(this.config.classes.visible);
    }
  }

  handleSearchKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const searchForm = document.querySelector(this.config.selectors.searchForm);
      if (searchForm) {
        searchForm.submit();
      }
    }
  }

  /**
   * Cart functionality
   */
  setupCart() {
    const cartToggle = document.querySelector(this.config.selectors.cartToggle);
    const cartDrawer = document.querySelector(this.config.selectors.cartDrawer);
    const cartOverlay = document.querySelector(this.config.selectors.cartOverlay);
    const cartClose = document.querySelector(this.config.selectors.cartClose);

    if (cartToggle) {
      cartToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleCart();
      });
    }

    if (cartClose) {
      cartClose.addEventListener('click', () => this.closeCart());
    }

    if (cartOverlay) {
      cartOverlay.addEventListener('click', () => this.closeCart());
    }

    // Cart form handling
    document.addEventListener('submit', (e) => {
      if (e.target.matches(this.config.selectors.cartForm)) {
        e.preventDefault();
        this.updateCart(e.target);
      }
    });

    // Add to cart buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches(this.config.selectors.addToCart)) {
        e.preventDefault();
        this.addToCart(e.target);
      }
    });

    // Cart quantity changes
    document.addEventListener('change', (e) => {
      if (e.target.matches(this.config.selectors.cartQuantity)) {
        this.updateCartQuantity(e.target);
      }
    });

    // Remove from cart
    document.addEventListener('click', (e) => {
      if (e.target.matches(this.config.selectors.cartRemove)) {
        e.preventDefault();
        this.removeFromCart(e.target);
      }
    });

    // Load cart on page load
    this.loadCart();
  }

  toggleCart() {
    const cartDrawer = document.querySelector(this.config.selectors.cartDrawer);
    
    if (cartDrawer && cartDrawer.classList.contains(this.config.classes.open)) {
      this.closeCart();
    } else {
      this.openCart();
    }
  }

  openCart() {
    const cartDrawer = document.querySelector(this.config.selectors.cartDrawer);
    const cartOverlay = document.querySelector(this.config.selectors.cartOverlay);

    if (cartDrawer) cartDrawer.classList.add(this.config.classes.open);
    if (cartOverlay) cartOverlay.classList.add(this.config.classes.visible);
    
    document.body.classList.add(this.config.classes.noScroll);
    
    this.dispatchEvent('cart:opened');
  }

  closeCart() {
    const cartDrawer = document.querySelector(this.config.selectors.cartDrawer);
    const cartOverlay = document.querySelector(this.config.selectors.cartOverlay);

    if (cartDrawer) cartDrawer.classList.remove(this.config.classes.open);
    if (cartOverlay) cartOverlay.classList.remove(this.config.classes.visible);
    
    document.body.classList.remove(this.config.classes.noScroll);
    
    this.dispatchEvent('cart:closed');
  }

  async addToCart(button) {
    const form = button.closest('form');
    if (!form) return;

    button.classList.add(this.config.classes.loading);
    button.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const item = await response.json();
      
      // Update cart state
      await this.loadCart();
      
      // Show success feedback
      this.showNotification('Item added to cart', 'success');
      
      // Open cart drawer
      this.openCart();
      
      this.dispatchEvent('cart:item-added', { item });
      
    } catch (error) {
      console.error('Add to cart error:', error);
      this.showNotification('Failed to add item to cart', 'error');
    } finally {
      button.classList.remove(this.config.classes.loading);
      button.disabled = false;
    }
  }

  async updateCartQuantity(input) {
    const key = input.dataset.key;
    const quantity = parseInt(input.value);

    if (!key || isNaN(quantity)) return;

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
        throw new Error('Failed to update cart');
      }

      await this.loadCart();
      this.dispatchEvent('cart:updated');
      
    } catch (error) {
      console.error('Update cart error:', error);
      this.showNotification('Failed to update cart', 'error');
    }
  }

  async removeFromCart(button) {
    const key = button.dataset.key;
    if (!key) return;

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
        throw new Error('Failed to remove item');
      }

      await this.loadCart();
      this.dispatchEvent('cart:item-removed');
      
    } catch (error) {
      console.error('Remove from cart error:', error);
      this.showNotification('Failed to remove item', 'error');
    }
  }

  async loadCart() {
    try {
      const response = await fetch('/cart.js');
      if (!response.ok) {
        throw new Error('Failed to load cart');
      }

      const cart = await response.json();
      this.state.cart = cart;
      
      this.updateCartUI();
      this.dispatchEvent('cart:loaded', { cart });
      
    } catch (error) {
      console.error('Load cart error:', error);
    }
  }

  updateCartUI() {
    const cartCount = document.querySelectorAll(this.config.selectors.cartCount);
    const cartTotal = document.querySelectorAll(this.config.selectors.cartTotal);
    const cartItems = document.querySelector(this.config.selectors.cartItems);

    // Update cart count
    cartCount.forEach(element => {
      element.textContent = this.state.cart.item_count || 0;
    });

    // Update cart total
    cartTotal.forEach(element => {
      element.textContent = this.formatPrice(this.state.cart.total_price);
    });

    // Update cart items
    if (cartItems) {
      if (this.state.cart.items.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
      } else {
        cartItems.innerHTML = this.state.cart.items.map(item => `
          <div class="cart-item">
            <div class="cart-item-image">
              ${item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : ''}
            </div>
            <div class="cart-item-details">
              <h4 class="cart-item-title">${item.title}</h4>
              <div class="cart-item-price">${this.formatPrice(item.price)}</div>
              <div class="cart-item-quantity">
                <input type="number" value="${item.quantity}" min="1" data-key="${item.key}" ${this.config.selectors.cartQuantity.replace('[', '').replace(']', '')}>
              </div>
            </div>
            <button class="cart-item-remove" data-key="${item.key}" ${this.config.selectors.cartRemove.replace('[', '').replace(']', '')}>
              Remove
            </button>
          </div>
        `).join('');
      }
    }
  }

  /**
   * Product functionality
   */
  setupProductFunctionality() {
    this.setupProductImages();
    this.setupQuickView();
    this.setupProductForms();
  }

  setupProductImages() {
    const productImages = document.querySelector(this.config.selectors.productImages);
    if (!productImages) return;

    const mainImage = productImages.querySelector(this.config.selectors.productImageMain);
    const thumbnails = productImages.querySelectorAll(this.config.selectors.productImageThumbs);

    // Thumbnail click handlers
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchProductImage(thumb, mainImage);
      });
    });

    // Zoom functionality
    if (mainImage) {
      this.setupImageZoom(mainImage);
    }
  }

  switchProductImage(thumbnail, mainImage) {
    const newSrc = thumbnail.href || thumbnail.dataset.src;
    if (newSrc && mainImage) {
      mainImage.src = newSrc;
      
      // Update active thumbnail
      document.querySelectorAll(this.config.selectors.productImageThumbs).forEach(thumb => {
        thumb.classList.remove(this.config.classes.active);
      });
      thumbnail.classList.add(this.config.classes.active);
    }
  }

  setupImageZoom(image) {
    let isZoomed = false;
    
    image.addEventListener('click', (e) => {
      if (this.state.isMobile) return;
      
      e.preventDefault();
      
      if (isZoomed) {
        this.closeImageZoom(image);
        isZoomed = false;
      } else {
        this.openImageZoom(image, e);
        isZoomed = true;
      }
    });

    image.addEventListener('mouseleave', () => {
      if (isZoomed) {
        this.closeImageZoom(image);
        isZoomed = false;
      }
    });
  }

  openImageZoom(image, e) {
    const rect = image.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    image.style.transformOrigin = `${x}% ${y}%`;
    image.style.transform = 'scale(2)';
    image.style.cursor = 'zoom-out';
  }

  closeImageZoom(image) {
    image.style.transform = 'scale(1)';
    image.style.cursor = 'zoom-in';
  }

  setupQuickView() {
    document.addEventListener('click', (e) => {
      if (e.target.matches(this.config.selectors.quickViewTrigger)) {
        e.preventDefault();
        this.openQuickView(e.target);
      }
    });

    const quickViewClose = document.querySelector(this.config.selectors.quickViewClose);
    if (quickViewClose) {
      quickViewClose.addEventListener('click', () => this.closeQuickView());
    }

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeQuickView();
      }
    });
  }

  async openQuickView(trigger) {
    const productHandle = trigger.dataset.product;
    if (!productHandle) return;

    try {
      const response = await fetch(`/products/${productHandle}.js`);
      if (!response.ok) {
        throw new Error('Failed to load product');
      }

      const product = await response.json();
      this.displayQuickView(product);
      
    } catch (error) {
      console.error('Quick view error:', error);
      this.showNotification('Failed to load product', 'error');
    }
  }

  displayQuickView(product) {
    const modal = document.querySelector(this.config.selectors.quickViewModal);
    if (!modal) return;

    // Create quick view content
    const quickViewContent = `
      <div class="quick-view-content">
        <div class="quick-view-image">
          <img src="${product.featured_image}" alt="${product.title}" loading="lazy">
        </div>
        <div class="quick-view-details">
          <h2 class="quick-view-title">${product.title}</h2>
          <div class="quick-view-price">${this.formatPrice(product.price)}</div>
          <div class="quick-view-description">${product.description}</div>
          <form class="quick-view-form" data-product-form>
            <input type="hidden" name="id" value="${product.variants[0].id}">
            <button type="submit" class="btn btn-primary" data-add-to-cart>
              Add to Cart
            </button>
          </form>
        </div>
      </div>
    `;

    modal.innerHTML = quickViewContent;
    modal.classList.add(this.config.classes.active);
    document.body.classList.add(this.config.classes.noScroll);
  }

  closeQuickView() {
    const modal = document.querySelector(this.config.selectors.quickViewModal);
    if (modal) {
      modal.classList.remove(this.config.classes.active);
      document.body.classList.remove(this.config.classes.noScroll);
    }
  }

  setupProductForms() {
    document.addEventListener('submit', (e) => {
      if (e.target.matches(this.config.selectors.productForm)) {
        e.preventDefault();
        this.handleProductForm(e.target);
      }
    });
  }

  async handleProductForm(form) {
    const submitButton = form.querySelector('[type="submit"]');
    if (!submitButton) return;

    submitButton.classList.add(this.config.classes.loading);
    submitButton.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      await this.loadCart();
      this.showNotification('Product added to cart', 'success');
      this.openCart();
      
    } catch (error) {
      console.error('Product form error:', error);
      this.showNotification('Failed to add product to cart', 'error');
    } finally {
      submitButton.classList.remove(this.config.classes.loading);
      submitButton.disabled = false;
    }
  }

  /**
   * Slider/Carousel functionality
   */
  initializeSliders() {
    this.initHeroSlider();
    this.initProductSliders();
    this.initTestimonialSlider();
  }

  initHeroSlider() {
    const heroSlider = document.querySelector(this.config.selectors.heroSlider);
    if (!heroSlider) return;

    const slides = heroSlider.querySelectorAll('.hero-slide');
    const prevBtn = heroSlider.querySelector('.slider-prev');
    const nextBtn = heroSlider.querySelector('.slider-next');
    const dots = heroSlider.querySelectorAll('.slider-dot');

    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle(this.config.classes.active, i === index);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle(this.config.classes.active, i === index);
      });

      currentSlide = index;
    };

    const nextSlide = () => {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    };

    const prevSlide = () => {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
    };

    const startAutoplay = () => {
      slideInterval = setInterval(nextSlide, 5000);
    };

    const stopAutoplay = () => {
      clearInterval(slideInterval);
    };

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });

    // Pause autoplay on hover
    heroSlider.addEventListener('mouseenter', stopAutoplay);
    heroSlider.addEventListener('mouseleave', startAutoplay);

    // Touch support
    this.setupSliderTouchSupport(heroSlider, prevSlide, nextSlide);

    // Start autoplay
    startAutoplay();
  }

  setupSliderTouchSupport(slider, prevCallback, nextCallback) {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    slider.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;

      const deltaX = startX - endX;
      const deltaY = startY - endY;

      // Only handle horizontal swipes
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          nextCallback();
        } else {
          prevCallback();
        }
      }
    });
  }

  /**
   * Form handling
   */
  setupForms() {
    // Newsletter form
    const newsletterForm = document.querySelector(this.config.selectors.newsletterForm);
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
    }

    // Contact form
    const contactForm = document.querySelector(this.config.selectors.contactForm);
    if (contactForm) {
      contactForm.addEventListener('submit', this.handleContactSubmit.bind(this));
    }

    // Form validation
    this.setupFormValidation();
  }

  setupFormValidation() {
    document.addEventListener('blur', (e) => {
      if (e.target.matches('input[required], textarea[required]')) {
        this.validateField(e.target);
      }
    }, true);

    document.addEventListener('input', (e) => {
      if (e.target.matches('input[type="email"]')) {
        this.validateEmail(e.target);
      }
    });
  }

  validateField(field) {
    const isValid = field.checkValidity();
    field.classList.toggle('invalid', !isValid);
    field.classList.toggle('valid', isValid);

    // Show/hide error message
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('field-error')) {
      errorElement.textContent = isValid ? '' : field.validationMessage;
    }

    return isValid;
  }

  validateEmail(field) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(field.value);
    
    field.classList.toggle('invalid', !isValid && field.value.length > 0);
    field.classList.toggle('valid', isValid);

    return isValid;
  }

  async handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('[type="submit"]');

    if (!this.validateEmail(emailInput)) {
      this.showNotification('Please enter a valid email address', 'error');
      return;
    }

    submitButton.classList.add(this.config.classes.loading);
    submitButton.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch('/contact', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        this.showNotification('Thank you for subscribing!', 'success');
        form.reset();
      } else {
        throw new Error('Subscription failed');
      }

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      this.showNotification('Subscription failed. Please try again.', 'error');
    } finally {
      submitButton.classList.remove(this.config.classes.loading);
      submitButton.disabled = false;
    }
  }

  /**
   * UI Components
   */
  setupUIComponents() {
    this.setupBackToTop();
    this.setupCookieBanner();
    this.setupDarkMode();
    this.setupSocialSharing();
    this.setupNewsletterPopup();
  }

  setupBackToTop() {
    const backToTop = document.querySelector(this.config.selectors.backToTop);
    if (!backToTop) return;

    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      this.scrollToTop();
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  setupCookieBanner() {
    const cookieBanner = document.querySelector(this.config.selectors.cookieBanner);
    const cookieAccept = document.querySelector(this.config.selectors.cookieAccept);
    const cookieDecline = document.querySelector(this.config.selectors.cookieDecline);

    if (!cookieBanner) return;

    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent) {
      cookieBanner.style.display = 'none';
      this.state.cookieConsent = cookieConsent === 'accepted';
    } else {
      cookieBanner.style.display = 'block';
    }

    if (cookieAccept) {
      cookieAccept.addEventListener('click', () => {
        this.acceptCookies();
      });
    }

    if (cookieDecline) {
      cookieDecline.addEventListener('click', () => {
        this.declineCookies();
      });
    }
  }

  acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    this.state.cookieConsent = true;
    this.hideCookieBanner();
    this.initializeAnalytics();
  }

  declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    this.state.cookieConsent = false;
    this.hideCookieBanner();
  }

  hideCookieBanner() {
    const cookieBanner = document.querySelector(this.config.selectors.cookieBanner);
    if (cookieBanner) {
      cookieBanner.style.display = 'none';
    }
  }

  setupDarkMode() {
    const darkModeToggle = document.querySelector(this.config.selectors.darkModeToggle);
    if (!darkModeToggle) return;

    // Load saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      this.state.darkMode = savedMode === 'true';
      this.updateDarkMode();
    }

    darkModeToggle.addEventListener('click', () => {
      this.toggleDarkMode();
    });
  }

  toggleDarkMode() {
    this.state.darkMode = !this.state.darkMode;
    this.updateDarkMode();
    localStorage.setItem('darkMode', this.state.darkMode.toString());
  }

  updateDarkMode() {
    document.documentElement.classList.toggle(this.config.classes.darkMode, this.state.darkMode);
    
    const darkModeToggle = document.querySelector(this.config.selectors.darkModeToggle);
    if (darkModeToggle) {
      darkModeToggle.setAttribute('aria-pressed', this.state.darkMode.toString());
    }
  }

  setupSocialSharing() {
    document.addEventListener('click', (e) => {
      if (e.target.matches(this.config.selectors.shareButtons)) {
        e.preventDefault();
        this.handleSocialShare(e.target);
      }
    });
  }

  handleSocialShare(button) {
    const platform = button.dataset.platform;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'pinterest':
        const image = button.dataset.image ? encodeURIComponent(button.dataset.image) : '';
        shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${title}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }

  setupNewsletterPopup() {
    // Show newsletter popup after 30 seconds if not shown before
    const hasShownPopup = localStorage.getItem('newsletterPopupShown');
    if (!hasShownPopup) {
      setTimeout(() => {
        this.showNewsletterPopup();
      }, 30000);
    }
  }

  showNewsletterPopup() {
    const popup = document.querySelector('[data-newsletter-popup]');
    if (popup) {
      popup.classList.add(this.config.classes.visible);
      localStorage.setItem('newsletterPopupShown', 'true');
    }
  }

  /**
   * Scroll animations and intersection observer
   */
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    this.animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(this.config.classes.animated);
          this.animationObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe animate elements
    document.querySelectorAll(this.config.selectors.animateElements).forEach(element => {
      this.animationObserver.observe(element);
    });

    // Lazy loading images
    this.setupLazyLoading();
  }

  setupLazyLoading() {
    if (!('IntersectionObserver' in window)) return;

    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          lazyImageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll(this.config.selectors.lazyImages).forEach(img => {
      lazyImageObserver.observe(img);
    });
  }

  /**
   * Touch gestures support
   */
  setupTouchGestures() {
    let startX = 0;
    let startY = 0;

    document.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;

      const deltaX = startX - endX;
      const deltaY = startY - endY;

      // Swipe detection
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 100) {
        if (deltaX > 0) {
          this.dispatchEvent('swipe:left');
        } else {
          this.dispatchEvent('swipe:right');
        }
      }

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 100) {
        if (deltaY > 0) {
          this.dispatchEvent('swipe:up');
        } else {
          this.dispatchEvent('swipe:down');
        }
      }
    });
  }

  /**
   * Accessibility features
   */
  setupAccessibility() {
    // Skip to main content
    const skipLink = document.querySelector(this.config.selectors.skipLink);
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Focus management
    this.setupFocusManagement();
    
    // Keyboard navigation
    this.setupKeyboardNavigation();
  }

  setupFocusManagement() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('using-keyboard');
    });
  }

  setupKeyboardNavigation() {
    // Custom keyboard handling is done in handleKeyboardNavigation
  }

  handleKeyboardNavigation(e) {
    // Close modals/drawers on Escape
    if (e.key === 'Escape') {
      this.closeAllModals();
    }

    // Handle arrow keys for carousels
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const focusedElement = document.activeElement;
      if (focusedElement && focusedElement.closest('[data-carousel]')) {
        e.preventDefault();
        // Handle carousel navigation
      }
    }
  }

  closeAllModals() {
    this.closeMobileMenu();
    this.closeSearch();
    this.closeCart();
    this.closeQuickView();
  }

  /**
   * Performance monitoring
   */
  setupPerformanceMonitoring() {
    if (!window.performance) return;

    // Log page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`Page load time: ${loadTime}ms`);
        
        // Track with analytics if available
        if (this.state.cookieConsent && window.gtag) {
          window.gtag('event', 'page_load_time', {
            event_category: 'Performance',
            event_label: 'Load Time',
            value: loadTime
          });
        }
      }, 0);
    });
  }

  initializeAnalytics() {
    if (!this.state.cookieConsent) return;

    // Initialize Google Analytics or other tracking
    // This would be configured based on your tracking setup
  }

  /**
   * Local storage management
   */
  loadUserPreferences() {
    try {
      const preferences = localStorage.getItem('userPreferences');
      if (preferences) {
        this.state.userPreferences = JSON.parse(preferences);
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
    }
  }

  saveUserPreferences() {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(this.state.userPreferences));
    } catch (error) {
      console.error('Error saving user preferences:', error);
    }
  }

  /**
   * Component initialization
   */
  initializeComponents() {
    this.initializeSliders();
    this.initializeLazyLoading();
    this.updateViewport();
  }

  initializeLazyLoading() {
    // Already handled in setupIntersectionObserver
  }

  /**
   * Viewport and responsive handling
   */
  updateViewport() {
    const width = window.innerWidth;
    
    this.state.isMobile = width < this.config.breakpoints.mobile;
    this.state.isTablet = width >= this.config.breakpoints.mobile && width < this.config.breakpoints.desktop;
    this.state.isDesktop = width >= this.config.breakpoints.desktop;

    document.documentElement.classList.toggle('is-mobile', this.state.isMobile);
    document.documentElement.classList.toggle('is-tablet', this.state.isTablet);
    document.documentElement.classList.toggle('is-desktop', this.state.isDesktop);
  }

  /**
   * Scroll handling
   */
  handleScroll() {
    const scrollTop = window.pageYOffset;
    const backToTop = document.querySelector(this.config.selectors.backToTop);

    // Show/hide back to top button
    if (backToTop) {
      backToTop.classList.toggle(this.config.classes.visible, scrollTop > 500);
    }

    // Add scroll class to body
    document.body.classList.toggle('scrolled', scrollTop > 100);
  }

  /**
   * Notification system
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    // Add to DOM
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.classList.add(this.config.classes.visible);
    }, 100);

    // Hide notification
    setTimeout(() => {
      notification.classList.remove(this.config.classes.visible);
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  /**
   * Utility functions
   */
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

  dispatchEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
  }
}

// Initialize theme when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.freshFitTheme = new FreshFitTheme();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FreshFitTheme;
}

// PowerUp Gym - Main JavaScript
// Comprehensive interactive functionality for the PowerUp Gym website
// Compatible with Shopify Liquid templating system

(function() {
    'use strict';

    // Global configuration
    const CONFIG = {
        breakpoints: {
            mobile: 768,
            tablet: 1024,
            desktop: 1200
        },
        animations: {
            duration: 300,
            easing: 'ease-in-out'
        },
        cart: {
            endpoint: '/cart.js',
            addEndpoint: '/cart/add.js',
            updateEndpoint: '/cart/update.js',
            clearEndpoint: '/cart/clear.js'
        },
        search: {
            endpoint: '/search/suggest.json',
            minChars: 2,
            debounceTime: 300
        }
    };

    // Utility functions
    const Utils = {
        // Debounce function for performance optimization
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle function for scroll events
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
        },

        // Format currency
        formatCurrency: function(cents, format) {
            const money = cents / 100;
            return format.replace('{{amount}}', money.toFixed(2));
        },

        // Get viewport width
        getViewportWidth: function() {
            return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        },

        // Check if element is in viewport
        isInViewport: function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        // Animate element
        animate: function(element, properties, duration = CONFIG.animations.duration) {
            return new Promise((resolve) => {
                const startTime = performance.now();
                const startProperties = {};
                
                // Get initial values
                Object.keys(properties).forEach(prop => {
                    startProperties[prop] = parseFloat(getComputedStyle(element)[prop]) || 0;
                });

                function animate(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Apply easing
                    const easedProgress = 1 - Math.pow(1 - progress, 3);
                    
                    Object.keys(properties).forEach(prop => {
                        const start = startProperties[prop];
                        const end = properties[prop];
                        const current = start + (end - start) * easedProgress;
                        element.style[prop] = current + (prop === 'opacity' ? '' : 'px');
                    });

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        resolve();
                    }
                }

                requestAnimationFrame(animate);
            });
        },

        // Show loading state
        showLoading: function(element, text = 'Loading...') {
            element.classList.add('loading');
            element.setAttribute('aria-busy', 'true');
            element.setAttribute('aria-label', text);
        },

        // Hide loading state
        hideLoading: function(element) {
            element.classList.remove('loading');
            element.removeAttribute('aria-busy');
            element.removeAttribute('aria-label');
        },

        // Show error message
        showError: function(message, container = document.body) {
            const errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            errorEl.textContent = message;
            errorEl.setAttribute('role', 'alert');
            errorEl.setAttribute('aria-live', 'polite');
            
            container.appendChild(errorEl);
            
            // Remove after 5 seconds
            setTimeout(() => {
                if (errorEl.parentNode) {
                    errorEl.parentNode.removeChild(errorEl);
                }
            }, 5000);
        }
    };

    // DOM Ready functionality
    const DOMReady = {
        callbacks: [],
        
        ready: function(callback) {
            if (document.readyState === 'loading') {
                this.callbacks.push(callback);
            } else {
                callback();
            }
        },

        init: function() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.callbacks.forEach(callback => callback());
                });
            }
        }
    };

    // Mobile Menu functionality
    const MobileMenu = {
        menuToggle: null,
        menu: null,
        menuOverlay: null,
        isOpen: false,

        init: function() {
            this.menuToggle = document.querySelector('.mobile-menu-toggle');
            this.menu = document.querySelector('.mobile-menu');
            this.menuOverlay = document.querySelector('.mobile-menu-overlay');

            if (!this.menuToggle || !this.menu) return;

            this.bindEvents();
            this.setupAccessibility();
        },

        bindEvents: function() {
            // Toggle button
            this.menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle();
            });

            // Overlay click
            if (this.menuOverlay) {
                this.menuOverlay.addEventListener('click', () => {
                    this.close();
                });
            }

            // Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });

            // Close on resize
            window.addEventListener('resize', Utils.throttle(() => {
                if (Utils.getViewportWidth() > CONFIG.breakpoints.mobile && this.isOpen) {
                    this.close();
                }
            }, 250));
        },

        setupAccessibility: function() {
            this.menuToggle.setAttribute('aria-expanded', 'false');
            this.menuToggle.setAttribute('aria-controls', 'mobile-menu');
            this.menu.setAttribute('id', 'mobile-menu');
            this.menu.setAttribute('aria-labelledby', 'mobile-menu-toggle');
        },

        toggle: function() {
            this.isOpen ? this.close() : this.open();
        },

        open: function() {
            this.isOpen = true;
            document.body.classList.add('mobile-menu-open');
            this.menu.classList.add('is-open');
            this.menuToggle.classList.add('is-active');
            this.menuToggle.setAttribute('aria-expanded', 'true');
            
            // Focus management
            const firstFocusable = this.menu.querySelector('a, button, input');
            if (firstFocusable) {
                firstFocusable.focus();
            }

            // Trap focus
            this.trapFocus();
        },

        close: function() {
            this.isOpen = false;
            document.body.classList.remove('mobile-menu-open');
            this.menu.classList.remove('is-open');
            this.menuToggle.classList.remove('is-active');
            this.menuToggle.setAttribute('aria-expanded', 'false');
            
            // Return focus to toggle button
            this.menuToggle.focus();
        },

        trapFocus: function() {
            const focusableElements = this.menu.querySelectorAll('a, button, input, textarea, select');
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            this.menu.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            lastFocusable.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            firstFocusable.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        }
    };

    // Search functionality
    const Search = {
        searchForm: null,
        searchInput: null,
        searchResults: null,
        searchOverlay: null,
        currentQuery: '',
        isSearching: false,

        init: function() {
            this.searchForm = document.querySelector('.search-form');
            this.searchInput = document.querySelector('.search-input');
            this.searchResults = document.querySelector('.search-results');
            this.searchOverlay = document.querySelector('.search-overlay');

            if (!this.searchForm || !this.searchInput) return;

            this.bindEvents();
            this.setupAccessibility();
        },

        bindEvents: function() {
            // Search input
            this.searchInput.addEventListener('input', Utils.debounce((e) => {
                this.handleSearch(e.target.value);
            }, CONFIG.search.debounceTime));

            // Search form submission
            this.searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.performSearch(this.searchInput.value);
            });

            // Close search on overlay click
            if (this.searchOverlay) {
                this.searchOverlay.addEventListener('click', () => {
                    this.closeSearch();
                });
            }

            // Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.searchResults && this.searchResults.style.display !== 'none') {
                    this.closeSearch();
                }
            });
        },

        setupAccessibility: function() {
            this.searchInput.setAttribute('aria-label', 'Search products');
            this.searchInput.setAttribute('aria-autocomplete', 'list');
            this.searchInput.setAttribute('aria-expanded', 'false');
            
            if (this.searchResults) {
                this.searchResults.setAttribute('role', 'listbox');
                this.searchResults.setAttribute('aria-label', 'Search suggestions');
            }
        },

        handleSearch: function(query) {
            if (query.length < CONFIG.search.minChars) {
                this.hideResults();
                return;
            }

            if (query === this.currentQuery) return;

            this.currentQuery = query;
            this.searchSuggestions(query);
        },

        searchSuggestions: function(query) {
            if (this.isSearching) return;

            this.isSearching = true;
            Utils.showLoading(this.searchInput, 'Searching...');

            fetch(`${CONFIG.search.endpoint}?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=5`)
                .then(response => response.json())
                .then(data => {
                    this.displaySuggestions(data.resources.results.products);
                })
                .catch(error => {
                    console.error('Search error:', error);
                    Utils.showError('Search failed. Please try again.');
                })
                .finally(() => {
                    this.isSearching = false;
                    Utils.hideLoading(this.searchInput);
                });
        },

        displaySuggestions: function(products) {
            if (!this.searchResults) return;

            this.searchResults.innerHTML = '';

            if (products.length === 0) {
                this.searchResults.innerHTML = '<div class="no-results">No products found</div>';
            } else {
                products.forEach((product, index) => {
                    const suggestion = document.createElement('div');
                    suggestion.className = 'search-suggestion';
                    suggestion.setAttribute('role', 'option');
                    suggestion.setAttribute('aria-selected', 'false');
                    suggestion.innerHTML = `
                        <a href="${product.url}" class="search-suggestion-link">
                            <img src="${product.featured_image}" alt="${product.title}" class="search-suggestion-image">
                            <div class="search-suggestion-content">
                                <h4 class="search-suggestion-title">${product.title}</h4>
                                <p class="search-suggestion-price">${Utils.formatCurrency(product.price, window.theme.moneyFormat)}</p>
                            </div>
                        </a>
                    `;
                    this.searchResults.appendChild(suggestion);
                });
            }

            this.showResults();
        },

        showResults: function() {
            if (!this.searchResults) return;

            this.searchResults.style.display = 'block';
            this.searchInput.setAttribute('aria-expanded', 'true');
            
            if (this.searchOverlay) {
                this.searchOverlay.style.display = 'block';
            }
        },

        hideResults: function() {
            if (!this.searchResults) return;

            this.searchResults.style.display = 'none';
            this.searchInput.setAttribute('aria-expanded', 'false');
            
            if (this.searchOverlay) {
                this.searchOverlay.style.display = 'none';
            }
        },

        closeSearch: function() {
            this.hideResults();
            this.searchInput.blur();
        },

        performSearch: function(query) {
            if (query.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }
        }
    };

    // Product filtering and sorting
    const ProductFilters = {
        filterForm: null,
        sortSelect: null,
        filterCheckboxes: null,
        productGrid: null,
        resultsCount: null,
        currentFilters: {},

        init: function() {
            this.filterForm = document.querySelector('.product-filters');
            this.sortSelect = document.querySelector('.sort-select');
            this.filterCheckboxes = document.querySelectorAll('.filter-checkbox');
            this.productGrid = document.querySelector('.product-grid');
            this.resultsCount = document.querySelector('.results-count');

            if (!this.filterForm && !this.sortSelect) return;

            this.bindEvents();
            this.parseCurrentFilters();
        },

        bindEvents: function() {
            // Sort select
            if (this.sortSelect) {
                this.sortSelect.addEventListener('change', (e) => {
                    this.updateSort(e.target.value);
                });
            }

            // Filter checkboxes
            this.filterCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    this.updateFilter(e.target.name, e.target.value, e.target.checked);
                });
            });

            // Filter form submission
            if (this.filterForm) {
                this.filterForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.applyFilters();
                });
            }

            // Clear filters
            const clearButton = document.querySelector('.clear-filters');
            if (clearButton) {
                clearButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.clearFilters();
                });
            }
        },

        parseCurrentFilters: function() {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.forEach((value, key) => {
                if (key.startsWith('filter.')) {
                    this.currentFilters[key] = value.split(',');
                }
            });
        },

        updateSort: function(sortValue) {
            const url = new URL(window.location.href);
            url.searchParams.set('sort_by', sortValue);
            this.loadProducts(url.toString());
        },

        updateFilter: function(filterName, filterValue, isChecked) {
            const filterKey = `filter.${filterName}`;
            
            if (!this.currentFilters[filterKey]) {
                this.currentFilters[filterKey] = [];
            }

            if (isChecked) {
                if (!this.currentFilters[filterKey].includes(filterValue)) {
                    this.currentFilters[filterKey].push(filterValue);
                }
            } else {
                this.currentFilters[filterKey] = this.currentFilters[filterKey].filter(v => v !== filterValue);
                if (this.currentFilters[filterKey].length === 0) {
                    delete this.currentFilters[filterKey];
                }
            }

            this.applyFilters();
        },

        applyFilters: function() {
            const url = new URL(window.location.href);
            
            // Clear existing filter params
            for (const key of url.searchParams.keys()) {
                if (key.startsWith('filter.')) {
                    url.searchParams.delete(key);
                }
            }

            // Add current filters
            Object.keys(this.currentFilters).forEach(filterKey => {
                if (this.currentFilters[filterKey].length > 0) {
                    url.searchParams.set(filterKey, this.currentFilters[filterKey].join(','));
                }
            });

            this.loadProducts(url.toString());
        },

        clearFilters: function() {
            this.currentFilters = {};
            this.filterCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            const url = new URL(window.location.href);
            for (const key of url.searchParams.keys()) {
                if (key.startsWith('filter.')) {
                    url.searchParams.delete(key);
                }
            }
            
            this.loadProducts(url.toString());
        },

        loadProducts: function(url) {
            if (!this.productGrid) return;

            Utils.showLoading(this.productGrid, 'Loading products...');

            fetch(url)
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    
                    // Update product grid
                    const newProductGrid = doc.querySelector('.product-grid');
                    if (newProductGrid) {
                        this.productGrid.innerHTML = newProductGrid.innerHTML;
                    }

                    // Update results count
                    const newResultsCount = doc.querySelector('.results-count');
                    if (newResultsCount && this.resultsCount) {
                        this.resultsCount.textContent = newResultsCount.textContent;
                    }

                    // Update URL without page reload
                    window.history.pushState({}, '', url);

                    // Reinitialize cart buttons
                    Cart.initAddToCartButtons();
                })
                .catch(error => {
                    console.error('Filter error:', error);
                    Utils.showError('Failed to load products. Please try again.');
                })
                .finally(() => {
                    Utils.hideLoading(this.productGrid);
                });
        }
    };

    // Cart functionality
    const Cart = {
        cartDrawer: null,
        cartOverlay: null,
        cartToggle: null,
        cartCount: null,
        cartTotal: null,
        cartItems: null,
        isOpen: false,

        init: function() {
            this.cartDrawer = document.querySelector('.cart-drawer');
            this.cartOverlay = document.querySelector('.cart-overlay');
            this.cartToggle = document.querySelector('.cart-toggle');
            this.cartCount = document.querySelectorAll('.cart-count');
            this.cartTotal = document.querySelector('.cart-total');
            this.cartItems = document.querySelector('.cart-items');

            this.bindEvents();
            this.initAddToCartButtons();
            this.loadCartData();
        },

        bindEvents: function() {
            // Cart toggle
            if (this.cartToggle) {
                this.cartToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggle();
                });
            }

            // Cart overlay
            if (this.cartOverlay) {
                this.cartOverlay.addEventListener('click', () => {
                    this.close();
                });
            }

            // Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });
        },

        initAddToCartButtons: function() {
            const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.addToCart(button);
                });
            });
        },

        addToCart: function(button) {
            const form = button.closest('form');
            if (!form) return;

            const formData = new FormData(form);
            const variantId = formData.get('id');
            const quantity = formData.get('quantity') || 1;

            if (!variantId) {
                Utils.showError('Please select a product variant.');
                return;
            }

            Utils.showLoading(button, 'Adding to cart...');

            fetch(CONFIG.cart.addEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: variantId,
                    quantity: parseInt(quantity)
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 422) {
                    throw new Error(data.message || 'Unable to add item to cart');
                }
                
                this.updateCartCount();
                this.loadCartData();
                this.showAddedToCartNotification(data);
                
                // Open cart drawer after adding item
                this.open();
            })
            .catch(error => {
                console.error('Add to cart error:', error);
                Utils.showError(error.message || 'Failed to add item to cart');
            })
            .finally(() => {
                Utils.hideLoading(button);
            });
        },

        updateCartCount: function() {
            fetch(CONFIG.cart.endpoint)
                .then(response => response.json())
                .then(data => {
                    this.cartCount.forEach(element => {
                        element.textContent = data.item_count;
                    });
                })
                .catch(error => {
                    console.error('Cart count error:', error);
                });
        },

        loadCartData: function() {
            if (!this.cartItems) return;

            fetch(CONFIG.cart.endpoint)
                .then(response => response.json())
                .then(data => {
                    this.renderCartItems(data);
                    this.updateCartTotal(data.total_price);
                })
                .catch(error => {
                    console.error('Cart data error:', error);
                });
        },

        renderCartItems: function(cartData) {
            if (!this.cartItems) return;

            if (cartData.items.length === 0) {
                this.cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
                return;
            }

            this.cartItems.innerHTML = cartData.items.map(item => `
                <div class="cart-item" data-line="${item.index}">
                    <div class="cart-item-image">
                        <img src="${item.featured_image.url}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.product_title}</h4>
                        <p class="cart-item-variant">${item.variant_title}</p>
                        <div class="cart-item-price">
                            ${Utils.formatCurrency(item.final_price, window.theme.moneyFormat)}
                        </div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn quantity-decrease" data-line="${item.index}" aria-label="Decrease quantity">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-line="${item.index}">
                        <button class="quantity-btn quantity-increase" data-line="${item.index}" aria-label="Increase quantity">+</button>
                    </div>
                    <button class="cart-item-remove" data-line="${item.index}" aria-label="Remove item">×</button>
                </div>
            `).join('');

            this.bindCartItemEvents();
        },

        bindCartItemEvents: function() {
            // Quantity buttons
            const quantityButtons = this.cartItems.querySelectorAll('.quantity-btn');
            quantityButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const line = parseInt(button.dataset.line);
                    const isIncrease = button.classList.contains('quantity-increase');
                    this.updateQuantity(line, isIncrease ? 1 : -1);
                });
            });

            // Quantity inputs
            const quantityInputs = this.cartItems.querySelectorAll('.quantity-input');
            quantityInputs.forEach(input => {
                input.addEventListener('change', (e) => {
                    const line = parseInt(input.dataset.line);
                    const newQuantity = parseInt(e.target.value);
                    this.setQuantity(line, newQuantity);
                });
            });

            // Remove buttons
            const removeButtons = this.cartItems.querySelectorAll('.cart-item-remove');
            removeButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const line = parseInt(button.dataset.line);
                    this.removeItem(line);
                });
            });
        },

        updateQuantity: function(line, change) {
            const input = this.cartItems.querySelector(`[data-line="${line}"].quantity-input`);
            if (!input) return;

            const currentQuantity = parseInt(input.value);
            const newQuantity = Math.max(1, currentQuantity + change);
            this.setQuantity(line, newQuantity);
        },

        setQuantity: function(line, quantity) {
            const updates = {};
            updates[line] = quantity;

            fetch(CONFIG.cart.updateEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ updates })
            })
            .then(response => response.json())
            .then(data => {
                this.renderCartItems(data);
                this.updateCartTotal(data.total_price);
                this.updateCartCount();
            })
            .catch(error => {
                console.error('Update quantity error:', error);
                Utils.showError('Failed to update quantity');
            });
        },

        removeItem: function(line) {
            this.setQuantity(line, 0);
        },

        updateCartTotal: function(totalPrice) {
            if (this.cartTotal) {
                this.cartTotal.textContent = Utils.formatCurrency(totalPrice, window.theme.moneyFormat);
            }
        },

        showAddedToCartNotification: function(item) {
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.innerHTML = `
                <div class="cart-notification-content">
                    <p>Added to cart: ${item.product_title}</p>
                </div>
            `;
            notification.setAttribute('role', 'alert');
            notification.setAttribute('aria-live', 'polite');
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        },

        toggle: function() {
            this.isOpen ? this.close() : this.open();
        },

        open: function() {
            if (!this.cartDrawer) return;

            this.isOpen = true;
            document.body.classList.add('cart-open');
            this.cartDrawer.classList.add('is-open');
            this.loadCartData();
        },

        close: function() {
            if (!this.cartDrawer) return;

            this.isOpen = false;
            document.body.classList.remove('cart-open');
            this.cartDrawer.classList.remove('is-open');
        }
    };

    // Product Image Gallery
    const ImageGallery = {
        galleries: [],

        init: function() {
            const galleryContainers = document.querySelectorAll('.product-gallery');
            galleryContainers.forEach(container => {
                this.initGallery(container);
            });
        },

        initGallery: function(container) {
            const mainImage = container.querySelector('.main-image');
            const thumbnails = container.querySelectorAll('.thumbnail');
            const prevButton = container.querySelector('.gallery-prev');
            const nextButton = container.querySelector('.gallery-next');
            const zoomButton = container.querySelector('.zoom-button');

            if (!mainImage || !thumbnails.length) return;

            const gallery = {
                container,
                mainImage,
                thumbnails: Array.from(thumbnails),
                prevButton,
                nextButton,
                zoomButton,
                currentIndex: 0,
                isZoomed: false
            };

            this.galleries.push(gallery);
            this.bindGalleryEvents(gallery);
            this.setupAccessibility(gallery);
        },

        bindGalleryEvents: function(gallery) {
            // Thumbnail clicks
            gallery.thumbnails.forEach((thumbnail, index) => {
                thumbnail.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showImage(gallery, index);
                });
            });

            // Navigation buttons
            if (gallery.prevButton) {
                gallery.prevButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showPrevImage(gallery);
                });
            }

            if (gallery.nextButton) {
                gallery.nextButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showNextImage(gallery);
                });
            }

            // Zoom functionality
            if (gallery.zoomButton) {
                gallery.zoomButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleZoom(gallery);
                });
            }

            // Keyboard navigation
            gallery.container.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.showPrevImage(gallery);
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.showNextImage(gallery);
                        break;
                    case 'Escape':
                        if (gallery.isZoomed) {
                            this.toggleZoom(gallery);
                        }
                        break;
                }
            });

            // Touch/swipe support
            let touchStartX = 0;
            let touchEndX = 0;

            gallery.mainImage.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            gallery.mainImage.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe(gallery, touchStartX, touchEndX);
            });
        },

        setupAccessibility: function(gallery) {
            gallery.mainImage.setAttribute('role', 'img');
            gallery.mainImage.setAttribute('aria-live', 'polite');
            
            gallery.thumbnails.forEach((thumbnail, index) => {
                thumbnail.setAttribute('role', 'button');
                thumbnail.setAttribute('aria-label', `View image ${index + 1}`);
                thumbnail.setAttribute('tabindex', '0');
            });
        },

        showImage: function(gallery, index) {
            if (index < 0 || index >= gallery.thumbnails.length) return;

            gallery.currentIndex = index;
            const thumbnail = gallery.thumbnails[index];
            const imageUrl = thumbnail.dataset.fullImage || thumbnail.src;

            // Update main image
            gallery.mainImage.src = imageUrl;
            gallery.mainImage.alt = thumbnail.alt;

            // Update thumbnails
            gallery.thumbnails.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
                thumb.setAttribute('aria-selected', i === index);
            });

            // Update navigation buttons
            if (gallery.prevButton) {
                gallery.prevButton.disabled = index === 0;
            }
            if (gallery.nextButton) {
                gallery.nextButton.disabled = index === gallery.thumbnails.length - 1;
            }
        },

        showPrevImage: function(gallery) {
            const newIndex = Math.max(0, gallery.currentIndex - 1);
            this.showImage(gallery, newIndex);
        },

        showNextImage: function(gallery) {
            const newIndex = Math.min(gallery.thumbnails.length - 1, gallery.currentIndex + 1);
            this.showImage(gallery, newIndex);
        },

        handleSwipe: function(gallery, startX, endX) {
            const minSwipeDistance = 50;
            const swipeDistance = endX - startX;

            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                    this.showPrevImage(gallery);
                } else {
                    this.showNextImage(gallery);
                }
            }
        },

        toggleZoom: function(gallery) {
            gallery.isZoomed = !gallery.isZoomed;
            gallery.container.classList.toggle('zoomed', gallery.isZoomed);
            
            if (gallery.zoomButton) {
                gallery.zoomButton.setAttribute('aria-pressed', gallery.isZoomed);
            }
        }
    };

    // Newsletter Signup
    const Newsletter = {
        forms: [],

        init: function() {
            const newsletterForms = document.querySelectorAll('.newsletter-form');
            newsletterForms.forEach(form => {
                this.initForm(form);
            });
        },

        initForm: function(form) {
            const emailInput = form.querySelector('input[type="email"]');
            const submitButton = form.querySelector('button[type="submit"]');
            const messageContainer = form.querySelector('.newsletter-message');

            if (!emailInput || !submitButton) return;

            const formData = {
                form,
                emailInput,
                submitButton,
                messageContainer
            };

            this.forms.push(formData);
            this.bindFormEvents(formData);
        },

        bindFormEvents: function(formData) {
            formData.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitForm(formData);
            });

            // Real-time validation
            formData.emailInput.addEventListener('input', () => {
                this.validateEmail(formData);
            });
        },

        validateEmail: function(formData) {
            const email = formData.emailInput.value;
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            
            formData.emailInput.classList.toggle('invalid', !isValid && email.length > 0);
            formData.emailInput.setAttribute('aria-invalid', !isValid && email.length > 0);
            
            return isValid;
        },

        submitForm: function(formData) {
            if (!this.validateEmail(formData)) {
                this.showMessage(formData, 'Please enter a valid email address.', 'error');
                return;
            }

            Utils.showLoading(formData.submitButton, 'Subscribing...');

            const formDataObj = new FormData(formData.form);
            
            fetch(formData.form.action, {
                method: 'POST',
                body: formDataObj
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.showMessage(formData, 'Thank you for subscribing!', 'success');
                    formData.form.reset();
                } else {
                    this.showMessage(formData, data.message || 'Subscription failed. Please try again.', 'error');
                }
            })
            .catch(error => {
                console.error('Newsletter error:', error);
                this.showMessage(formData, 'Subscription failed. Please try again.', 'error');
            })
            .finally(() => {
                Utils.hideLoading(formData.submitButton);
            });
        },

        showMessage: function(formData, message, type) {
            if (!formData.messageContainer) return;

            formData.messageContainer.textContent = message;
            formData.messageContainer.className = `newsletter-message ${type}`;
            formData.messageContainer.setAttribute('role', 'alert');
            formData.messageContainer.setAttribute('aria-live', 'polite');
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formData.messageContainer.textContent = '';
                formData.messageContainer.className = 'newsletter-message';
                formData.messageContainer.removeAttribute('role');
                formData.messageContainer.removeAttribute('aria-live');
            }, 5000);
        }
    };

    // Scroll Effects and Animations
    const ScrollEffects = {
        elements: [],
        scrollY: 0,
        isScrolling: false,

        init: function() {
            this.bindEvents();
            this.initAnimatedElements();
            this.initParallaxElements();
        },

        bindEvents: function() {
            window.addEventListener('scroll', Utils.throttle(() => {
                this.scrollY = window.pageYOffset;
                this.updateScrollEffects();
            }, 16)); // ~60fps
        },

        initAnimatedElements: function() {
            const animatedElements = document.querySelectorAll('[data-animate]');
            animatedElements.forEach(element => {
                this.elements.push({
                    element,
                    type: 'animate',
                    animation: element.dataset.animate,
                    triggered: false
                });
            });
        },

        initParallaxElements: function() {
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            parallaxElements.forEach(element => {
                this.elements.push({
                    element,
                    type: 'parallax',
                    speed: parseFloat(element.dataset.parallax) || 0.5,
                    offset: 0
                });
            });
        },

        updateScrollEffects: function() {
            this.elements.forEach(item => {
                if (item.type === 'animate') {
                    this.handleAnimation(item);
                } else if (item.type === 'parallax') {
                    this.handleParallax(item);
                }
            });
        },

        handleAnimation: function(item) {
            if (item.triggered) return;

            if (Utils.isInViewport(item.element)) {
                item.element.classList.add('animate-in');
                item.triggered = true;
            }
        },

        handleParallax: function(item) {
            const rect = item.element.getBoundingClientRect();
            const isVisible = rect.bottom >= 0 && rect.top <= window.innerHeight;
            
            if (isVisible) {
                const yPos = -(this.scrollY * item.speed);
                item.element.style.transform = `translateY(${yPos}px)`;
            }
        }
    };

    // Responsive Breakpoint Handler
    const ResponsiveHandler = {
        currentBreakpoint: null,
        breakpoints: CONFIG.breakpoints,

        init: function() {
            this.checkBreakpoint();
            this.bindEvents();
        },

        bindEvents: function() {
            window.addEventListener('resize', Utils.throttle(() => {
                this.checkBreakpoint();
            }, 250));
        },

        checkBreakpoint: function() {
            const width = Utils.getViewportWidth();
            let newBreakpoint = 'desktop';

            if (width <= this.breakpoints.mobile) {
                newBreakpoint = 'mobile';
            } else if (width <= this.breakpoints.tablet) {
                newBreakpoint = 'tablet';
            }

            if (newBreakpoint !== this.currentBreakpoint) {
                this.currentBreakpoint = newBreakpoint;
                this.handleBreakpointChange(newBreakpoint);
            }
        },

        handleBreakpointChange: function(breakpoint) {
            document.body.classList.remove('mobile', 'tablet', 'desktop');
            document.body.classList.add(breakpoint);
            
            // Trigger custom event
            window.dispatchEvent(new CustomEvent('breakpointChange', {
                detail: { breakpoint }
            }));
        }
    };

    // Form Validation
    const FormValidation = {
        forms: [],

        init: function() {
            const forms = document.querySelectorAll('form[data-validate]');
            forms.forEach(form => {
                this.initForm(form);
            });
        },

        initForm: function(form) {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            const formData = {
                form,
                inputs: Array.from(inputs),
                isValid: false
            };

            this.forms.push(formData);
            this.bindFormEvents(formData);
        },

        bindFormEvents: function(formData) {
            formData.form.addEventListener('submit', (e) => {
                if (!this.validateForm(formData)) {
                    e.preventDefault();
                }
            });

            formData.inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateInput(input);
                });

                input.addEventListener('input', () => {
                    this.clearValidation(input);
                });
            });
        },

        validateForm: function(formData) {
            let isValid = true;
            
            formData.inputs.forEach(input => {
                if (!this.validateInput(input)) {
                    isValid = false;
                }
            });

            formData.isValid = isValid;
            return isValid;
        },

        validateInput: function(input) {
            const value = input.value.trim();
            const type = input.type;
            const required = input.hasAttribute('required');
            let isValid = true;
            let message = '';

            // Required validation
            if (required && !value) {
                isValid = false;
                message = 'This field is required.';
            }

            // Type-specific validation
            if (value && !isValid !== false) {
                switch(type) {
                    case 'email':
                        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                        message = isValid ? '' : 'Please enter a valid email address.';
                        break;
                    case 'tel':
                        isValid = /^[\d\s\-\+\(\)]+$/.test(value);
                        message = isValid ? '' : 'Please enter a valid phone number.';
                        break;
                    case 'url':
                        isValid = /^https?:\/\/.+$/.test(value);
                        message = isValid ? '' : 'Please enter a valid URL.';
                        break;
                }
            }

            // Custom validation
            const customValidation = input.dataset.validation;
            if (customValidation && isValid) {
                switch(customValidation) {
                    case 'password':
                        isValid = value.length >= 8;
                        message = isValid ? '' : 'Password must be at least 8 characters long.';
                        break;
                    case 'confirm-password':
                        const passwordInput = input.form.querySelector('input[type="password"]');
                        isValid = passwordInput && value === passwordInput.value;
                        message = isValid ? '' : 'Passwords do not match.';
                        break;
                }
            }

            this.showValidation(input, isValid, message);
            return isValid;
        },

        showValidation: function(input, isValid, message) {
            input.classList.toggle('invalid', !isValid);
            input.setAttribute('aria-invalid', !isValid);

            // Show/hide error message
            let errorElement = input.parentNode.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.setAttribute('role', 'alert');
                input.parentNode.appendChild(errorElement);
            }

            errorElement.textContent = message;
            errorElement.style.display = message ? 'block' : 'none';
        },

        clearValidation: function(input) {
            input.classList.remove('invalid');
            input.removeAttribute('aria-invalid');
            
            const errorElement = input.parentNode.querySelector('.error-message');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }
    };

    // Performance Optimizations
    const Performance = {
        init: function() {
            this.lazyLoadImages();
            this.preloadCriticalResources();
            this.optimizeAnimations();
        },

        lazyLoadImages: function() {
            const images = document.querySelectorAll('img[data-src]');
            
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
                });

                images.forEach(img => {
                    imageObserver.observe(img);
                });
            } else {
                // Fallback for older browsers
                images.forEach(img => {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                });
            }
        },

        preloadCriticalResources: function() {
            const criticalImages = document.querySelectorAll('img[data-preload]');
            criticalImages.forEach(img => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = img.src || img.dataset.src;
                document.head.appendChild(link);
            });
        },

        optimizeAnimations: function() {
            // Reduce animations for users who prefer reduced motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.body.classList.add('reduce-motion');
            }
        }
    };

    // Accessibility Features
    const Accessibility = {
        init: function() {
            this.setupKeyboardNavigation();
            this.setupFocusManagement();
            this.setupARIALabels();
            this.setupSkipLinks();
        },

        setupKeyboardNavigation: function() {
            // Tab navigation for custom interactive elements
            const interactiveElements = document.querySelectorAll('[data-interactive]');
            interactiveElements.forEach(element => {
                if (!element.hasAttribute('tabindex')) {
                    element.setAttribute('tabindex', '0');
                }
                
                element.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        element.click();
                    }
                });
            });
        },

        setupFocusManagement: function() {
            // Focus outline for keyboard users
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                }
            });

            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-navigation');
            });
        },

        setupARIALabels: function() {
            // Auto-generate ARIA labels for common elements
            const buttons = document.querySelectorAll('button:not([aria-label])');
            buttons.forEach(button => {
                const text = button.textContent.trim();
                if (text) {
                    button.setAttribute('aria-label', text);
                }
            });

            const links = document.querySelectorAll('a:not([aria-label])');
            links.forEach(link => {
                const text = link.textContent.trim();
                if (text) {
                    link.setAttribute('aria-label', text);
                }
            });
        },

        setupSkipLinks: function() {
            // Add skip to main content link
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.textContent = 'Skip to main content';
            skipLink.className = 'skip-link';
            skipLink.setAttribute('aria-label', 'Skip to main content');
            
            document.body.insertBefore(skipLink, document.body.firstChild);
            
            // Ensure main content has ID
            const mainContent = document.querySelector('main') || document.querySelector('#main-content');
            if (mainContent && !mainContent.id) {
                mainContent.id = 'main-content';
            }
        }
    };

    // Main initialization
    const PowerUpGym = {
        init: function() {
            DOMReady.init();
            DOMReady.ready(() => {
                // Initialize all modules
                MobileMenu.init();
                Search.init();
                ProductFilters.init();
                Cart.init();
                ImageGallery.init();
                Newsletter.init();
                ScrollEffects.init();
                ResponsiveHandler.init();
                FormValidation.init();
                Performance.init();
                Accessibility.init();
                
                // Custom initialization complete event
                window.dispatchEvent(new CustomEvent('powerUpGymReady'));
            });
        }
    };

    // Auto-initialize when script loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', PowerUpGym.init);
    } else {
        PowerUpGym.init();
    }

    // Expose public API
    window.PowerUpGym = {
        Utils,
        MobileMenu,
        Search,
        ProductFilters,
        Cart,
        ImageGallery,
        Newsletter,
        ScrollEffects,
        ResponsiveHandler,
        FormValidation,
        Performance,
        Accessibility
    };

})();

(function() {
  'use strict';

  // Core theme object
  const PowerUpTheme = {
    cache: {
      $document: null,
      $window: null,
      $body: null,
      $header: null,
      $cart: null,
      $searchForm: null,
      $mobileMenu: null
    },
    
    config: {
      hasSessionStorage: true,
      hasLocalStorage: true,
      isTouch: false,
      mediaQuerySmall: 'screen and (max-width: 768px)',
      mediaQueryMedium: 'screen and (max-width: 1024px)',
      cartType: 'drawer',
      moneyFormat: '${{amount}}',
      cartCookieName: 'cart',
      cartCookieExpiry: 7
    },

    init: function() {
      this.cacheSelectors();
      this.checkStorage();
      this.initializeModules();
      this.bindEvents();
      this.initAccessibility();
      this.initLazyLoading();
      this.initCookieConsent();
      
      // Initialize after DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', this.onDOMReady.bind(this));
      } else {
        this.onDOMReady();
      }
    },

    cacheSelectors: function() {
      this.cache.$document = document;
      this.cache.$window = window;
      this.cache.$body = document.body;
      this.cache.$header = document.querySelector('.site-header');
      this.cache.$cart = document.querySelector('.cart-drawer');
      this.cache.$searchForm = document.querySelector('.search-form');
      this.cache.$mobileMenu = document.querySelector('.mobile-menu');
    },

    checkStorage: function() {
      try {
        const testKey = '__test__';
        window.sessionStorage.setItem(testKey, 'test');
        window.sessionStorage.removeItem(testKey);
        this.config.hasSessionStorage = true;
      } catch(e) {
        this.config.hasSessionStorage = false;
      }

      try {
        const testKey = '__test__';
        window.localStorage.setItem(testKey, 'test');
        window.localStorage.removeItem(testKey);
        this.config.hasLocalStorage = true;
      } catch(e) {
        this.config.hasLocalStorage = false;
      }
    },

    initializeModules: function() {
      this.Cart.init();
      this.Product.init();
      this.Search.init();
      this.MobileMenu.init();
      this.Modal.init();
      this.Forms.init();
      this.Animation.init();
      this.Social.init();
      this.Newsletter.init();
      this.Filters.init();
    },

    bindEvents: function() {
      window.addEventListener('resize', this.Utils.debounce(this.onResize.bind(this), 250));
      window.addEventListener('scroll', this.Utils.throttle(this.onScroll.bind(this), 16));
      window.addEventListener('load', this.onLoad.bind(this));
      
      // Touch detection
      document.addEventListener('touchstart', this.onTouchStart.bind(this), { once: true });
    },

    onDOMReady: function() {
      this.cache.$body.classList.add('dom-ready');
      this.initResponsiveBehavior();
      this.Animation.initPageTransitions();
    },

    onLoad: function() {
      this.cache.$body.classList.add('loaded');
      this.Performance.init();
    },

    onResize: function() {
      this.initResponsiveBehavior();
      this.MobileMenu.handleResize();
    },

    onScroll: function() {
      this.handleHeaderScroll();
      this.LazyLoad.checkImages();
    },

    onTouchStart: function() {
      this.config.isTouch = true;
      this.cache.$body.classList.add('touch-enabled');
    },

    initResponsiveBehavior: function() {
      const isSmallScreen = window.matchMedia(this.config.mediaQuerySmall).matches;
      const isMediumScreen = window.matchMedia(this.config.mediaQueryMedium).matches;
      
      this.cache.$body.classList.toggle('small-screen', isSmallScreen);
      this.cache.$body.classList.toggle('medium-screen', isMediumScreen);
    },

    initAccessibility: function() {
      this.Accessibility.init();
    },

    initLazyLoading: function() {
      this.LazyLoad.init();
    },

    initCookieConsent: function() {
      this.CookieConsent.init();
    },

    handleHeaderScroll: function() {
      const scrollTop = window.pageYOffset;
      const headerHeight = this.cache.$header ? this.cache.$header.offsetHeight : 0;
      
      if (scrollTop > headerHeight) {
        this.cache.$body.classList.add('header-scrolled');
      } else {
        this.cache.$body.classList.remove('header-scrolled');
      }
    }
  };

  // Utility functions
  PowerUpTheme.Utils = {
    debounce: function(func, wait, immediate) {
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
    },

    formatMoney: function(cents, format) {
      if (typeof cents === 'string') {
        cents = cents.replace('.', '');
      }
      
      const value = '';
      const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
      const formatString = format || PowerUpTheme.config.moneyFormat;
      
      function formatWithDelimiters(number, precision, thousands, decimal) {
        thousands = thousands || ',';
        decimal = decimal || '.';
        
        if (isNaN(number) || number == null) {
          return 0;
        }
        
        number = (number / 100.0).toFixed(precision);
        
        const parts = number.split('.');
        const dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
        const centsAmount = parts[1] ? (decimal + parts[1]) : '';
        
        return dollarsAmount + centsAmount;
      }
      
      switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
          value = formatWithDelimiters(cents, 2);
          break;
        case 'amount_no_decimals':
          value = formatWithDelimiters(cents, 0);
          break;
        case 'amount_with_space_separator':
          value = formatWithDelimiters(cents, 2, ' ', '.');
          break;
        case 'amount_no_decimals_with_space_separator':
          value = formatWithDelimiters(cents, 0, ' ', '.');
          break;
        case 'amount_with_apostrophe_separator':
          value = formatWithDelimiters(cents, 2, "'", '.');
          break;
      }
      
      return formatString.replace(placeholderRegex, value);
    },

    serialize: function(form) {
      const formData = new FormData(form);
      const params = new URLSearchParams();
      
      for (const [key, value] of formData.entries()) {
        params.append(key, value);
      }
      
      return params.toString();
    },

    getUrlParameter: function(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    },

    updateUrlParameter: function(key, value) {
      const url = new URL(window.location);
      url.searchParams.set(key, value);
      window.history.pushState({}, '', url);
    },

    removeUrlParameter: function(key) {
      const url = new URL(window.location);
      url.searchParams.delete(key);
      window.history.pushState({}, '', url);
    },

    getCookie: function(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },

    setCookie: function(name, value, days) {
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
      }
      document.cookie = `${name}=${value || ''}${expires}; path=/`;
    },

    sanitizeString: function(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    },

    escapeHtml: function(unsafe) {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
  };

  // Cart functionality
  PowerUpTheme.Cart = {
    init: function() {
      this.bindEvents();
      this.updateCartCount();
    },

    bindEvents: function() {
      document.addEventListener('click', this.handleCartClick.bind(this));
      document.addEventListener('change', this.handleQuantityChange.bind(this));
      document.addEventListener('submit', this.handleCartForm.bind(this));
    },

    handleCartClick: function(e) {
      const target = e.target;
      
      if (target.closest('.add-to-cart')) {
        e.preventDefault();
        this.addToCart(target.closest('.add-to-cart'));
      }
      
      if (target.closest('.cart-remove')) {
        e.preventDefault();
        this.removeFromCart(target.closest('.cart-remove'));
      }
      
      if (target.closest('.cart-toggle')) {
        e.preventDefault();
        this.toggleCart();
      }
    },

    handleQuantityChange: function(e) {
      const target = e.target;
      
      if (target.classList.contains('cart-quantity')) {
        this.updateQuantity(target);
      }
    },

    handleCartForm: function(e) {
      const target = e.target;
      
      if (target.classList.contains('cart-form')) {
        e.preventDefault();
        this.updateCart(target);
      }
    },

    addToCart: function(button) {
      const form = button.closest('form');
      const formData = new FormData(form);
      
      this.setLoading(button, true);
      
      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 422) {
          throw new Error(data.description);
        }
        
        this.updateCartCount();
        this.showCartNotification(data);
        this.openCart();
      })
      .catch(error => {
        this.showError(error.message);
        console.error('Cart error:', error);
      })
      .finally(() => {
        this.setLoading(button, false);
      });
    },

    updateQuantity: function(input) {
      const key = input.dataset.key;
      const quantity = parseInt(input.value);
      
      if (isNaN(quantity) || quantity < 0) {
        input.value = input.dataset.originalValue || 1;
        return;
      }
      
      this.updateCartItem(key, quantity);
    },

    updateCartItem: function(key, quantity) {
      const data = {
        id: key,
        quantity: quantity
      };
      
      fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(cart => {
        this.updateCartUI(cart);
        this.updateCartCount();
      })
      .catch(error => {
        this.showError('Failed to update cart');
        console.error('Cart update error:', error);
      });
    },

    removeFromCart: function(button) {
      const key = button.dataset.key;
      this.updateCartItem(key, 0);
    },

    updateCart: function(form) {
      const formData = new FormData(form);
      
      fetch('/cart/update.js', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(cart => {
        this.updateCartUI(cart);
        this.updateCartCount();
      })
      .catch(error => {
        this.showError('Failed to update cart');
        console.error('Cart update error:', error);
      });
    },

    getCart: function() {
      return fetch('/cart.js')
        .then(response => response.json())
        .catch(error => {
          console.error('Get cart error:', error);
          return { items: [], item_count: 0, total_price: 0 };
        });
    },

    updateCartCount: function() {
      this.getCart().then(cart => {
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
          element.textContent = cart.item_count;
          element.style.display = cart.item_count > 0 ? 'block' : 'none';
        });
      });
    },

    updateCartUI: function(cart) {
      const cartDrawer = document.querySelector('.cart-drawer');
      if (!cartDrawer) return;
      
      // Update cart items
      const cartItems = cartDrawer.querySelector('.cart-items');
      if (cartItems) {
        cartItems.innerHTML = this.buildCartItemsHTML(cart.items);
      }
      
      // Update cart total
      const cartTotal = cartDrawer.querySelector('.cart-total');
      if (cartTotal) {
        cartTotal.textContent = PowerUpTheme.Utils.formatMoney(cart.total_price);
      }
      
      // Update empty state
      cartDrawer.classList.toggle('cart-empty', cart.item_count === 0);
    },

    buildCartItemsHTML: function(items) {
      if (!items || items.length === 0) {
        return '<div class="cart-empty-message">Your cart is empty</div>';
      }
      
      return items.map(item => {
        return `
          <div class="cart-item" data-key="${item.key}">
            <div class="cart-item-image">
              <img src="${item.image}" alt="${PowerUpTheme.Utils.escapeHtml(item.title)}" loading="lazy">
            </div>
            <div class="cart-item-details">
              <h3 class="cart-item-title">${PowerUpTheme.Utils.escapeHtml(item.title)}</h3>
              <div class="cart-item-price">${PowerUpTheme.Utils.formatMoney(item.price)}</div>
              <div class="cart-item-quantity">
                <button class="quantity-btn quantity-minus" data-key="${item.key}">-</button>
                <input type="number" class="cart-quantity" value="${item.quantity}" min="0" data-key="${item.key}">
                <button class="quantity-btn quantity-plus" data-key="${item.key}">+</button>
              </div>
            </div>
            <button class="cart-remove" data-key="${item.key}" aria-label="Remove item">×</button>
          </div>
        `;
      }).join('');
    },

    toggleCart: function() {
      const cartDrawer = document.querySelector('.cart-drawer');
      if (!cartDrawer) return;
      
      const isOpen = cartDrawer.classList.contains('cart-open');
      
      if (isOpen) {
        this.closeCart();
      } else {
        this.openCart();
      }
    },

    openCart: function() {
      const cartDrawer = document.querySelector('.cart-drawer');
      if (!cartDrawer) return;
      
      cartDrawer.classList.add('cart-open');
      document.body.classList.add('cart-drawer-open');
      
      // Update cart contents
      this.getCart().then(cart => {
        this.updateCartUI(cart);
      });
      
      // Trap focus
      PowerUpTheme.Accessibility.trapFocus(cartDrawer);
    },

    closeCart: function() {
      const cartDrawer = document.querySelector('.cart-drawer');
      if (!cartDrawer) return;
      
      cartDrawer.classList.remove('cart-open');
      document.body.classList.remove('cart-drawer-open');
      
      // Remove focus trap
      PowerUpTheme.Accessibility.removeFocusTrap();
    },

    showCartNotification: function(item) {
      const notification = document.createElement('div');
      notification.className = 'cart-notification';
      notification.innerHTML = `
        <div class="cart-notification-content">
          <div class="cart-notification-message">
            Item added to cart
          </div>
          <div class="cart-notification-item">
            ${PowerUpTheme.Utils.escapeHtml(item.title)}
          </div>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.classList.add('show');
      }, 10);
      
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          notification.remove();
        }, 300);
      }, 3000);
    },

    showError: function(message) {
      const error = document.createElement('div');
      error.className = 'cart-error';
      error.textContent = message;
      
      document.body.appendChild(error);
      
      setTimeout(() => {
        error.classList.add('show');
      }, 10);
      
      setTimeout(() => {
        error.classList.remove('show');
        setTimeout(() => {
          error.remove();
        }, 300);
      }, 5000);
    },

    setLoading: function(button, loading) {
      if (loading) {
        button.classList.add('loading');
        button.disabled = true;
      } else {
        button.classList.remove('loading');
        button.disabled = false;
      }
    }
  };

  // Product functionality
  PowerUpTheme.Product = {
    init: function() {
      this.bindEvents();
      this.initVariants();
      this.initImageGallery();
      this.initReviews();
    },

    bindEvents: function() {
      document.addEventListener('change', this.handleVariantChange.bind(this));
      document.addEventListener('click', this.handleImageClick.bind(this));
      document.addEventListener('submit', this.handleReviewForm.bind(this));
    },

    handleVariantChange: function(e) {
      const target = e.target;
      
      if (target.classList.contains('variant-selector')) {
        this.updateVariant(target);
      }
    },

    handleImageClick: function(e) {
      const target = e.target;
      
      if (target.closest('.product-image-thumb')) {
        e.preventDefault();
        this.changeMainImage(target.closest('.product-image-thumb'));
      }
      
      if (target.closest('.product-image-main')) {
        e.preventDefault();
        this.openImageModal(target.closest('.product-image-main'));
      }
    },

    handleReviewForm: function(e) {
      const target = e.target;
      
      if (target.classList.contains('review-form')) {
        e.preventDefault();
        this.submitReview(target);
      }
    },

    initVariants: function() {
      const variantSelectors = document.querySelectorAll('.variant-selector');
      variantSelectors.forEach(selector => {
        this.updateVariantState(selector);
      });
    },

    updateVariant: function(selector) {
      const productForm = selector.closest('.product-form');
      if (!productForm) return;
      
      const selectedVariant = this.getSelectedVariant(productForm);
      
      if (selectedVariant) {
        this.updatePrice(selectedVariant);
        this.updateInventory(selectedVariant);
        this.updateImages(selectedVariant);
        this.updateUrl(selectedVariant);
        this.updateVariantInput(productForm, selectedVariant.id);
      }
    },

    getSelectedVariant: function(productForm) {
      const product = JSON.parse(productForm.dataset.product || '{}');
      const selectedOptions = Array.from(productForm.querySelectorAll('.variant-selector')).map(selector => {
        return selector.value;
      });
      
      return product.variants.find(variant => {
        return variant.options.every((option, index) => {
          return option === selectedOptions[index];
        });
      });
    },

    updatePrice: function(variant) {
      const priceElements = document.querySelectorAll('.product-price');
      priceElements.forEach(element => {
        element.textContent = PowerUpTheme.Utils.formatMoney(variant.price);
      });
      
      const comparePriceElements = document.querySelectorAll('.product-compare-price');
      comparePriceElements.forEach(element => {
        if (variant.compare_at_price > variant.price) {
          element.textContent = PowerUpTheme.Utils.formatMoney(variant.compare_at_price);
          element.style.display = 'inline';
        } else {
          element.style.display = 'none';
        }
      });
    },

    updateInventory: function(variant) {
      const addToCartButton = document.querySelector('.add-to-cart');
      const inventoryMessage = document.querySelector('.inventory-message');
      
      if (!addToCartButton) return;
      
      if (variant.available) {
        addToCartButton.disabled = false;
        addToCartButton.textContent = 'Add to Cart';
        
        if (inventoryMessage) {
          if (variant.inventory_quantity <= 5 && variant.inventory_quantity > 0) {
            inventoryMessage.textContent = `Only ${variant.inventory_quantity} left in stock`;
            inventoryMessage.style.display = 'block';
          } else {
            inventoryMessage.style.display = 'none';
          }
        }
      } else {
        addToCartButton.disabled = true;
        addToCartButton.textContent = 'Sold Out';
        
        if (inventoryMessage) {
          inventoryMessage.textContent = 'Out of stock';
          inventoryMessage.style.display = 'block';
        }
      }
    },

    updateImages: function(variant) {
      if (!variant.featured_image) return;
      
      const mainImage = document.querySelector('.product-image-main img');
      const thumbnails = document.querySelectorAll('.product-image-thumb');
      
      if (mainImage) {
        mainImage.src = variant.featured_image.src;
        mainImage.alt = variant.featured_image.alt;
      }
      
      thumbnails.forEach(thumb => {
        const img = thumb.querySelector('img');
        if (img && img.src === variant.featured_image.src) {
          thumb.classList.add('active');
        } else {
          thumb.classList.remove('active');
        }
      });
    },

    updateUrl: function(variant) {
      const url = new URL(window.location);
      url.searchParams.set('variant', variant.id);
      window.history.replaceState({}, '', url);
    },

    updateVariantInput: function(form, variantId) {
      const variantInput = form.querySelector('[name="id"]');
      if (variantInput) {
        variantInput.value = variantId;
      }
    },

    updateVariantState: function(selector) {
      const productForm = selector.closest('.product-form');
      if (!productForm) return;
      
      const selectedVariant = this.getSelectedVariant(productForm);
      
      if (selectedVariant) {
        this.updatePrice(selectedVariant);
        this.updateInventory(selectedVariant);
      }
    },

    initImageGallery: function() {
      const gallery = document.querySelector('.product-images');
      if (!gallery) return;
      
      const mainImage = gallery.querySelector('.product-image-main img');
      const thumbnails = gallery.querySelectorAll('.product-image-thumb');
      
      // Set first thumbnail as active
      if (thumbnails.length > 0) {
        thumbnails[0].classList.add('active');
      }
      
      // Keyboard navigation
      gallery.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          this.navigateGallery(e.key === 'ArrowLeft' ? -1 : 1);
        }
      });
    },

    changeMainImage: function(thumbnail) {
      const img = thumbnail.querySelector('img');
      const mainImage = document.querySelector('.product-image-main img');
      
      if (!img || !mainImage) return;
      
      // Remove active class from all thumbnails
      document.querySelectorAll('.product-image-thumb').forEach(thumb => {
        thumb.classList.remove('active');
      });
      
      // Add active class to clicked thumbnail
      thumbnail.classList.add('active');
      
      // Update main image
      mainImage.src = img.src;
      mainImage.alt = img.alt;
    },

    navigateGallery: function(direction) {
      const thumbnails = document.querySelectorAll('.product-image-thumb');
      const activeThumbnail = document.querySelector('.product-image-thumb.active');
      
      if (!activeThumbnail || thumbnails.length === 0) return;
      
      const currentIndex = Array.from(thumbnails).indexOf(activeThumbnail);
      let newIndex = currentIndex + direction;
      
      if (newIndex < 0) {
        newIndex = thumbnails.length - 1;
      } else if (newIndex >= thumbnails.length) {
        newIndex = 0;
      }
      
      this.changeMainImage(thumbnails[newIndex]);
    },

    openImageModal: function(imageContainer) {
      const img = imageContainer.querySelector('img');
      if (!img) return;
      
      const modal = document.createElement('div');
      modal.className = 'image-modal';
      modal.innerHTML = `
        <div class="image-modal-overlay">
          <div class="image-modal-content">
            <img src="${img.src}" alt="${img.alt}">
            <button class="image-modal-close" aria-label="Close modal">×</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      document.body.classList.add('modal-open');
      
      // Close modal events
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('image-modal-overlay')) {
          this.closeImageModal(modal);
        }
      });
      
      modal.querySelector('.image-modal-close').addEventListener('click', () => {
        this.closeImageModal(modal);
      });
      
      // Keyboard events
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeImageModal(modal);
        }
      });
      
      // Trap focus
      PowerUpTheme.Accessibility.trapFocus(modal);
    },

    closeImageModal: function(modal) {
      document.body.classList.remove('modal-open');
      modal.remove();
      PowerUpTheme.Accessibility.removeFocusTrap();
    },

    initReviews: function() {
      const reviewsSection = document.querySelector('.product-reviews');
      if (!reviewsSection) return;
      
      this.loadReviews();
      this.initReviewForm();
    },

    loadReviews: function() {
      // This would integrate with a review service like Yotpo, Judge.me, etc.
      // For now, we'll just handle the UI structure
      const reviewsList = document.querySelector('.reviews-list');
      if (!reviewsList) return;
      
      // Add loading state
      reviewsList.classList.add('loading');
      
      // Simulate API call
      setTimeout(() => {
        reviewsList.classList.remove('loading');
        // Reviews would be populated here
      }, 1000);
    },

    initReviewForm: function() {
      const reviewForm = document.querySelector('.review-form');
      if (!reviewForm) return;
      
      // Star rating functionality
      const starRating = reviewForm.querySelector('.star-rating');
      if (starRating) {
        this.initStarRating(starRating);
      }
    },

    initStarRating: function(container) {
      const stars = container.querySelectorAll('.star');
      const ratingInput = container.querySelector('input[name="rating"]');
      
      stars.forEach((star, index) => {
        star.addEventListener('click', () => {
          const rating = index + 1;
          ratingInput.value = rating;
          
          stars.forEach((s, i) => {
            s.classList.toggle('active', i < rating);
          });
        });
        
        star.addEventListener('mouseenter', () => {
          stars.forEach((s, i) => {
            s.classList.toggle('hover', i <= index);
          });
        });
      });
      
      container.addEventListener('mouseleave', () => {
        stars.forEach(s => s.classList.remove('hover'));
      });
    },

    submitReview: function(form) {
      const formData = new FormData(form);
      const submitButton = form.querySelector('button[type="submit"]');
      
      // Validate form
      if (!this.validateReviewForm(form)) {
        return;
      }
      
      // Set loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';
      
      // This would integrate with your review service API
      // For now, we'll simulate the submission
      setTimeout(() => {
        // Reset form
        form.reset();
        
        // Show success message
        this.showReviewSuccess();
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Review';
      }, 2000);
    },

    validateReviewForm: function(form) {
      const rating = form.querySelector('input[name="rating"]').value;
      const title = form.querySelector('input[name="title"]').value;
      const content = form.querySelector('textarea[name="content"]').value;
      
      if (!rating || rating < 1 || rating > 5) {
        this.showFormError('Please select a rating');
        return false;
      }
      
      if (!title.trim()) {
        this.showFormError('Please enter a review title');
        return false;
      }
      
      if (!content.trim()) {
        this.showFormError('Please enter your review');
        return false;
      }
      
      return true;
    },

    showReviewSuccess: function() {
      const message = document.createElement('div');
      message.className = 'review-success';
      message.textContent = 'Thank you for your review! It will be published after moderation.';
      
      const reviewForm = document.querySelector('.review-form');
      reviewForm.parentNode.insertBefore(message, reviewForm.nextSibling);
      
      setTimeout(() => {
        message.remove();
      }, 5000);
    },

    showFormError: function(message) {
      const error = document.createElement('div');
      error.className = 'form-error';
      error.textContent = message;
      
      const reviewForm = document.querySelector('.review-form');
      reviewForm.parentNode.insertBefore(error, reviewForm);
      
      setTimeout(() => {
        error.remove();
      }, 5000);
    }
  };

  // Search functionality
  PowerUpTheme.Search = {
    init: function() {
      this.bindEvents();
      this.initPredictiveSearch();
    },

    bindEvents: function() {
      document.addEventListener('input', this.handleSearchInput.bind(this));
      document.addEventListener('submit', this.handleSearchSubmit.bind(this));
      document.addEventListener('click', this.handleSearchClick.bind(this));
      document.addEventListener('keydown', this.handleSearchKeydown.bind(this));
    },

    handleSearchInput: function(e) {
      const target = e.target;
      
      if (target.classList.contains('search-input')) {
        this.handlePredictiveSearch(target);
      }
    },

    handleSearchSubmit: function(e) {
      const target = e.target;
      
      if (target.classList.contains('search-form')) {
        this.submitSearch(target);
      }
    },

    handleSearchClick: function(e) {
      const target = e.target;
      
      if (target.closest('.search-toggle')) {
        e.preventDefault();
        this.toggleSearch();
      }
      
      if (target.closest('.search-close')) {
        e.preventDefault();
        this.closeSearch();
      }
      
      if (target.closest('.search-suggestion')) {
        e.preventDefault();
        this.selectSuggestion(target.closest('.search-suggestion'));
      }
    },

    handleSearchKeydown: function(e) {
      const target = e.target;
      
      if (target.classList.contains('search-input')) {
        const suggestions = document.querySelector('.search-suggestions');
        if (!suggestions) return;
        
        const activeSuggestion = suggestions.querySelector('.search-suggestion.active');
        const allSuggestions = suggestions.querySelectorAll('.search-suggestion');
        
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (activeSuggestion) {
            const nextSuggestion = activeSuggestion.nextElementSibling;
            if (nextSuggestion) {
              activeSuggestion.classList.remove('active');
              nextSuggestion.classList.add('active');
            }
          } else if (allSuggestions.length > 0) {
            allSuggestions[0].classList.add('active');
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (activeSuggestion) {
            const prevSuggestion = activeSuggestion.previousElementSibling;
            if (prevSuggestion) {
              activeSuggestion.classList.remove('active');
              prevSuggestion.classList.add('active');
            }
          } else if (allSuggestions.length > 0) {
            allSuggestions[allSuggestions.length - 1].classList.add('active');
          }
        } else if (e.key === 'Enter') {
          if (activeSuggestion) {
            e.preventDefault();
            this.selectSuggestion(activeSuggestion);
          }
        } else if (e.key === 'Escape') {
          this.hideSuggestions();
        }
      }
    },

    initPredictiveSearch: function() {
      this.searchCache = new Map();
      this.searchTimeout = null;
    },

    handlePredictiveSearch: function(input) {
      const query = input.value.trim();
      
      if (query.length < 3) {
        this.hideSuggestions();
        return;
      }
      
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.performPredictiveSearch(query, input);
      }, 300);
    },

    performPredictiveSearch: function(query, input) {
      // Check cache first
      if (this.searchCache.has(query)) {
        this.displaySuggestions(this.searchCache.get(query), input);
        return;
      }
      
      // Show loading state
      this.showSearchLoading(input);
      
      // Perform search
      const searchUrl = `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=8`;
      
      fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
          // Cache results
          this.searchCache.set(query, data);
          
          // Display suggestions
          this.displaySuggestions(data, input);
        })
        .catch(error => {
          console.error('Search error:', error);
          this.hideSuggestions();
        });
    },

    displaySuggestions: function(data, input) {
      const container = input.closest('.search-container');
      if (!container) return;
      
      let suggestions = container.querySelector('.search-suggestions');
      
      if (!suggestions) {
        suggestions = document.createElement('div');
        suggestions.className = 'search-suggestions';
        container.appendChild(suggestions);
      }
      
      if (!data.resources || !data.resources.results || !data.resources.results.products) {
        this.hideSuggestions();
        return;
      }
      
      const products = data.resources.results.products;
      
      if (products.length === 0) {
        suggestions.innerHTML = '<div class="search-no-results">No products found</div>';
        suggestions.style.display = 'block';
        return;
      }
      
      const suggestionsHTML = products.map(product => {
        const price = PowerUpTheme.Utils.formatMoney(product.price);
        const imageUrl = product.image ? product.image : '';
        
        return `
          <div class="search-suggestion" data-url="${product.url}">
            <div class="search-suggestion-image">
              <img src="${imageUrl}" alt="${PowerUpTheme.Utils.escapeHtml(product.title)}" loading="lazy">
            </div>
            <div class="search-suggestion-details">
              <div class="search-suggestion-title">${PowerUpTheme.Utils.escapeHtml(product.title)}</div>
              <div class="search-suggestion-price">${price}</div>
            </div>
          </div>
        `;
      }).join('');
      
      suggestions.innerHTML = suggestionsHTML;
      suggestions.style.display = 'block';
    },

    selectSuggestion: function(suggestion) {
      const url = suggestion.dataset.url;
      if (url) {
        window.location.href = url;
      }
    },

    hideSuggestions: function() {
      const suggestions = document.querySelectorAll('.search-suggestions');
      suggestions.forEach(s => s.style.display = 'none');
    },

    showSearchLoading: function(input) {
      const container = input.closest('.search-container');
      if (!container) return;
      
      let suggestions = container.querySelector('.search-suggestions');
      
      if (!suggestions) {
        suggestions = document.createElement('div');
        suggestions.className = 'search-suggestions';
        container.appendChild(suggestions);
      }
      
      suggestions.innerHTML = '<div class="search-loading">Searching...</div>';
      suggestions.style.display = 'block';
    },

    toggleSearch: function() {
      const searchOverlay = document.querySelector('.search-overlay');
      if (!searchOverlay) return;
      
      const isOpen = searchOverlay.classList.contains('search-open');
      
      if (isOpen) {
        this.closeSearch();
      } else {
        this.openSearch();
      }
    },

    openSearch: function() {
      const searchOverlay = document.querySelector('.search-overlay');
      if (!searchOverlay) return;
      
      searchOverlay.classList.add('search-open');
      document.body.classList.add('search-overlay-open');
      
      // Focus on search input
      const searchInput = searchOverlay.querySelector('.search-input');
      if (searchInput) {
        searchInput.focus();
      }
      
      // Trap focus
      PowerUpTheme.Accessibility.trapFocus(searchOverlay);
    },

    closeSearch: function() {
      const searchOverlay = document.querySelector('.search-overlay');
      if (!searchOverlay) return;
      
      searchOverlay.classList.remove('search-open');
      document.body.classList.remove('search-overlay-open');
      
      // Hide suggestions
      this.hideSuggestions();
      
      // Remove focus trap
      PowerUpTheme.Accessibility.removeFocusTrap();
    },

    submitSearch: function(form) {
      const input = form.querySelector('.search-input');
      const query = input.value.trim();
      
      if (query.length === 0) {
        return false;
      }
      
      // Let the form submit naturally
      return true;
    }
  };

  // Mobile menu functionality
  PowerUpTheme.MobileMenu = {
    init: function() {
      this.bindEvents();
      this.initSubmenu();
    },

    bindEvents: function() {
      document.addEventListener('click', this.handleMenuClick.bind(this));
      document.addEventListener('keydown', this.handleMenuKeydown.bind(this));
    },

    handleMenuClick: function(e) {
      const target = e.target;
      
      if (target.closest('.mobile-menu-toggle')) {
        e.preventDefault();
        this.toggleMobileMenu();
      }
      
      if (target.closest('.mobile-menu-close')) {
        e.preventDefault();
        this.closeMobileMenu();
      }
      
      if (target.closest('.mobile-submenu-toggle')) {
        e.preventDefault();
        this.toggleSubmenu(target.closest('.mobile-submenu-toggle'));
      }
    },

    handleMenuKeydown: function(e) {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (!mobileMenu || !mobileMenu.classList.contains('menu-open')) return;
      
      if (e.key === 'Escape') {
        this.closeMobileMenu();
      }
    },

    initSubmenu: function() {
      const submenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
      submenuToggles.forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'false');
      });
    },

    toggleMobileMenu: function() {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (!mobileMenu) return;
      
      const isOpen = mobileMenu.classList.contains('menu-open');
      
      if (isOpen) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    },

    openMobileMenu: function() {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (!mobileMenu) return;
      
      mobileMenu.classList.add('menu-open');
      document.body.classList.add('mobile-menu-open');
      
      // Update toggle button
      const toggleButton = document.querySelector('.mobile-menu-toggle');
      if (toggleButton) {
        toggleButton.setAttribute('aria-expanded', 'true');
      }
      
      // Trap focus
      PowerUpTheme.Accessibility.trapFocus(mobileMenu);
    },

    closeMobileMenu: function() {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (!mobileMenu) return;
      
      mobileMenu.classList.remove('menu-open');
      document.body.classList.remove('mobile-menu-open');
      
      // Update toggle button
      const toggleButton = document.querySelector('.mobile-menu-toggle');
      if (toggleButton) {
        toggleButton.setAttribute('aria-expanded', 'false');
      }
      
      // Close all submenus
      const openSubmenus = mobileMenu.querySelectorAll('.mobile-submenu.submenu-open');
      openSubmenus.forEach(submenu => {
        submenu.classList.remove('submenu-open');
      });
      
      // Remove focus trap
      PowerUpTheme.Accessibility.removeFocusTrap();
    },

    toggleSubmenu: function(toggle) {
      const submenu = toggle.nextElementSibling;
      if (!submenu) return;
      
      const isOpen = submenu.classList.contains('submenu-open');
      
      if (isOpen) {
        this.closeSubmenu(toggle, submenu);
      } else {
        this.openSubmenu(toggle, submenu);
      }
    },

    openSubmenu: function(toggle, submenu) {
      submenu.classList.add('submenu-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.classList.add('submenu-expanded');
    },

    closeSubmenu: function(toggle, submenu) {
      submenu.classList.remove('submenu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('submenu-expanded');
    },

    handleResize: function() {
      const isDesktop = window.innerWidth >= 768;
      
      if (isDesktop) {
        this.closeMobileMenu();
      }
    }
  };

  // Modal functionality
  PowerUpTheme.Modal = {
    init: function() {
      this.bindEvents();
    },

    bindEvents: function() {
      document.addEventListener('click', this.handleModalClick.bind(this));
      document.addEventListener('keydown', this.handleModalKeydown.bind(this));
    },

    handleModalClick: function(e) {
      const target = e.target;
      
      if (target.closest('.modal-trigger')) {
        e.preventDefault();
        const modalId = target.closest('.modal-trigger').dataset.modal;
        this.openModal(modalId);
      }
      
      if (target.closest('.modal-close')) {
        e.preventDefault();
        this.closeModal(target.closest('.modal'));
      }
      
      if (target.classList.contains('modal-overlay')) {
        this.closeModal(target.closest('.modal'));
      }
    },

    handleModalKeydown: function(e) {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.modal-open');
        if (openModal) {
          this.closeModal(openModal);
        }
      }
    },

    openModal: function(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;
      
      modal.classList.add('modal-open');
      document.body.classList.add('modal-open');
      
      // Trap focus
      PowerUpTheme.Accessibility.trapFocus(modal);
      
      // Focus on first focusable element
      const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    },

    closeModal: function(modal) {
      if (!modal) return;
      
      modal.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
      
      // Remove focus trap
      PowerUpTheme.Accessibility.removeFocusTrap();
      
      // Return focus to trigger element
      const trigger = document.querySelector(`[data-modal="${modal.id}"]`);
      if (trigger) {
        trigger.focus();
      }
    },

    createModal: function(content, options = {}) {
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.id = options.id || 'dynamic-modal';
      
      modal.innerHTML = `
        <div class="modal-overlay">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">${options.title || ''}</h2>
              <button class="modal-close" aria-label="Close modal">×</button>
            </div>
            <div class="modal-body">
              ${content}
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      this.openModal(modal.id);
      
      return modal;
    },

    destroyModal: function(modal) {
      if (!modal) return;
      
      this.closeModal(modal);
      setTimeout(() => {
        modal.remove();
      }, 300);
    }
  };

  // Form functionality
  PowerUpTheme.Forms = {
    init: function() {
      this.bindEvents();
      this.initValidation();
    },

    bindEvents: function() {
      document.addEventListener('submit', this.handleFormSubmit.bind(this));
      document.addEventListener('input', this.handleFormInput.bind(this));
      document.addEventListener('blur', this.handleFormBlur.bind(this));
    },

    handleFormSubmit: function(e) {
      const form = e.target;
      
      if (form.classList.contains('validate-form')) {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      }
      
      if (form.classList.contains('ajax-form')) {
        e.preventDefault();
        this.submitAjaxForm(form);
      }
    },

    handleFormInput: function(e) {
      const input = e.target;
      
      if (input.classList.contains('validate-field')) {
        this.validateField(input);
      }
    },

    handleFormBlur: function(e) {
      const input = e.target;
      
      if (input.classList.contains('validate-field')) {
        this.validateField(input);
      }
    },

    initValidation: function() {
      const forms = document.querySelectorAll('.validate-form');
      forms.forEach(form => {
        form.setAttribute('novalidate', 'true');
      });
    },

    validateForm: function(form) {
      const fields = form.querySelectorAll('.validate-field');
      let isValid = true;
      
      fields.forEach(field => {
        if (!this.validateField(field)) {
          isValid = false;
        }
      });
      
      return isValid;
    },

    validateField: function(field) {
      const value = field.value.trim();
      const type = field.type;
      const required = field.hasAttribute('required');
      
      // Clear previous errors
      this.clearFieldError(field);
      
      // Check if required field is empty
      if (required && !value) {
        this.showFieldError(field, 'This field is required');
        return false;
      }
      
      // Skip validation if field is empty and not required
      if (!value && !required) {
        return true;
      }
      
      // Email validation
      if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          this.showFieldError(field, 'Please enter a valid email address');
          return false;
        }
      }
      
      // Password validation
      if (type === 'password') {
        const minLength = field.getAttribute('minlength') || 8;
        if (value.length < minLength) {
          this.showFieldError(field, `Password must be at least ${minLength} characters long`);
          return false;
        }
      }
      
      // Phone validation
      if (field.name === 'phone' || field.type === 'tel') {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\D/g, ''))) {
          this.showFieldError(field, 'Please enter a valid phone number');
          return false;
        }
      }
      
      // Custom validation patterns
      const pattern = field.getAttribute('pattern');
      if (pattern) {
        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
          const errorMessage = field.getAttribute('data-error-message') || 'Please enter a valid value';
          this.showFieldError(field, errorMessage);
          return false;
        }
      }
      
      return true;
    },

    showFieldError: function(field, message) {
      field.classList.add('error');
      
      let errorElement = field.parentNode.querySelector('.field-error');
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        field.parentNode.appendChild(errorElement);
      }
      
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    },

    clearFieldError: function(field) {
      field.classList.remove('error');
      
      const errorElement = field.parentNode.querySelector('.field-error');
      if (errorElement) {
        errorElement.style.display = 'none';
      }
    },

    submitAjaxForm: function(form) {
      const formData = new FormData(form);
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      
      // Set loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';
      
      // Clear previous messages
      this.clearFormMessages(form);
      
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          this.showFormSuccess(form, data.message || 'Form submitted successfully');
          form.reset();
        } else {
          this.showFormError(form, data.message || 'There was an error submitting the form');
        }
      })
      .catch(error => {
        console.error('Form submission error:', error);
        this.showFormError(form, 'There was an error submitting the form. Please try again.');
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      });
    },

    showFormSuccess: function(form, message) {
      const successElement = document.createElement('div');
      successElement.className = 'form-success';
      successElement.textContent = message;
      
      form.parentNode.insertBefore(successElement, form);
      
      setTimeout(() => {
        successElement.remove();
      }, 5000);
    },

    showFormError: function(form, message) {
      const errorElement = document.createElement('div');
      errorElement.className = 'form-error';
      errorElement.textContent = message;
      
      form.parentNode.insertBefore(errorElement, form);
      
      setTimeout(() => {
        errorElement.remove();
      }, 5000);
    },

    clearFormMessages: function(form) {
      const messages = form.parentNode.querySelectorAll('.form-success, .form-error');
      messages.forEach(message => message.remove());
    }
  };

  // Lazy loading functionality
  PowerUpTheme.LazyLoad = {
    init: function() {
      this.images = document.querySelectorAll('img[data-src]');
      this.observer = null;
      
      if ('IntersectionObserver' in window) {
        this.initIntersectionObserver();
      } else {
        this.loadAllImages();
      }
    },

    initIntersectionObserver: function() {
      const options = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      };
      
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      }, options);
      
      this.images.forEach(img => {
        this.observer.observe(img);
      });
    },

    loadImage: function(img) {
      const src = img.dataset.src;
      const srcset = img.dataset.srcset;
      
      if (srcset) {
        img.srcset = srcset;
      }
      
      if (src) {
        img.src = src;
      }
      
      img.classList.add('lazy-loaded');
      
      // Remove data attributes
      img.removeAttribute('data-src');
      img.removeAttribute('data-srcset');
    },

    loadAllImages: function() {
      this.images.forEach(img => {
        this.loadImage(img);
      });
    },

    checkImages: function() {
      if (this.observer) return;
      
      // Fallback for browsers without IntersectionObserver
      this.images.forEach(img => {
        if (this.isInViewport(img)) {
          this.loadImage(img);
        }
      });
    },

    isInViewport: function(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  };

  // Accessibility functionality
  PowerUpTheme.Accessibility = {
    init: function() {
      this.initSkipLinks();
      this.initFocusManagement();
      this.initAriaLabels();
    },

    initSkipLinks: function() {
      const skipLinks = document.querySelectorAll('.skip-link');
      skipLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          const target = document.getElementById(targetId);
          if (target) {
            target.focus();
            target.scrollIntoView();
          }
        });
      });
    },

    initFocusManagement: function() {
      // Add focus-visible polyfill behavior
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-navigation');
        }
      });
      
      document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
      });
    },

    initAriaLabels: function() {
      // Add aria-labels to buttons without text content
      const buttons = document.querySelectorAll('button:not([aria-label])');
      buttons.forEach(button => {
        const text = button.textContent.trim();
        if (!text) {
          const icon = button.querySelector('svg, .icon');
          if (icon) {
            button.setAttribute('aria-label', 'Button');
          }
        }
      });
    },

    trapFocus: function(element) {
      const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
      });
      
      // Store the element for cleanup
      this.focusTrappedElement = element;
    },

    removeFocusTrap: function() {
      if (this.focusTrappedElement) {
        // Remove event listeners would require storing references
        // For now, we just clear the reference
        this.focusTrappedElement = null;
      }
    }
  };

  // Animation functionality
  PowerUpTheme.Animation = {
    init: function() {
      this.initScrollAnimations();
      this.initHoverEffects();
    },

    initScrollAnimations: function() {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animated');
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
          observer.observe(element);
        });
      } else {
        // Fallback for browsers without IntersectionObserver
        animatedElements.forEach(element => {
          element.classList.add('animated');
        });
      }
    },

    initHoverEffects: function() {
      const hoverElements = document.querySelectorAll('.hover-effect');
      
      hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          element.classList.add('hovered');
        });
        
        element.addEventListener('mouseleave', () => {
          element.classList.remove('hovered');
        });
      });
    },

    initPageTransitions: function() {
      // Add page transition classes
      document.body.classList.add('page-transition');
      
      // Handle internal link clicks for smooth transitions
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.hostname === window.location.hostname && !link.hasAttribute('target')) {
          const href = link.getAttribute('href');
          if (href && href !== '#' && !href.startsWith('#')) {
            e.preventDefault();
            this.navigateWithTransition(href);
          }
        }
      });
    },

    navigateWithTransition: function(url) {
      document.body.classList.add('page-transitioning');
      
      setTimeout(() => {
        window.location.href = url;
      }, 300);
    }
  };

  // Performance optimization
  PowerUpTheme.Performance = {
    init: function() {
      this.preloadCriticalImages();
      this.optimizeImages();
      this.deferNonCriticalCSS();
    },

    preloadCriticalImages: function() {
      const criticalImages = document.querySelectorAll('img[data-preload]');
      
      criticalImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src || img.dataset.src;
        document.head.appendChild(link);
      });
    },

    optimizeImages: function() {
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        // Add loading attribute if not present
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        
        // Add decode attribute for better performance
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      });
    },

    deferNonCriticalCSS: function() {
      const deferredCSS = document.querySelectorAll('link[rel="stylesheet"][data-defer]');
      
      deferredCSS.forEach(link => {
        link.setAttribute('media', 'print');
        link.setAttribute('onload', "this.media='all'");
      });
    }
  };

  // Social sharing functionality
  PowerUpTheme.Social = {
    init: function() {
      this.bindEvents();
    },

    bindEvents: function() {
      document.addEventListener('click', this.handleSocialClick.bind(this));
    },

    handleSocialClick: function(e) {
      const target = e.target;
      const socialButton = target.closest('.social-share');
      
      if (socialButton) {
        e.preventDefault();
        this.shareContent(socialButton);
      }
    },

    shareContent: function(button) {
      const platform = button.dataset.platform;
      const url = button.dataset.url || window.location.href;
      const title = button.dataset.title || document.title;
      const text = button.dataset.text || '';
      
      let shareUrl = '';
      
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
          break;
        case 'pinterest':
          const image = button.dataset.image || '';
          shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(title)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
          break;
        case 'email':
          shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
          break;
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
          break;
      }
      
      if (shareUrl) {
        if (platform === 'email') {
          window.location.href = shareUrl;
        } else {
          this.openShareWindow(shareUrl);
        }
      }
    },

    openShareWindow: function(url) {
      const width = 600;
      const height = 400;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;
      
      window.open(
        url,
        'share-window',
        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
      );
    }
  };

  // Newsletter functionality
  PowerUpTheme.Newsletter = {
    init: function() {
      this.bindEvents();
    },

    bindEvents: function() {
      document.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
    },

    handleNewsletterSubmit: function(e) {
      const form = e.target;
      
      if (form.classList.contains('newsletter-form')) {
        e.preventDefault();
        this.submitNewsletter(form);
      }
    },

    submitNewsletter: function(form) {
      const email = form.querySelector('input[type="email"]').value;
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      
      // Basic email validation
      if (!this.isValidEmail(email)) {
        this.showNewsletterError(form, 'Please enter a valid email address');
        return;
      }
      
      // Set loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Subscribing...';
      
      // Clear previous messages
      this.clearNewsletterMessages(form);
      
      const formData = new FormData(form);
      
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.showNewsletterSuccess(form, 'Thank you for subscribing!');
          form.reset();
        } else {
          this.showNewsletterError(form, data.message || 'There was an error subscribing. Please try again.');
        }
      })
      .catch(error => {
        console.error('Newsletter subscription error:', error);
        this.showNewsletterError(form, 'There was an error subscribing. Please try again.');
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      });
    },

    isValidEmail: function(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    showNewsletterSuccess: function(form, message) {
      const successElement = document.createElement('div');
      successElement.className = 'newsletter-success';
      successElement.textContent = message;
      
      form.parentNode.insertBefore(successElement, form.nextSibling);
      
      setTimeout(() => {
        successElement.remove();
      }, 5000);
    },

    showNewsletterError: function(form, message) {
      const errorElement = document.createElement('div');
      errorElement.className = 'newsletter-error';
      errorElement.textContent = message;
      
      form.parentNode.insertBefore(errorElement, form.nextSibling);
      
      setTimeout(() => {
        errorElement.remove();
      }, 5000);
    },

    clearNewsletterMessages: function(form) {
      const messages = form.parentNode.querySelectorAll('.newsletter-success, .newsletter-error');
      messages.forEach(message => message.remove());
    }
  };

  // Product filtering functionality
  PowerUpTheme.Filters = {
    init: function() {
      this.bindEvents();
      this.initFilters();
    },

    bindEvents: function() {
      document.addEventListener('change', this.handleFilterChange.bind(this));
      document.addEventListener('click', this.handleFilterClick.bind(this));
    },

    handleFilterChange: function(e) {
      const target = e.target;
      
      if (target.classList.contains('filter-option')) {
        this.updateFilters();
      }
      
      if (target.classList.contains('sort-option')) {
        this.updateSort(target);
      }
    },

    handleFilterClick: function(e) {
      const target = e.target;
      
      if (target.closest('.filter-clear')) {
        e.preventDefault();
        this.clearFilters();
      }
      
      if (target.closest('.filter-toggle')) {
        e.preventDefault();
        this.toggleFilters();
      }
    },

    initFilters: function() {
      const filterForm = document.querySelector('.filter-form');
      if (!filterForm) return;
      
      this.updateFilterCounts();
    },

    updateFilters: function() {
      const filterForm = document.querySelector('.filter-form');
      if (!filterForm) return;
      
      const formData = new FormData(filterForm);
      const params = new URLSearchParams(formData);
      
      // Update URL
      const url = new URL(window.location);
      url.search = params.toString();
      window.history.pushState({}, '', url);
      
      // Update products
      this.loadFilteredProducts(params);
    },

    updateSort: function(sortSelect) {
      const sortValue = sortSelect.value;
      
      // Update URL
      PowerUpTheme.Utils.updateUrlParameter('sort_by', sortValue);
      
      // Update products
      this.loadFilteredProducts();
    },

    loadFilteredProducts: function(params) {
      const productGrid = document.querySelector('.product-grid');
      if (!productGrid) return;
      
      // Show loading state
      productGrid.classList.add('loading');
      
      const url = new URL(window.location);
      if (params) {
        url.search = params.toString();
      }
      
      fetch(url.toString())
        .then(response => response.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const newProductGrid = doc.querySelector('.product-grid');
          
          if (newProductGrid) {
            productGrid.innerHTML = newProductGrid.innerHTML;
          }
          
          // Update filter counts
          this.updateFilterCounts();
          
          // Reinitialize lazy loading for new images
          PowerUpTheme.LazyLoad.init();
        })
        .catch(error => {
          console.error('Filter error:', error);
        })
        .finally(() => {
          productGrid.classList.remove('loading');
        });
    },

    updateFilterCounts: function() {
      const filterOptions = document.querySelectorAll('.filter-option');
      
      filterOptions.forEach(option => {
        const count = option.dataset.count;
        const label = option.nextElementSibling;
        
        if (count && label) {
          label.innerHTML = `${label.textContent.split('(')[0]} (${count})`;
        }
      });
    },

    clearFilters: function() {
      const filterForm = document.querySelector('.filter-form');
      if (!filterForm) return;
      
      // Reset form
      filterForm.reset();
      
      // Update URL
      const url = new URL(window.location);
      url.search = '';
      window.history.pushState({}, '', url);
      
      // Update products
      this.loadFilteredProducts();
    },

    toggleFilters: function() {
      const filterSidebar = document.querySelector('.filter-sidebar');
      if (!filterSidebar) return;
      
      filterSidebar.classList.toggle('filters-open');
      document.body.classList.toggle('filters-open');
    }
  };

  // Cookie consent functionality
  PowerUpTheme.CookieConsent = {
    init: function() {
      this.checkConsent();
      this.bindEvents();
    },

    bindEvents: function() {
      document.addEventListener('click', this.handleConsentClick.bind(this));
    },

    handleConsentClick: function(e) {
      const target = e.target;
      
      if (target.closest('.cookie-accept')) {
        e.preventDefault();
        this.acceptCookies();
      }
      
      if (target.closest('.cookie-decline')) {
        e.preventDefault();
        this.declineCookies();
      }
    },

    checkConsent: function() {
      const consent = PowerUpTheme.Utils.getCookie('cookie_consent');
      
      if (!consent) {
        this.showConsentBanner();
      }
    },

    showConsentBanner: function() {
      const banner = document.createElement('div');
      banner.className = 'cookie-consent-banner';
      banner.innerHTML = `
        <div class="cookie-consent-content">
          <div class="cookie-consent-text">
            <p>We use cookies to enhance your browsing experience and analyze our traffic. By continuing to use our site, you consent to our use of cookies.</p>
          </div>
          <div class="cookie-consent-actions">
            <button class="cookie-accept btn btn-primary">Accept</button>
            <button class="cookie-decline btn btn-secondary">Decline</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(banner);
      
      // Show banner with animation
      setTimeout(() => {
        banner.classList.add('show');
      }, 100);
    },

    acceptCookies: function() {
      PowerUpTheme.Utils.setCookie('cookie_consent', 'accepted', 365);
      this.hideConsentBanner();
      
      // Enable analytics and other cookies
      this.enableAnalytics();
    },

    declineCookies: function() {
      PowerUpTheme.Utils.setCookie('cookie_consent', 'declined', 365);
      this.hideConsentBanner();
      
      // Disable non-essential cookies
      this.disableAnalytics();
    },

    hideConsentBanner: function() {
      const banner = document.querySelector('.cookie-consent-banner');
      if (banner) {
        banner.classList.remove('show');
        setTimeout(() => {
          banner.remove();
        }, 300);
      }
    },

    enableAnalytics: function() {
      // Enable Google Analytics or other tracking
      // This would depend on your specific analytics setup
      console.log('Analytics enabled');
    },

    disableAnalytics: function() {
      // Disable Google Analytics or other tracking
      // This would depend on your specific analytics setup
      console.log('Analytics disabled');
    }
  };

  // Initialize theme
  PowerUpTheme.init();

  // Make theme available globally
  window.PowerUpTheme = PowerUpTheme;

})();