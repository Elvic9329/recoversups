# Orchids App Integration - Content Review Template

## Instructions for Use

This document is designed for you to paste content from the **Orchids App** that you want to review and integrate into the RecoverSups project. After pasting the content below, Claude 3.7 will analyze it and provide recommendations for proper structuring and implementation.

## Content Analysis Framework

When you paste Orchids App content, Claude will analyze:

### 1. Code Structure Analysis
- File organization and architecture
- Design patterns and conventions
- Component structure and relationships
- Data flow and state management

### 2. Feature Compatibility
- Which features can be adapted for RecoverSups
- Necessary modifications for Shopify 2.0
- Performance implications
- Security considerations

### 3. Design System Integration
- How to adapt styling to RecoverSups design tokens
- CSS architecture compatibility
- Component naming conventions
- Responsive design patterns

### 4. Implementation Recommendations
- Step-by-step integration plan
- File creation and modification requirements
- Testing strategies
- Performance optimization opportunities

---

## PASTE ORCHIDS APP CONTENT BELOW THIS LINE

```
[PASTE YOUR ORCHIDS APP CONTENT HERE]

Example types of content you might paste:
- HTML/Liquid template code
- CSS stylesheets or components
- JavaScript functionality
- JSON configuration files
- Component documentation
- Design specifications
- Feature requirements
- User interface mockups (as text descriptions)
```

---

## Analysis Results

*This section will be populated by Claude 3.7 after you paste content above*

### Code Quality Assessment
- [ ] Code structure analysis
- [ ] Best practices compliance
- [ ] Security review
- [ ] Performance evaluation

### Integration Feasibility
- [ ] Shopify 2.0 compatibility
- [ ] RecoverSups theme alignment
- [ ] Technical requirements
- [ ] Resource implications

### Recommended Implementation Plan
1. **Phase 1**: Initial adaptation
2. **Phase 2**: Integration with existing components  
3. **Phase 3**: Testing and optimization
4. **Phase 4**: Documentation and deployment

### File Structure Recommendations

#### New Files to Create
```
sections/
├── [new-section].liquid
snippets/
├── [new-snippet].liquid
assets/
├── [new-component].css
├── [new-component].js
templates/
├── [new-template].json
```

#### Existing Files to Modify
- [ ] List of files requiring updates
- [ ] Specific changes needed
- [ ] Integration points
- [ ] Dependency updates

### Design System Adaptations

#### CSS Custom Properties Mapping
```css
/* Orchids App styles */
.original-class {
  color: #original-color;
  padding: 16px;
}

/* RecoverSups adaptation */
.rs-adapted-class {
  color: var(--rs-color-primary);
  padding: var(--rs-spacing-md);
}
```

#### Component Structure Updates
- [ ] Class naming conventions (BEM methodology)
- [ ] Design token integration
- [ ] Responsive design adaptations
- [ ] Accessibility enhancements

### JavaScript Integration

#### Module Structure
- [ ] ES6 module compatibility
- [ ] Event handling patterns
- [ ] State management integration
- [ ] Performance considerations

#### Dependencies
- [ ] External library requirements
- [ ] Shopify API integration needs
- [ ] Cart functionality integration
- [ ] Third-party service connections

### Testing Strategy

#### Functional Testing
- [ ] Component functionality
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Accessibility compliance

#### Performance Testing
- [ ] Load time impact
- [ ] Bundle size analysis
- [ ] Core Web Vitals assessment
- [ ] Shopify theme performance

#### Integration Testing
- [ ] Existing component compatibility
- [ ] Cart functionality
- [ ] Checkout process
- [ ] Admin customization features

### Implementation Timeline

#### Week 1: Analysis and Planning
- [ ] Detailed code review
- [ ] Architecture planning
- [ ] Resource allocation
- [ ] Risk assessment

#### Week 2: Core Implementation
- [ ] Basic component creation
- [ ] Initial integration
- [ ] Core functionality testing
- [ ] Design system adaptation

#### Week 3: Advanced Features
- [ ] Advanced functionality implementation
- [ ] Performance optimization
- [ ] Cross-component integration
- [ ] Responsive design refinement

#### Week 4: Testing and Deployment
- [ ] Comprehensive testing
- [ ] Bug fixes and optimizations
- [ ] Documentation completion
- [ ] Deployment preparation

### Potential Challenges and Solutions

#### Technical Challenges
1. **Challenge**: [Identified challenge]
   - **Solution**: [Proposed solution]
   - **Alternative**: [Backup approach]

