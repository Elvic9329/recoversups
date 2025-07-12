/**
 * Navigation Module - RecoverSups Theme
 * Responsive navigation with accessibility support
 * @version 2.0.0
 */

export class NavigationModule {
  constructor(config = {}) {
    this.config = {
      mobileBreakpoint: 768,
      headerSelector: '.header',
      navSelector: '.header__nav',
      toggleSelector: '[data-nav-toggle]',
      dropdownSelector: '.nav__dropdown',
      searchToggleSelector: '[data-search-toggle]',
      searchFormSelector: '.search-form',
      debounceTime: 300,
      ...config
    };
    
    this.isOpen = false;
    this.activeDropdown = null;
    this.isMobile = window.innerWidth < this.config.mobileBreakpoint;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setupDropdowns();
    this.setupSearch();
    this.setupMobileDetection();
  }
  
  bindEvents() {
    // Mobile menu toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches(this.config.toggleSelector)) {
        e.preventDefault();
        this.toggleMobileMenu();
      }
    });
    
    // Dropdown toggles
    document.addEventListener('click', (e) => {
      const dropdownToggle = e.target.closest('[data-dropdown-toggle]');
      if (dropdownToggle) {
        e.preventDefault();
        this.toggleDropdown(dropdownToggle);
      }
    });
    
    // Search toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches(this.config.searchToggleSelector)) {
        e.preventDefault();
        this.toggleSearch();
      }
    });
    
    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest(this.config.dropdownSelector) && 
          !e.target.matches('[data-dropdown-toggle]')) {
        this.closeAllDropdowns();
      }
    });
    
    // ESC key handling
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllDropdowns();
        if (this.isOpen) {
          this.closeMobileMenu();
        }
      }
    });
    
    // Resize handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, this.config.debounceTime);
    });
  }
  
  setupDropdowns() {
    const dropdowns = document.querySelectorAll(this.config.dropdownSelector);
    
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('[data-dropdown-toggle]');
      const menu = dropdown.querySelector('[data-dropdown-menu]');
      
      if (!toggle || !menu) return;
      
      // Accessibility attributes
      const menuId = `dropdown-${Math.random().toString(36).substr(2, 9)}`;
      menu.id = menuId;
      toggle.setAttribute('aria-controls', menuId);
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-haspopup', 'true');
      
      // Hover events for desktop
      if (!this.isMobile) {
        dropdown.addEventListener('mouseenter', () => {
          this.openDropdown(dropdown);
        });
        
        dropdown.addEventListener('mouseleave', () => {
          setTimeout(() => {
            if (!dropdown.matches(':hover')) {
              this.closeDropdown(dropdown);
            }
          }, 100);
        });
      }
      
      // Keyboard navigation
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleDropdown(toggle);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.openDropdown(dropdown);
          this.focusFirstMenuItem(menu);
        }
      });
      
      // Menu item keyboard navigation
      const menuItems = menu.querySelectorAll('a, button');
      menuItems.forEach((item, index) => {
        item.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextItem = menuItems[index + 1] || menuItems[0];
            nextItem.focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevItem = menuItems[index - 1] || menuItems[menuItems.length - 1];
            prevItem.focus();
          } else if (e.key === 'Escape') {
            e.preventDefault();
            this.closeDropdown(dropdown);
            toggle.focus();
          }
        });
      });
    });
  }
  
  setupSearch() {
    const searchForm = document.querySelector(this.config.searchFormSelector);
    if (!searchForm) return;
    
    const searchInput = searchForm.querySelector('input[type="search"]');
    if (!searchInput) return;
    
    // Search input enhancements
    searchInput.addEventListener('input', this.debounce((e) => {
      const query = e.target.value.trim();
      if (query.length >= 2) {
        this.handleSearchSuggestions(query);
      }
    }, this.config.debounceTime));
    
    // Clear search
    const clearButton = searchForm.querySelector('[data-search-clear]');
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        this.clearSearchSuggestions();
      });
    }
  }
  
  setupMobileDetection() {
    // Update mobile state on resize
    window.addEventListener('resize', this.debounce(() => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth < this.config.mobileBreakpoint;
      
      if (wasMobile !== this.isMobile) {
        this.handleMobileStateChange();
      }
    }, this.config.debounceTime));
  }
  
  toggleMobileMenu() {
    if (this.isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }
  
  openMobileMenu() {
    const nav = document.querySelector(this.config.navSelector);
    const toggle = document.querySelector(this.config.toggleSelector);
    
    if (!nav || !toggle) return;
    
    this.isOpen = true;
    nav.classList.add('is-open');
    toggle.classList.add('is-active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
    
    // Focus management
    const firstLink = nav.querySelector('a, button');
    if (firstLink) {
      firstLink.focus();
    }
    
    // Dispatch event
    document.dispatchEvent(new CustomEvent('navigation:opened'));
  }
  
  closeMobileMenu() {
    const nav = document.querySelector(this.config.navSelector);
    const toggle = document.querySelector(this.config.toggleSelector);
    
    if (!nav || !toggle) return;
    
    this.isOpen = false;
    nav.classList.remove('is-open');
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    
    // Close any open dropdowns
    this.closeAllDropdowns();
    
    // Dispatch event
    document.dispatchEvent(new CustomEvent('navigation:closed'));
  }
  
  toggleDropdown(toggle) {
    const dropdown = toggle.closest(this.config.dropdownSelector);
    if (!dropdown) return;
    
    const isOpen = dropdown.classList.contains('is-open');
    
    // Close other dropdowns first
    this.closeAllDropdowns();
    
    if (!isOpen) {
      this.openDropdown(dropdown);
    }
  }
  
  openDropdown(dropdown) {
    const toggle = dropdown.querySelector('[data-dropdown-toggle]');
    const menu = dropdown.querySelector('[data-dropdown-menu]');
    
    if (!toggle || !menu) return;
    
    // Close other dropdowns
    this.closeAllDropdowns();
    
    dropdown.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    this.activeDropdown = dropdown;
    
    // Position menu if needed (for desktop)
    if (!this.isMobile) {
      this.positionDropdownMenu(dropdown);
    }
  }
  
  closeDropdown(dropdown) {
    const toggle = dropdown.querySelector('[data-dropdown-toggle]');
    
    if (!toggle) return;
    
    dropdown.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    
    if (this.activeDropdown === dropdown) {
      this.activeDropdown = null;
    }
  }
  
  closeAllDropdowns() {
    const openDropdowns = document.querySelectorAll(`${this.config.dropdownSelector}.is-open`);
    openDropdowns.forEach(dropdown => {
      this.closeDropdown(dropdown);
    });
  }
  
  positionDropdownMenu(dropdown) {
    const menu = dropdown.querySelector('[data-dropdown-menu]');
    if (!menu) return;
    
    const rect = dropdown.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    
    // Reset positioning
    menu.style.left = '';
    menu.style.right = '';
    
    // Check if menu would go off-screen
    if (rect.left + menuRect.width > viewportWidth) {
      menu.style.right = '0';
    }
  }
  
  focusFirstMenuItem(menu) {
    const firstItem = menu.querySelector('a, button');
    if (firstItem) {
      firstItem.focus();
    }
  }
  
  toggleSearch() {
    const searchForm = document.querySelector(this.config.searchFormSelector);
    if (!searchForm) return;
    
    const isOpen = searchForm.classList.contains('is-open');
    
    if (isOpen) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }
  
  openSearch() {
    const searchForm = document.querySelector(this.config.searchFormSelector);
    const searchInput = searchForm?.querySelector('input[type="search"]');
    
    if (!searchForm || !searchInput) return;
    
    searchForm.classList.add('is-open');
    searchInput.focus();
    
    // Dispatch event
    document.dispatchEvent(new CustomEvent('search:opened'));
  }
  
  closeSearch() {
    const searchForm = document.querySelector(this.config.searchFormSelector);
    if (!searchForm) return;
    
    searchForm.classList.remove('is-open');
    this.clearSearchSuggestions();
    
    // Dispatch event
    document.dispatchEvent(new CustomEvent('search:closed'));
  }
  
  async handleSearchSuggestions(query) {
    // Implement search suggestions logic here
    try {
      const response = await fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=5`);
      const data = await response.json();
      
      this.renderSearchSuggestions(data.resources.results.products);
      
    } catch (error) {
      console.error('Search suggestions error:', error);
    }
  }
  
  renderSearchSuggestions(products) {
    const searchForm = document.querySelector(this.config.searchFormSelector);
    let suggestionsContainer = searchForm?.querySelector('.search-suggestions');
    
    if (!searchForm) return;
    
    if (!suggestionsContainer) {
      suggestionsContainer = document.createElement('div');
      suggestionsContainer.className = 'search-suggestions';
      searchForm.appendChild(suggestionsContainer);
    }
    
    if (!products || products.length === 0) {
      suggestionsContainer.innerHTML = '';
      return;
    }
    
    const suggestionsHTML = products.map(product => `
      <a href="${product.url}" class="search-suggestion">
        <img src="${product.featured_image}" alt="${product.title}" class="search-suggestion__image">
        <div class="search-suggestion__content">
          <span class="search-suggestion__title">${product.title}</span>
          <span class="search-suggestion__price">${product.price}</span>
        </div>
      </a>
    `).join('');
    
    suggestionsContainer.innerHTML = suggestionsHTML;
  }
  
  clearSearchSuggestions() {
    const suggestionsContainer = document.querySelector('.search-suggestions');
    if (suggestionsContainer) {
      suggestionsContainer.innerHTML = '';
    }
  }
  
  handleResize() {
    // Close mobile menu if switching to desktop
    if (!this.isMobile && this.isOpen) {
      this.closeMobileMenu();
    }
    
    // Reposition dropdowns
    if (this.activeDropdown && !this.isMobile) {
      this.positionDropdownMenu(this.activeDropdown);
    }
  }
  
  handleMobileStateChange() {
    // Reset navigation state when switching between mobile/desktop
    this.closeMobileMenu();
    this.closeAllDropdowns();
  }
  
  // Utility function
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