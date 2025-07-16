/**
 * Header Component JavaScript
 * Enhanced interactions, sticky behavior, and performance optimizations
 */

(function() {
  'use strict';

  // DOM elements
  let header = null;
  let mobileNav = null;
  let mobileOverlay = null;
  let searchOverlay = null;
  let searchInput = null;
  let searchResults = null;
  let banner = null;
  let lastScrollY = 0;
  let isScrolling = false;
  let searchTimeout = null;
  let focusableElements = [];
  let lastFocusedElement = null;

  // Initialize header functionality
  function init() {
    // Get DOM elements
    header = document.querySelector('.header-section');
    mobileNav = document.getElementById('mobile-nav');
    mobileOverlay = document.getElementById('mobile-overlay');
    searchOverlay = document.getElementById('search-overlay');
    searchInput = document.getElementById('search-input');
    searchResults = document.getElementById('search-results');
    banner = document.getElementById('promotional-banner');

    if (!header) return;

    // Setup sticky header
    setupStickyHeader();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup search functionality
    setupSearch();
    
    // Setup banner functionality
    setupBanner();
    
    // Setup keyboard navigation
    setupKeyboardNavigation();
    
    // Setup intersection observer for performance
    setupIntersectionObserver();
    
    // Setup resize listener
    setupResizeListener();
    
    console.log('Header initialized successfully');
  }

  // Sticky header functionality
  function setupStickyHeader() {
    if (!header) return;

    // Throttled scroll handler
    function handleScroll() {
      if (!isScrolling) {
        requestAnimationFrame(updateStickyHeader);
        isScrolling = true;
      }
    }

    function updateStickyHeader() {
      const currentScrollY = window.scrollY;
      const headerHeight = header.offsetHeight;

      // Add/remove scrolled class
      if (currentScrollY > headerHeight) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Hide/show header on scroll (optional - can be enabled)
      if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      }

      lastScrollY = currentScrollY;
      isScrolling = false;
    }

    // Add scroll listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // Mobile menu functionality
  function setupMobileMenu() {
    if (!mobileNav || !mobileOverlay) return;

    // Get focusable elements in mobile menu
    function getFocusableElements() {
      return mobileNav.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
    }

    // Trap focus within mobile menu
    function trapFocus(event) {
      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.key === 'Tab') {
        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    }

    // Open mobile menu
    window.toggleMobileMenu = function() {
      if (mobileNav.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    };

    function openMobileMenu() {
      // Store current focused element
      lastFocusedElement = document.activeElement;
      
      // Show menu
      mobileNav.classList.add('open');
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      
      // Set focus to first focusable element
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
      
      // Add focus trap
      mobileNav.addEventListener('keydown', trapFocus);
      
      // Announce to screen readers
      announceToScreenReader('Mobile menu opened');
    }

    // Close mobile menu
    window.closeMobileMenu = function() {
      mobileNav.classList.remove('open');
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
      
      // Remove focus trap
      mobileNav.removeEventListener('keydown', trapFocus);
      
      // Restore focus
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
      
      // Announce to screen readers
      announceToScreenReader('Mobile menu closed');
    };

    // Close on overlay click
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Search functionality
  function setupSearch() {
    if (!searchInput || !searchResults) return;

    // Open search
    window.openSearch = function() {
      if (!searchOverlay) return;
      
      // Store current focused element
      lastFocusedElement = document.activeElement;
      
      // Show search overlay
      searchOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      
      // Focus search input
      setTimeout(() => {
        searchInput.focus();
      }, 100);
      
      // Announce to screen readers
      announceToScreenReader('Search opened');
    };

    // Close search
    window.closeSearch = function() {
      if (!searchOverlay) return;
      
      searchOverlay.classList.remove('open');
      document.body.style.overflow = '';
      
      // Clear search results
      searchResults.innerHTML = '';
      searchInput.value = '';
      
      // Restore focus
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
      
      // Announce to screen readers
      announceToScreenReader('Search closed');
    };

    // Enhanced predictive search
    searchInput.addEventListener('input', function(e) {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length >= 2) {
        searchTimeout = setTimeout(() => {
          performSearch(query);
        }, 300);
      } else {
        searchResults.innerHTML = '';
      }
    });

    // Search form submission
    const searchForm = searchInput.closest('form');
    if (searchForm) {
      searchForm.addEventListener('submit', function(e) {
        const query = searchInput.value.trim();
        if (query.length < 2) {
          e.preventDefault();
          announceToScreenReader('Please enter at least 2 characters to search');
        }
      });
    }

    // Keyboard navigation in search results
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const firstResult = searchResults.querySelector('.search-result');
        if (firstResult) {
          firstResult.focus();
        }
      }
    });
  }

  // Enhanced search function
  function performSearch(query) {
    // Show loading state
    searchResults.innerHTML = '<div class="search-loading">Searching...</div>';
    
    // Perform search
    fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=6`)
      .then(response => response.json())
      .then(data => {
        displaySearchResults(data.resources.results.products || []);
      })
      .catch(error => {
        console.error('Search error:', error);
        searchResults.innerHTML = '<div class="search-error">Search temporarily unavailable</div>';
      });
  }

  // Display search results
  function displaySearchResults(products) {
    if (!products || products.length === 0) {
      searchResults.innerHTML = '<div class="search-empty">No products found</div>';
      return;
    }
    
    let html = '';
    products.forEach((product, index) => {
      const price = product.price ? `$${(product.price / 100).toFixed(2)}` : '';
      const image = product.featured_image ? product.featured_image.url : '';
      
      html += `
        <a href="${product.url}" class="search-result" tabindex="0" data-index="${index}">
          ${image ? `<img src="${image}" alt="${product.title}" class="search-result-image" loading="lazy">` : ''}
          <div class="search-result-info">
            <h3 class="search-result-title">${product.title}</h3>
            ${price ? `<div class="search-result-price">${price}</div>` : ''}
          </div>
        </a>
      `;
    });
    
    searchResults.innerHTML = html;
    
    // Add keyboard navigation to results
    const results = searchResults.querySelectorAll('.search-result');
    results.forEach((result, index) => {
      result.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextResult = results[index + 1];
          if (nextResult) {
            nextResult.focus();
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (index === 0) {
            searchInput.focus();
          } else {
            const prevResult = results[index - 1];
            if (prevResult) {
              prevResult.focus();
            }
          }
        }
      });
    });
  }

  // Banner functionality
  function setupBanner() {
    if (!banner) return;

    // Check if banner was previously closed
    const bannerClosed = localStorage.getItem('banner-closed');
    if (bannerClosed === 'true') {
      banner.style.display = 'none';
      return;
    }

    // Close banner function
    window.closeBanner = function() {
      banner.style.display = 'none';
      localStorage.setItem('banner-closed', 'true');
      announceToScreenReader('Banner closed');
    };

    // Copy discount code function
    window.copyDiscountCode = function(code) {
      navigator.clipboard.writeText(code).then(() => {
        const discountElement = event.target;
        const originalText = discountElement.textContent;
        discountElement.textContent = 'Copied!';
        
        setTimeout(() => {
          discountElement.textContent = originalText;
        }, 2000);
        
        announceToScreenReader(`Discount code ${code} copied to clipboard`);
      }).catch(err => {
        console.error('Failed to copy discount code:', err);
        announceToScreenReader('Failed to copy discount code');
      });
    };
  }

  // Keyboard navigation setup
  function setupKeyboardNavigation() {
    // Global keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      // Escape key closes overlays
      if (e.key === 'Escape') {
        closeMobileMenu();
        closeSearch();
      }
      
      // Ctrl/Cmd + K opens search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    });

    // Improve focus visibility
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', function() {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  // Intersection Observer for performance
  function setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    });

    // Observe header for animations
    if (header) {
      observer.observe(header);
    }
  }

  // Resize listener for responsive behavior
  function setupResizeListener() {
    let resizeTimeout;
    
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth >= 1024) {
          closeMobileMenu();
        }
      }, 100);
    });
  }

  // Cart functionality
  window.openCart = function() {
    // This would integrate with your cart drawer implementation
    // For now, redirect to cart page
    window.location.href = '/cart';
  };

  // Utility function to announce to screen readers
  function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // Performance optimization: Debounce function
  function debounce(func, wait) {
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

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Handle page visibility changes for performance
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      // Page is hidden, pause animations
      header?.classList.add('paused');
    } else {
      // Page is visible, resume animations
      header?.classList.remove('paused');
    }
  });

  // Export functions for testing
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      init,
      toggleMobileMenu,
      closeMobileMenu,
      openSearch,
      closeSearch,
      closeBanner,
      copyDiscountCode,
      openCart
    };
  }

})();