2. **Challenge**: [Identified challenge]
   - **Solution**: [Proposed solution]
   - **Alternative**: [Backup approach]

#### Design Challenges
1. **Challenge**: [Design compatibility issue]
   - **Solution**: [Design adaptation strategy]
   - **Alternative**: [Alternative approach]

### Success Metrics

#### Performance Metrics
- [ ] Page load time improvement
- [ ] Core Web Vitals scores
- [ ] Bundle size optimization
- [ ] Mobile performance

#### User Experience Metrics
- [ ] Conversion rate improvement
- [ ] User engagement metrics
- [ ] Accessibility compliance scores
- [ ] Cross-device compatibility

#### Technical Metrics
- [ ] Code maintainability score
- [ ] Component reusability
- [ ] Test coverage
- [ ] Documentation completeness

---

## Next Steps After Analysis

Once Claude 3.7 completes the analysis above:

1. **Review Recommendations**: Examine the proposed implementation plan
2. **Prioritize Features**: Decide which features to implement first
3. **Resource Planning**: Allocate time and resources for implementation
4. **Begin Implementation**: Start with Phase 1 recommendations
5. **Iterative Development**: Follow the phased approach for best results

## Additional Resources

### RecoverSups Documentation References
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Complete project architecture
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Development instructions
- [SHOPIFY_ARCHITECTURE.md](./SHOPIFY_ARCHITECTURE.md) - Shopify 2.0 implementation
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Design system documentation
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues and solutions

### Integration Guidelines
1. Always maintain RecoverSups design system consistency
2. Ensure Shopify 2.0 theme architecture compliance
3. Prioritize performance and accessibility
4. Follow established coding conventions
5. Implement comprehensive testing

---

**Ready for Content**: This template is now ready for you to paste Orchids App content for analysis and integration planning.
index.liquid (homepage)
{% comment %}
  Homepage template for Shopify
  Includes all sections from the original Next.js page
{% endcomment %}

{% liquid
  assign page_title = shop.name
  assign page_description = shop.description | default: 'Premium supplements and fitness products for your health journey'
  assign canonical_url = shop.url
%}

{% comment %} Skip to main content for accessibility {% endcomment %}
<a href="#main-content" class="skip-link visually-hidden">Skip to main content</a>

{% comment %} Breadcrumb Navigation {% endcomment %}
<nav aria-label="Breadcrumb" class="breadcrumb-nav">
  <ol class="breadcrumb-list">
    <li class="breadcrumb-item">
      <a href="{{ routes.root_url }}" class="breadcrumb-link">
        <span>Home</span>
      </a>
    </li>
  </ol>
</nav>

{% comment %} Main Content Area {% endcomment %}
<main id="main-content" class="main-content" role="main">
  
  {% comment %} Hero Carousel Section {% endcomment %}
  <section id="hero-carousel" class="hero-section" aria-label="Hero Carousel">
    {% section 'hero-carousel' %}
  </section>
  
  {% comment %} Product Categories Section {% endcomment %}
  <section id="product-categories" class="categories-section" aria-label="Product Categories">
    {% section 'product-categories' %}
  </section>
  
  {% comment %} Featured Products Section {% endcomment %}
  <section id="featured-products" class="featured-section" aria-label="Featured Products">
    {% section 'featured-products' %}
  </section>
  
  {% comment %} Collection Banners Section {% endcomment %}
  <section id="collection-banners" class="banners-section" aria-label="Collection Banners">
    {% section 'collection-banners' %}
  </section>
  
  {% comment %} Trending Products Section {% endcomment %}
  <section id="trending-products" class="trending-section" aria-label="Trending Products">
    {% section 'trending-products' %}
  </section>
  
  {% comment %} Why Choose Us Section {% endcomment %}
  <section id="why-choose-us" class="features-section" aria-label="Why Choose Us">
    {% section 'why-choose-us' %}
  </section>
  
  {% comment %} Exclusive Offer Section {% endcomment %}
  <section id="exclusive-offer" class="offer-section" aria-label="Exclusive Offer">
    {% section 'exclusive-offer' %}
  </section>
  
  {% comment %} Customer Testimonials Section {% endcomment %}
  <section id="testimonials" class="testimonials-section" aria-label="Customer Testimonials">
    {% section 'testimonials' %}
  </section>
  
  {% comment %} Recent Blogs Section {% endcomment %}
  <section id="recent-blogs" class="blogs-section" aria-label="Recent Blog Posts">
    {% section 'recent-blogs' %}
  </section>
  
  {% comment %} Brand Partners Section {% endcomment %}
  <section id="brand-partners" class="partners-section" aria-label="Brand Partners">
    {% section 'brand-partners' %}
  </section>
  
