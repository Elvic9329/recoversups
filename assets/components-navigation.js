/**
 * Navigation Component - RecoverSups Theme
 * Handles mobile menu, search, and navigation interactions
 * Uses modern event delegation and Web Components patterns
 */

class NavigationManager {
  constructor() {
    this.selectors = {
      mobileMenuToggle: '[data-mobile-menu-toggle]',
      mobileMenu: '[data-mobile-menu]',
      mobileMenuOverlay: '[data-mobile-menu-overlay]',
      searchToggle: '[data-search-toggle]',
      searchForm: '[data-search-form]',
      searchInput: '[data-search-input]',
      searchResults: '[data-search-results]',
      searchOverlay: '[data-search-overlay]',
      backToTop: '[data-back-to-top]',
      bannerClose: '[data-banner-close]',
      discountCopy: '[data-discount-copy]'
    };
    
    this.state = {
      mobileMenuOpen: false,
      searchOpen: false,
      searchDebounceTimer: null
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.initBackToTop();
    this.initBanner();
  }
  
  bindEvents() {
    // Use event delegation for better performance
    document.addEventListener('click', this.handleClick.bind(this));
    document.addEventListener('keydown', this.handleKeydown.bind(this));
    
    // Search input with debouncing
    const searchInput = document.querySelector(this.selectors.searchInput);
    if (searchInput) {
      searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
    }
    
    // Scroll events for back to top
    window.addEventListener('scroll', this.debounce(this.handleScroll.bind(this), 100));
  }
  
  handleClick(event) {
    const target = event.target;
    
    // Mobile menu toggle
    if (target.matches(this.selectors.mobileMenuToggle) || target.closest(this.selectors.mobileMenuToggle)) {
      event.preventDefault();
      this.toggleMobileMenu();
      return;
    }
    
    // Search toggle
    if (target.matches(this.selectors.searchToggle) || target.closest(this.selectors.searchToggle)) {
      event.preventDefault();
      this.toggleSearch();
      return;
    }
    
    // Back to top
    if (target.matches(this.selectors.backToTop) || target.closest(this.selectors.backToTop)) {
      event.preventDefault();
      this.scrollToTop();
      return;
    }
    
    // Banner close
    if (target.matches(this.selectors.bannerClose) || target.closest(this.selectors.bannerClose)) {
      event.preventDefault();
      this.closeBanner();
      return;
    }
    
    // Discount code copy
    if (target.matches(this.selectors.discountCopy) || target.closest(this.selectors.discountCopy)) {
      event.preventDefault();
      this.copyDiscountCode(target);
      return;
    }
    
    // Close overlays when clicking outside
    if (target.matches(this.selectors.mobileMenuOverlay)) {
      this.closeMobileMenu();
    }
    
    if (target.matches(this.selectors.searchOverlay)) {
      this.closeSearch();
    }
  }
  
  handleKeydown(event) {
    // Escape key closes overlays
    if (event.key === 'Escape') {
      if (this.state.mobileMenuOpen) {
        this.closeMobileMenu();
      }
      if (this.state.searchOpen) {
        this.closeSearch();
      }
    }
    
    // Enter key for search
    if (event.key === 'Enter' && event.target.matches(this.selectors.searchInput)) {
      const form = event.target.closest(this.selectors.searchForm);
      if (form) {
        form.submit();
      }
    }
  }
  
  toggleMobileMenu() {
    if (this.state.mobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }
  
  openMobileMenu() {
    const menu = document.querySelector(this.selectors.mobileMenu);
    const overlay = document.querySelector(this.selectors.mobileMenuOverlay);
    const toggle = document.querySelector(this.selectors.mobileMenuToggle);
    
    if (menu && overlay) {
      menu.classList.add('mobile-menu--open');
      overlay.classList.add('mobile-menu-overlay--visible');
      toggle?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      this.state.mobileMenuOpen = true;
      
      // Focus first menu item for accessibility
      const firstMenuItem = menu.querySelector('a, button');
      firstMenuItem?.focus();
    }
  }
  
  closeMobileMenu() {
    const menu = document.querySelector(this.selectors.mobileMenu);
    const overlay = document.querySelector(this.selectors.mobileMenuOverlay);
    const toggle = document.querySelector(this.selectors.mobileMenuToggle);
    
    if (menu && overlay) {
      menu.classList.remove('mobile-menu--open');
      overlay.classList.remove('mobile-menu-overlay--visible');
      toggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      this.state.mobileMenuOpen = false;
      
      // Return focus to toggle button
      toggle?.focus();
    }
  }
  
  toggleSearch() {
    if (this.state.searchOpen) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }
  
  openSearch() {
    const searchForm = document.querySelector(this.selectors.searchForm);
    const searchInput = document.querySelector(this.selectors.searchInput);
    const searchOverlay = document.querySelector(this.selectors.searchOverlay);
    
    if (searchForm && searchInput) {
      searchForm.classList.add('search-form--open');
      searchOverlay?.classList.add('search-overlay--visible');
      this.state.searchOpen = true;
      
      // Focus search input
      setTimeout(() => searchInput.focus(), 100);
    }
  }
  
  closeSearch() {
    const searchForm = document.querySelector(this.selectors.searchForm);
    const searchOverlay = document.querySelector(this.selectors.searchOverlay);
    const searchResults = document.querySelector(this.selectors.searchResults);
    
    if (searchForm) {
      searchForm.classList.remove('search-form--open');
      searchOverlay?.classList.remove('search-overlay--visible');
      searchResults?.classList.remove('search-results--visible');
      this.state.searchOpen = false;
    }
  }
  
  handleSearch(event) {
    const query = event.target.value.trim();
    const resultsContainer = document.querySelector(this.selectors.searchResults);
    
    if (!resultsContainer) return;
    
    if (query.length < 2) {
      resultsContainer.classList.remove('search-results--visible');
      return;
    }
    
    // Show loading state
    resultsContainer.innerHTML = '<div class="search-results__loading">Searching...</div>';
    resultsContainer.classList.add('search-results--visible');
    
    // Perform search using Shopify predictive search
    this.performSearch(query);
  }
  
  async performSearch(query) {
    try {
      const response = await fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=5`);
      const data = await response.json();
      this.displaySearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
      this.displaySearchError();
    }
  }
  
  displaySearchResults(data) {
    const resultsContainer = document.querySelector(this.selectors.searchResults);
    if (!resultsContainer) return;
    
    const products = data.resources?.results?.products || [];
    
    if (products.length === 0) {
      resultsContainer.innerHTML = '<div class="search-results__empty">No products found</div>';
      return;
    }
    
    const resultsHTML = products.map(product => `
      <div class="search-result">
        <a href="${product.url}" class="search-result__link">
          <div class="search-result__image">
            <img src="${product.featured_image || '/assets/placeholder.svg'}" alt="${product.title}" loading="lazy">
          </div>
          <div class="search-result__info">
            <h3 class="search-result__title">${product.title}</h3>
            <p class="search-result__price">${this.formatPrice(product.price)}</p>
          </div>
        </a>
      </div>
    `).join('');
    
    resultsContainer.innerHTML = resultsHTML;
  }
  
  displaySearchError() {
    const resultsContainer = document.querySelector(this.selectors.searchResults);
    if (resultsContainer) {
      resultsContainer.innerHTML = '<div class="search-results__error">Search temporarily unavailable</div>';
    }
  }
  
  initBackToTop() {
    const backToTopBtn = document.querySelector(this.selectors.backToTop);
    if (backToTopBtn) {
      // Initially hidden
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
    }
  }
  
  handleScroll() {
    const backToTopBtn = document.querySelector(this.selectors.backToTop);
    if (!backToTopBtn) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
    }
  }
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Utility functions
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
  
  formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price / 100);
  }
  
  // Banner functionality
  initBanner() {
    // Check if banner was previously closed
    const bannerClosed = localStorage.getItem('banner-closed');
    const banner = document.getElementById('promotional-banner');
    
    if (bannerClosed === 'true' && banner) {
      banner.style.display = 'none';
    }
  }
  
  closeBanner() {
    const banner = document.getElementById('promotional-banner');
    if (banner) {
      banner.style.display = 'none';
      localStorage.setItem('banner-closed', 'true');
    }
  }
  
  async copyDiscountCode(element) {
    const code = element.getAttribute('data-discount-copy');
    if (!code) return;
    
    try {
      await navigator.clipboard.writeText(code);
      
      // Show success feedback
      const originalText = element.textContent;
      element.textContent = 'Copied!';
      element.style.background = 'var(--color-success)';
      element.style.color = 'white';
      
      setTimeout(() => {
        element.textContent = originalText;
        element.style.background = '';
        element.style.color = '';
      }, 2000);
    } catch (error) {
      console.error('Failed to copy discount code:', error);
      
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      // Show feedback
      const originalText = element.textContent;
      element.textContent = 'Copied!';
      setTimeout(() => {
        element.textContent = originalText;
      }, 2000);
    }
  }
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new NavigationManager());
} else {
  new NavigationManager();
}

// Export for potential use in other modules
window.NavigationManager = NavigationManager;