</main>

{% comment %} Back to Top Button {% endcomment %}
<button id="back-to-top" class="back-to-top-btn" aria-label="Back to top" title="Back to top">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 14L12 9L17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</button>

{% comment %} Inline JavaScript for Critical Functionality {% endcomment %}
<script>
  // Critical JavaScript for immediate functionality
  document.addEventListener('DOMContentLoaded', function() {
    // Back to top button functionality
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    // Lazy loading images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  });
  
  // Performance monitoring
  window.addEventListener('load', function() {
    // Track page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    
    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_load_time', {
        'event_category': 'Performance',
        'event_label': 'Homepage',
        'value': Math.round(loadTime)
      });
    }
  });
</script>

{% comment %} Schema Markup for Homepage Products {% endcomment %}
{% if collections.featured-products.products.size > 0 %}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Featured Products",
    "description": "Featured health and fitness products",
    "numberOfItems": {{ collections.featured-products.products.size }},
    "itemListElement": [
      {% for product in collections.featured-products.products limit: 10 %}
        {
          "@type": "Product",
          "position": {{ forloop.index }},
          "name": "{{ product.title | escape }}",
          "description": "{{ product.description | strip_html | truncate: 160 | escape }}",
          "image": "{{ product.featured_image | img_url: '800x800' }}",
          "url": "{{ shop.url }}{{ product.url }}",
          "brand": {
            "@type": "Brand",
            "name": "{{ product.vendor | escape }}"
          },
          "offers": {
            "@type": "Offer",
            "price": "{{ product.price | money_without_currency }}",
            "priceCurrency": "{{ shop.currency }}",
            "availability": "{% if product.available %}https://schema.org/InStock{% else %}https://schema.org/OutOfStock{% endif %}",
            "url": "{{ shop.url }}{{ product.url }}"
          }
        }{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ]
  }
  </script>
{% endif %}

{% comment %} Error Handling for Missing Sections {% endcomment %}
<script>
  // Check if critical sections are loaded
  document.addEventListener('DOMContentLoaded', function() {
    const criticalSections = [
      'hero-carousel',
      'product-categories',
      'featured-products'
    ];
    
    criticalSections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (!section) {
        console.warn(`Critical section ${sectionId} not found`);
      }
    });
  });
</script>
(header)
{%- assign main_menu = section.settings.main_menu -%}
{%- assign mobile_menu = section.settings.mobile_menu -%}
{%- assign logo = section.settings.logo -%}

{%- liquid
  assign logo_width = section.settings.logo_width
  assign logo_height = section.settings.logo_height
  assign enable_sticky_header = section.settings.enable_sticky_header
  assign enable_search = section.settings.enable_search
  assign enable_cart_drawer = section.settings.enable_cart_drawer
  assign enable_account_links = section.settings.enable_account_links
  assign banner_enabled = section.settings.banner_enabled
  assign banner_text = section.settings.banner_text
  assign banner_discount_code = section.settings.banner_discount_code
-%}

{% if banner_enabled %}
<div class="banner" id="promotional-banner">
  <div class="banner-content">
    <div class="banner-text">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
      {{ banner_text | default: 'Black Friday Sale - Up to 70% Off Everything!' }}
      {% if banner_discount_code %}
        <span class="discount-code" onclick="copyDiscountCode('{{ banner_discount_code }}')">
          {{ banner_discount_code }}
        </span>
      {% endif %}
    </div>
    <button class="banner-close" onclick="closeBanner()" aria-label="Close banner">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18"/>
        <path d="M6 6l12 12"/>
      </svg>
    </button>
  </div>
</div>
{% endif %}

<header class="header-section" role="banner">
  <div class="header-main">
    <div class="header-container">
      <div class="header-logo">
        <a href="{{ routes.root_url }}" aria-label="Go to homepage">
          {% if logo %}
            <img src="{{ logo | image_url: width: logo_width }}" alt="{{ shop.name }}" loading="lazy">
          {% else %}
            <h1 class="shop-name">{{ shop.name }}</h1>
          {% endif %}
        </a>
      </div>

      <nav class="header-nav" role="navigation" aria-label="Main navigation">
        <ul class="nav-menu">
          {% for link in linklists[main_menu].links %}
            <li class="nav-item">
              <a href="{{ link.url }}" class="nav-link" {% if link.active %}aria-current="page"{% endif %}>
                {{ link.title }}
                {% if link.links.size > 0 %}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                {% endif %}
              </a>
              {% if link.links.size > 0 %}
                <div class="nav-dropdown">
                  <ul>
                    {% for child_link in link.links %}
                      <li><a href="{{ child_link.url }}" {% if child_link.active %}aria-current="page"{% endif %}>{{ child_link.title }}</a></li>
                    {% endfor %}
                  </ul>
                </div>
              {% endif %}
            </li>
          {% endfor %}
        </ul>
      </nav>

      <div class="header-actions">
        {% if enable_search %}
          <button class="header-icon" onclick="openSearch()" aria-label="Open search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        {% endif %}

        {% if enable_account_links %}
          <div class="account-dropdown">
            <button class="header-icon" aria-label="Account menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
            <div class="account-menu">
              <ul>
                {% if customer %}
                  <li><a href="{{ routes.account_url }}">My Account</a></li>
                  <li><a href="{{ routes.account_orders_url }}">Order History</a></li>
                  <li><a href="{{ routes.account_addresses_url }}">Addresses</a></li>
                  <li><a href="{{ routes.account_logout_url }}">Logout</a></li>
                {% else %}
                  <li><a href="{{ routes.account_login_url }}">Login</a></li>
                  <li><a href="{{ routes.account_register_url }}">Register</a></li>
                {% endif %}
              </ul>
            </div>
          </div>
        {% endif %}

        <button class="header-icon" onclick="openCart()" aria-label="Open cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3"/>
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
          </svg>
          {% if cart.item_count > 0 %}
            <span class="cart-count">{{ cart.item_count }}</span>
          {% endif %}
        </button>

        <button class="mobile-menu-toggle" onclick="toggleMobileMenu()" aria-label="Toggle mobile menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>

<div class="mobile-overlay" id="mobile-overlay" onclick="closeMobileMenu()"></div>
<nav class="mobile-nav" id="mobile-nav" role="navigation" aria-label="Mobile navigation">
  <div class="mobile-nav-header">
    <div class="header-logo">
      {% if logo %}
        <img src="{{ logo | image_url: width: 120 }}" alt="{{ shop.name }}" loading="lazy">
      {% else %}
        <h2 class="shop-name">{{ shop.name }}</h2>
      {% endif %}
    </div>
    <button class="mobile-nav-close" onclick="closeMobileMenu()" aria-label="Close mobile menu">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18"/>
        <path d="M6 6l12 12"/>
      </svg>
    </button>
  </div>
  <div class="mobile-nav-menu">
    <ul>
      {% for link in linklists[mobile_menu].links %}
        <li>
          <a href="{{ link.url }}" {% if link.active %}aria-current="page"{% endif %}>{{ link.title }}</a>
          {% if link.links.size > 0 %}
            <ul class="mobile-nav-submenu">
              {% for child_link in link.links %}
                <li><a href="{{ child_link.url }}" {% if child_link.active %}aria-current="page"{% endif %}>{{ child_link.title }}</a></li>
              {% endfor %}
            </ul>
          {% endif %}
        </li>
      {% endfor %}
    </ul>
  </div>
</nav>

{% if enable_search %}
<div class="search-overlay" id="search-overlay" onclick="closeSearch()">
  <div class="search-container" onclick="event.stopPropagation()">
    <button class="search-close" onclick="closeSearch()" aria-label="Close search">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18"/>
        <path d="M6 6l12 12"/>
      </svg>
    </button>
    <form class="search-form" action="{{ routes.search_url }}" method="get" role="search">
      <input
        class="search-input"
        type="search"
        name="q"
        placeholder="Search products..."
        autocomplete="off"
        aria-label="Search products"
        id="search-input"
      >
      <button class="search-button" type="submit" aria-label="Submit search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </button>
    </form>
    <div class="search-results" id="search-results"></div>
  </div>
</div>
{% endif %}

<script>
  // Mobile menu functionality
  function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('mobile-overlay');
    
    mobileNav.classList.toggle('open');
    overlay.classList.toggle('open');
    
    if (mobileNav.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function closeMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('mobile-overlay');
    
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Search functionality
  function openSearch() {
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    
    searchOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      searchInput.focus();
    }, 100);
  }

  function closeSearch() {
    const searchOverlay = document.getElementById('search-overlay');
    
    searchOverlay.classList.remove('open');
    document.body.style.overflow = '';
    
    // Clear search results
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
      searchResults.innerHTML = '';
    }
  }

  // Predictive search
  let searchTimeout;
  const searchInput = document.getElementById('search-input');
  
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      const query = this.value.trim();
      
      if (query.length >= 2) {
        searchTimeout = setTimeout(() => {
          performSearch(query);
        }, 300);
      } else {
        document.getElementById('search-results').innerHTML = '';
      }
    });
  }

  function performSearch(query) {
    fetch(`{{ routes.predictive_search_url }}?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=6`)
      .then(response => response.json())
      .then(data => {
        displaySearchResults(data.resources.results.products);
      })
      .catch(error => {
        console.error('Search error:', error);
      });
  }

  function displaySearchResults(products) {
    const searchResults = document.getElementById('search-results');
    
    if (!products || products.length === 0) {
      searchResults.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">No products found.</p>';
      return;
    }
    
    let html = '';
    products.forEach(product => {
      const price = product.price ? `$${(product.price / 100).toFixed(2)}` : '';
      const image = product.featured_image ? product.featured_image.url : '';
      
      html += `
        <a href="${product.url}" class="search-result">
          ${image ? `<img src="${image}" alt="${product.title}" class="search-result-image">` : ''}
          <div class="search-result-info">
            <h3 class="search-result-title">${product.title}</h3>
            ${price ? `<div class="search-result-price">${price}</div>` : ''}
          </div>
        </a>
      `;
    });
    
    searchResults.innerHTML = html;
  }

  // Banner functionality
  function closeBanner() {
    const banner = document.getElementById('promotional-banner');
    if (banner) {
      banner.style.display = 'none';
      localStorage.setItem('banner-closed', 'true');
    }
  }

  function copyDiscountCode(code) {
    navigator.clipboard.writeText(code).then(() => {
      // Show success message
      const discountElement = event.target;
      const originalText = discountElement.textContent;
      discountElement.textContent = 'Copied!';
      
      setTimeout(() => {
        discountElement.textContent = originalText;
      }, 2000);
    });
  }

  // Cart functionality
  function openCart() {
    // This would integrate with your cart drawer implementation
    // For now, redirect to cart page
    window.location.href = '{{ routes.cart_url }}';
  }

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeSearch();
    }
  });

  // Check if banner was previously closed
  document.addEventListener('DOMContentLoaded', function() {
    const bannerClosed = localStorage.getItem('banner-closed');
    const banner = document.getElementById('promotional-banner');
    
    if (bannerClosed === 'true' && banner) {
      banner.style.display = 'none';
    }
  });
</script>

{% schema %}
{
  "name": "Header",
  "settings": [
    {
      "type": "header",
      "content": "Banner Settings"
    },
    {
      "type": "checkbox",
      "id": "banner_enabled",
      "label": "Enable promotional banner",
      "default": true
    },
    {
      "type": "text",
      "id": "banner_text",
      "label": "Banner text",
      "default": "Black Friday Sale - Up to 70% Off Everything!"
    },
    {
      "type": "text",
      "id": "banner_discount_code",
      "label": "Discount code",
      "default": "BLACKFRIDAY70"
    },
    {
      "type": "header",
      "content": "Logo Settings"
    },
    {
      "type": "image_picker",
      "id": "logo",
      "label": "Logo image"
    },
    {
      "type": "range",
      "id": "logo_width",
      "min": 50,
      "max": 300,
      "step": 10,
      "unit": "px",
      "label": "Logo width",
      "default": 150
    },
    {
      "type": "range",
      "id": "logo_height",
      "min": 20,
      "max": 100,
      "step": 5,
      "unit": "px",
      "label": "Logo height",
      "default": 50
    },
    {
      "type": "header",
      "content": "Navigation Settings"
    },
    {
      "type": "link_list",
      "id": "main_menu",
      "label": "Main navigation menu",
      "default": "main-menu"
    },
    {
      "type": "link_list",
      "id": "mobile_menu",
      "label": "Mobile navigation menu",
      "default": "main-menu"
    },
    {
      "type": "header",
      "content": "Features"
    },
    {
      "type": "checkbox",
      "id": "enable_sticky_header",
      "label": "Enable sticky header",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "enable_search",
      "label": "Enable search",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "enable_cart_drawer",
      "label": "Enable cart drawer",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "enable_account_links",
      "label": "Enable account links",
      "default": true
    }
  ]
}
{% endschema %}
(herocarousel)
{%- comment -%}
Hero Carousel Section for Shopify
Converts React hero carousel component to Liquid with full customization
{%- endcomment -%}

<section class="hero-carousel-section relative overflow-hidden" data-section-id="{{ section.id }}" data-section-type="hero-carousel">
  <div class="hero-carousel-container relative w-full h-screen max-h-[800px] min-h-[500px]">
    <!-- Slides Container -->
    <div class="hero-carousel-slides relative w-full h-full overflow-hidden">
      {%- for block in section.blocks -%}
        <div class="hero-slide absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out{% if forloop.first %} active{% endif %}" 
             id="slide-{{ forloop.index }}"
             data-slide-index="{{ forloop.index0 }}"
             {{ block.shopify_attributes }}>
          
          <!-- Background Image -->
          {%- if block.settings.background_image -%}
            <div class="hero-slide-bg absolute inset-0 w-full h-full">
              <img 
                src="{{ block.settings.background_image | img_url: '1920x800' }}"
                srcset="{{ block.settings.background_image | img_url: '768x400' }} 768w,
                        {{ block.settings.background_image | img_url: '1024x533' }} 1024w,
                        {{ block.settings.background_image | img_url: '1920x800' }} 1920w"
                sizes="100vw"
                alt="{{ block.settings.background_image.alt | default: block.settings.title }}"
                class="w-full h-full object-cover"
                loading="{% if forloop.first %}eager{% else %}lazy{% endif %}"
              />
            </div>
          {%- else -%}
            <div class="hero-slide-bg absolute inset-0 w-full h-full bg-gradient-to-r from-gray-900 to-gray-700"></div>
          {%- endif -%}
          
          <!-- Overlay -->
          <div class="hero-slide-overlay absolute inset-0 w-full h-full bg-black opacity-{{ block.settings.overlay_opacity }}"></div>
          
          <!-- Content -->
          <div class="hero-slide-content relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-4xl mx-auto">
              {%- if block.settings.subtitle -%}
                <p class="hero-subtitle text-sm sm:text-base lg:text-lg font-medium text-white/90 mb-4 animate-fade-in-up" 
                   style="animation-delay: 0.2s; color: {{ block.settings.subtitle_color }};">
                  {{ block.settings.subtitle }}
                </p>
              {%- endif -%}
              
              {%- if block.settings.title -%}
                <h1 class="hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-6 leading-tight animate-fade-in-up" 
                    style="animation-delay: 0.4s; color: {{ block.settings.title_color }};">
                  {{ block.settings.title }}
                </h1>
              {%- endif -%}
              
              {%- if block.settings.description -%}
                <p class="hero-description text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up" 
                   style="animation-delay: 0.6s; color: {{ block.settings.description_color }};">
                  {{ block.settings.description }}
                </p>
              {%- endif -%}
              
              {%- if block.settings.button_text and block.settings.button_link -%}
                <div class="hero-actions animate-fade-in-up" style="animation-delay: 0.8s;">
                  <a href="{{ block.settings.button_link }}" 
                     class="inline-flex items-center px-8 py-4 bg-{{ section.settings.button_color }} hover:bg-{{ section.settings.button_color }}/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                     style="background-color: {{ block.settings.button_bg_color }}; color: {{ block.settings.button_text_color }};">
                    {{ block.settings.button_text }}
                    {%- if block.settings.button_icon -%}
                      <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                    {%- endif -%}
                  </a>
                </div>
              {%- endif -%}
            </div>
          </div>
        </div>
      {%- endfor -%}
    </div>
    
    <!-- Navigation Arrows -->
    {%- if section.settings.show_arrows and section.blocks.size > 1 -%}
      <button class="hero-carousel-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300 hover:scale-110"
              aria-label="Previous slide">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <button class="hero-carousel-next absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300 hover:scale-110"
              aria-label="Next slide">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    {%- endif -%}
    
    <!-- Dot Indicators -->
    {%- if section.settings.show_dots and section.blocks.size > 1 -%}
      <div class="hero-carousel-dots absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {%- for block in section.blocks -%}
          <button class="hero-carousel-dot w-3 h-3 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-300{% if forloop.first %} active bg-white{% endif %}"
                  data-slide-index="{{ forloop.index0 }}"
                  aria-label="Go to slide {{ forloop.index }}">
          </button>
        {%- endfor -%}
      </div>
    {%- endif -%}
    
    <!-- Progress Bar -->
    {%- if section.settings.show_progress and section.settings.autoplay -%}
      <div class="hero-carousel-progress absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div class="hero-carousel-progress-bar h-full bg-white transition-all duration-100 ease-linear" style="width: 0%;"></div>
      </div>
    {%- endif -%}
  </div>
</section>

<style>
  .hero-carousel-section {
    --slide-duration: {{ section.settings.slide_duration | default: 5000 }}ms;
    --transition-duration: {{ section.settings.transition_duration | default: 700 }}ms;
  }
  
  .hero-slide {
    opacity: 0;
    transform: translateX(100%);
  }
  
  .hero-slide.active {
    opacity: 1;
    transform: translateX(0);
  }
  
  .hero-slide.prev {
    transform: translateX(-100%);
  }
  
  .hero-carousel-dot.active {
    background-color: white;
    transform: scale(1.2);
  }
  
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
    opacity: 0;
  }
  
  .hero-carousel-section:hover .hero-carousel-progress-bar {
    animation-play-state: paused;
  }
  
  @media (max-width: 768px) {
    .hero-carousel-prev,
    .hero-carousel-next {
      display: {{ section.settings.show_arrows_mobile | default: true }} ? 'block' : 'none';
    }
    
    .hero-title {
      font-size: 2.5rem;
      line-height: 1.2;
    }
    
    .hero-description {
      font-size: 1.125rem;
    }
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('[data-section-id="{{ section.id }}"]');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.hero-slide');
    const dots = carousel.querySelectorAll('.hero-carousel-dot');
    const prevBtn = carousel.querySelector('.hero-carousel-prev');
    const nextBtn = carousel.querySelector('.hero-carousel-next');
    const progressBar = carousel.querySelector('.hero-carousel-progress-bar');
    
    let currentSlide = 0;
    let autoplayInterval;
    let progressInterval;
    let isAutoplay = {{ section.settings.autoplay | json }};
    let slideDuration = {{ section.settings.slide_duration | default: 5000 }};
    let isPaused = false;
    
    // Touch/Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        if (i === index) {
          slide.classList.add('active');
        } else if (i < index) {
          slide.classList.add('prev');
        }
      });
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      
      currentSlide = index;
      resetProgress();
    }
    
    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }
    
    function prevSlide() {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
    }
    
    function startAutoplay() {
      if (!isAutoplay || slides.length <= 1) return;
      
      autoplayInterval = setInterval(() => {
        if (!isPaused) {
          nextSlide();
        }
      }, slideDuration);
    }
    
    function stopAutoplay() {
      clearInterval(autoplayInterval);
      clearInterval(progressInterval);
    }
    
    function resetProgress() {
      if (!progressBar) return;
      
      clearInterval(progressInterval);
      progressBar.style.width = '0%';
      
      if (isAutoplay && !isPaused) {
        let progress = 0;
        const increment = 100 / (slideDuration / 100);
        
        progressInterval = setInterval(() => {
          if (!isPaused) {
            progress += increment;
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
              clearInterval(progressInterval);
            }
          }
        }, 100);
      }
    }
    
    function pauseAutoplay() {
      isPaused = true;
    }
    
    function resumeAutoplay() {
      isPaused = false;
      if (progressBar) {
        resetProgress();
      }
    }
    
    // Event Listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
      });
    }
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        stopAutoplay();
      });
    });
    
    // Hover pause/resume
    carousel.addEventListener('mouseenter', pauseAutoplay);
    carousel.addEventListener('mouseleave', resumeAutoplay);
    
    // Touch/Swipe Events
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
        stopAutoplay();
      }
    }, { passive: true });
    
    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
      if (carousel.matches(':hover')) {
        switch(e.key) {
          case 'ArrowLeft':
            prevSlide();
            stopAutoplay();
            break;
          case 'ArrowRight':
            nextSlide();
            stopAutoplay();
            break;
          case ' ':
            e.preventDefault();
            if (isPaused) {
              resumeAutoplay();
            } else {
              pauseAutoplay();
            }
            break;
        }
      }
    });
    
    // Initialize
    if (slides.length > 0) {
      showSlide(0);
      startAutoplay();
    }
    
    // Intersection Observer for performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (isAutoplay) {
            startAutoplay();
          }
        } else {
          stopAutoplay();
        }
      });
    });
    
    observer.observe(carousel);
  });
</script>

{% schema %}
{
  "name": "Hero Carousel",
  "tag": "section",
  "class": "hero-carousel-section",
  "settings": [
    {
      "type": "header",
      "content": "Carousel Settings"
    },
    {
      "type": "checkbox",
      "id": "autoplay",
      "label": "Enable autoplay",
      "default": true
    },
    {
      "type": "range",
      "id": "slide_duration",
      "label": "Slide duration (ms)",
      "min": 2000,
      "max": 10000,
      "step": 500,
      "default": 5000
    },
    {
      "type": "range",
      "id": "transition_duration",
      "label": "Transition duration (ms)",
      "min": 300,
      "max": 1500,
      "step": 100,
      "default": 700
    },
    {
      "type": "header",
      "content": "Navigation"
    },
    {
      "type": "checkbox",
      "id": "show_arrows",
      "label": "Show navigation arrows",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_arrows_mobile",
      "label": "Show arrows on mobile",
      "default": false
    },
    {
      "type": "checkbox",
      "id": "show_dots",
      "label": "Show dot indicators",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_progress",
      "label": "Show progress bar",
      "default": true
    },
    {
      "type": "header",
      "content": "Button Styling"
    },
    {
      "type": "select",
      "id": "button_color",
      "label": "Button color scheme",
      "options": [
        {
          "value": "primary-green",
          "label": "Primary Green"
        },
        {
          "value": "white",
          "label": "White"
        },
        {
          "value": "black",
          "label": "Black"
        },
        {
          "value": "red-accent",
          "label": "Red Accent"
        }
      ],
      "default": "primary-green"
    }
  ],
  "blocks": [
    {
      "type": "slide",
      "name": "Slide",
      "settings": [
        {
          "type": "header",
          "content": "Background"
        },
        {
          "type": "image_picker",
          "id": "background_image",
          "label": "Background image"
        },
        {
          "type": "range",
          "id": "overlay_opacity",
          "label": "Overlay opacity",
          "min": 0,
          "max": 80,
          "step": 10,
          "default": 40,
          "unit": "%"
        },
        {
          "type": "header",
          "content": "Content"
        },
        {
          "type": "text",
          "id": "subtitle",
          "label": "Subtitle"
        },
        {
          "type": "color",
          "id": "subtitle_color",
          "label": "Subtitle color",
          "default": "#ffffff"
        },
        {
          "type": "text",
          "id": "title",
          "label": "Title"
        },
        {
          "type": "color",
          "id": "title_color",
          "label": "Title color",
          "default": "#ffffff"
        },
        {
          "type": "textarea",
          "id": "description",
          "label": "Description"
        },
        {
          "type": "color",
          "id": "description_color",
          "label": "Description color",
          "default": "#ffffff"
        },
        {
          "type": "header",
          "content": "Call to Action"
        },
        {
          "type": "text",
          "id": "button_text",
          "label": "Button text"
        },
        {
          "type": "url",
          "id": "button_link",
          "label": "Button link"
        },
        {
          "type": "checkbox",
          "id": "button_icon",
          "label": "Show button icon",
          "default": true
        },
        {
          "type": "color",
          "id": "button_bg_color",
          "label": "Button background color",
          "default": "#8BC34A"
        },
        {
          "type": "color",
          "id": "button_text_color",
          "label": "Button text color",
          "default": "#ffffff"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Hero Carousel",
      "blocks": [
        {
          "type": "slide",
          "settings": {
            "title": "Welcome to Our Store",
            "subtitle": "Premium Quality Products",
            "description": "Discover our amazing collection of products designed to enhance your lifestyle.",
            "button_text": "Shop Now",
            "button_link": "/collections/all"
          }
        },
        {
          "type": "slide",
          "settings": {
            "title": "New Arrivals",
            "subtitle": "Fresh & Exciting",
            "description": "Check out our latest products and stay ahead of the trends.",
            "button_text": "View Collection",
            "button_link": "/collections/new"
          }
        },
        {
          "type": "slide",
          "settings": {
            "title": "Special Offers",
            "subtitle": "Limited Time",
            "description": "Don't miss out on our exclusive deals and discounts.",
            "button_text": "Shop Sale",
            "button_link": "/collections/sale"
          }
        }
      ]
    }
  ]
}
{% endschema %}
