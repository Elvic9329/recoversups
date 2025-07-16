/**
 * Enhanced Search System for RecoverSups
 * Predictive search with category filters and optimized UX
 */

(function() {
  'use strict';

  // Configuration
  const SEARCH_CONFIG = {
    minQueryLength: 2,
    debounceDelay: 300,
    maxResults: 12,
    cacheTimeout: 5 * 60 * 1000, // 5 minutes
    resources: {
      products: { limit: 8, priority: 1 },
      collections: { limit: 2, priority: 2 },
      pages: { limit: 2, priority: 3 },
      articles: { limit: 2, priority: 4 }
    }
  };

  // DOM elements
  let searchOverlay = null;
  let searchInput = null;
  let searchResults = null;
  let searchFilters = null;
  let searchSuggestions = null;
  let searchTimeout = null;
  let currentQuery = '';
  let currentResults = [];
  let selectedIndex = -1;
  let activeFilter = 'all';
  let searchCache = new Map();
  let isSearching = false;

  // Initialize enhanced search
  function initializeSearch() {
    searchOverlay = document.getElementById('search-overlay');
    searchInput = document.getElementById('search-input');
    searchResults = document.getElementById('search-results');

    if (!searchOverlay || !searchInput || !searchResults) {
      console.warn('Search elements not found');
      return;
    }

    // Create enhanced search structure
    createSearchStructure();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize recent searches
    initializeRecentSearches();
    
    console.log('Enhanced search system initialized');
  }

  // Create enhanced search structure
  function createSearchStructure() {
    // Clear existing content
    searchResults.innerHTML = '';
    
    // Create filters section
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'search-filters';
    filtersContainer.innerHTML = `
      <div class="search-filters__header">
        <span class="search-filters__title">Buscar en:</span>
      </div>
      <div class="search-filters__buttons">
        <button class="search-filter-btn active" data-filter="all">
          <span>Todo</span>
        </button>
        <button class="search-filter-btn" data-filter="products">
          <span>Productos</span>
        </button>
        <button class="search-filter-btn" data-filter="collections">
          <span>Categorías</span>
        </button>
        <button class="search-filter-btn" data-filter="pages">
          <span>Páginas</span>
        </button>
        <button class="search-filter-btn" data-filter="articles">
          <span>Artículos</span>
        </button>
      </div>
    `;
    
    // Create suggestions section
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'search-suggestions';
    suggestionsContainer.innerHTML = `
      <div class="search-suggestions__header">
        <span class="search-suggestions__title">Sugerencias populares</span>
      </div>
      <div class="search-suggestions__list">
        <button class="search-suggestion-btn" data-query="proteína whey">Proteína Whey</button>
        <button class="search-suggestion-btn" data-query="creatina">Creatina</button>
        <button class="search-suggestion-btn" data-query="aminoácidos">Aminoácidos</button>
        <button class="search-suggestion-btn" data-query="vitaminas">Vitaminas</button>
        <button class="search-suggestion-btn" data-query="pre entreno">Pre Entreno</button>
        <button class="search-suggestion-btn" data-query="quemador grasa">Quemador de Grasa</button>
      </div>
    `;
    
    // Create results container
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results-container';
    resultsContainer.innerHTML = `
      <div class="search-results__header">
        <span class="search-results__count"></span>
        <span class="search-results__loading">Buscando...</span>
      </div>
      <div class="search-results__grid"></div>
      <div class="search-results__empty">
        <div class="search-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <h3>No se encontraron resultados</h3>
          <p>Intenta con otros términos de búsqueda</p>
        </div>
      </div>
    `;
    
    // Append all sections
    searchResults.appendChild(filtersContainer);
    searchResults.appendChild(suggestionsContainer);
    searchResults.appendChild(resultsContainer);
    
    // Cache references
    searchFilters = filtersContainer;
    searchSuggestions = suggestionsContainer;
  }

  // Setup event listeners
  function setupEventListeners() {
    // Search input events
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('keydown', handleKeyboardNavigation);
    searchInput.addEventListener('focus', handleSearchFocus);
    searchInput.addEventListener('blur', handleSearchBlur);
    
    // Filter buttons
    searchFilters.addEventListener('click', handleFilterClick);
    
    // Suggestion buttons
    searchSuggestions.addEventListener('click', handleSuggestionClick);
    
    // Results container for keyboard navigation
    searchResults.addEventListener('keydown', handleResultsKeydown);
    
    // Form submission
    const searchForm = searchInput.closest('form');
    if (searchForm) {
      searchForm.addEventListener('submit', handleFormSubmit);
    }
  }

  // Handle search input
  function handleSearchInput(e) {
    const query = e.target.value.trim();
    currentQuery = query;
    
    clearTimeout(searchTimeout);
    
    if (query.length < SEARCH_CONFIG.minQueryLength) {
      showSuggestions();
      return;
    }
    
    // Show loading state
    showLoadingState();
    
    // Debounced search
    searchTimeout = setTimeout(() => {
      performSearch(query);
    }, SEARCH_CONFIG.debounceDelay);
  }

  // Handle keyboard navigation
  function handleKeyboardNavigation(e) {
    const resultsGrid = document.querySelector('.search-results__grid');
    const results = resultsGrid ? resultsGrid.querySelectorAll('.search-result') : [];
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
        updateSelectedResult(results);
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        updateSelectedResult(results);
        break;
        
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          const link = results[selectedIndex].querySelector('a');
          if (link) {
            window.location.href = link.href;
          }
        } else {
          // Submit form if no result selected
          handleFormSubmit(e);
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        closeSearch();
        break;
    }
  }

  // Handle search focus
  function handleSearchFocus() {
    if (currentQuery.length < SEARCH_CONFIG.minQueryLength) {
      showSuggestions();
    }
  }

  // Handle search blur
  function handleSearchBlur() {
    // Delay to allow clicks on results
    setTimeout(() => {
      selectedIndex = -1;
    }, 200);
  }

  // Handle filter click
  function handleFilterClick(e) {
    const filterBtn = e.target.closest('.search-filter-btn');
    if (!filterBtn) return;
    
    // Update active filter
    document.querySelectorAll('.search-filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    filterBtn.classList.add('active');
    
    activeFilter = filterBtn.dataset.filter;
    
    // Re-filter current results
    if (currentResults.length > 0) {
      displayResults(currentResults);
    }
    
    // Announce filter change
    announceToScreenReader(`Filtro cambiado a ${filterBtn.textContent.trim()}`);
  }

  // Handle suggestion click
  function handleSuggestionClick(e) {
    const suggestionBtn = e.target.closest('.search-suggestion-btn');
    if (!suggestionBtn) return;
    
    const query = suggestionBtn.dataset.query;
    searchInput.value = query;
    currentQuery = query;
    
    // Track suggestion usage
    trackSuggestionUsage(query);
    
    // Perform search
    performSearch(query);
  }

  // Handle form submission
  function handleFormSubmit(e) {
    if (currentQuery.length < SEARCH_CONFIG.minQueryLength) {
      e.preventDefault();
      announceToScreenReader('Ingresa al menos 2 caracteres para buscar');
      return;
    }
    
    // Track search
    trackSearch(currentQuery);
    
    // Let form submit naturally to search page
  }

  // Perform enhanced search
  async function performSearch(query) {
    if (isSearching) return;
    
    isSearching = true;
    selectedIndex = -1;
    
    // Check cache first
    const cacheKey = `${query}_${activeFilter}`;
    if (searchCache.has(cacheKey)) {
      const cachedResult = searchCache.get(cacheKey);
      if (Date.now() - cachedResult.timestamp < SEARCH_CONFIG.cacheTimeout) {
        displayResults(cachedResult.results);
        isSearching = false;
        return;
      }
    }
    
    try {
      // Build search URL with enhanced parameters
      const searchUrl = buildSearchUrl(query);
      
      const response = await fetch(searchUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }
      
      const data = await response.json();
      const results = processSearchResults(data);
      
      // Cache results
      searchCache.set(cacheKey, {
        results,
        timestamp: Date.now()
      });
      
      // Clean old cache entries
      cleanCache();
      
      currentResults = results;
      displayResults(results);
      
    } catch (error) {
      console.error('Search error:', error);
      showErrorState();
    } finally {
      isSearching = false;
    }
  }

  // Build search URL
  function buildSearchUrl(query) {
    const baseUrl = '/search/suggest.json';
    const params = new URLSearchParams();
    
    params.append('q', query);
    params.append('resources[type]', 'product,collection,page,article');
    params.append('resources[limit]', SEARCH_CONFIG.maxResults);
    params.append('resources[options][unavailable_products]', 'last');
    params.append('resources[options][fields]', 'title,product_type,vendor,tag,sku');
    
    return `${baseUrl}?${params.toString()}`;
  }

  // Process search results
  function processSearchResults(data) {
    if (!data.resources || !data.resources.results) {
      return [];
    }
    
    const results = [];
    const resources = data.resources.results;
    
    // Process each resource type
    Object.entries(SEARCH_CONFIG.resources).forEach(([type, config]) => {
      if (resources[type]) {
        resources[type].forEach(item => {
          results.push({
            ...item,
            type: type,
            priority: config.priority
          });
        });
      }
    });
    
    // Sort by priority and relevance
    results.sort((a, b) => {
      // First by priority
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      
      // Then by title relevance
      const aRelevance = calculateRelevance(a.title, currentQuery);
      const bRelevance = calculateRelevance(b.title, currentQuery);
      
      return bRelevance - aRelevance;
    });
    
    return results;
  }

  // Calculate relevance score
  function calculateRelevance(title, query) {
    const titleLower = title.toLowerCase();
    const queryLower = query.toLowerCase();
    
    let score = 0;
    
    // Exact match
    if (titleLower === queryLower) score += 100;
    
    // Starts with query
    if (titleLower.startsWith(queryLower)) score += 50;
    
    // Contains query
    if (titleLower.includes(queryLower)) score += 25;
    
    // Word boundaries
    const words = queryLower.split(' ');
    words.forEach(word => {
      if (titleLower.includes(word)) score += 10;
    });
    
    return score;
  }

  // Display results
  function displayResults(results) {
    const resultsGrid = document.querySelector('.search-results__grid');
    const resultsCount = document.querySelector('.search-results__count');
    const resultsEmpty = document.querySelector('.search-results__empty');
    const loadingState = document.querySelector('.search-results__loading');
    
    // Hide loading
    loadingState.style.display = 'none';
    
    // Filter results based on active filter
    const filteredResults = activeFilter === 'all' 
      ? results 
      : results.filter(result => result.type === activeFilter);
    
    if (filteredResults.length === 0) {
      resultsGrid.style.display = 'none';
      resultsEmpty.style.display = 'block';
      resultsCount.textContent = '';
      hideSuggestions();
      return;
    }
    
    // Show results
    resultsGrid.style.display = 'grid';
    resultsEmpty.style.display = 'none';
    resultsCount.textContent = `${filteredResults.length} resultado${filteredResults.length !== 1 ? 's' : ''}`;
    
    // Generate HTML
    resultsGrid.innerHTML = filteredResults.map((result, index) => {
      return generateResultHTML(result, index);
    }).join('');
    
    // Hide suggestions
    hideSuggestions();
    
    // Announce results
    announceToScreenReader(`${filteredResults.length} resultado${filteredResults.length !== 1 ? 's' : ''} encontrado${filteredResults.length !== 1 ? 's' : ''}`);
  }

  // Generate result HTML
  function generateResultHTML(result, index) {
    const typeClass = `search-result--${result.type}`;
    const typeLabel = getTypeLabel(result.type);
    
    switch (result.type) {
      case 'product':
        return `
          <div class="search-result ${typeClass}" data-index="${index}">
            <a href="${result.url}" class="search-result__link">
              ${result.featured_image ? `
                <div class="search-result__image">
                  <img src="${result.featured_image.url}" alt="${result.title}" loading="lazy">
                </div>
              ` : ''}
              <div class="search-result__content">
                <span class="search-result__type">${typeLabel}</span>
                <h3 class="search-result__title">${highlightQuery(result.title)}</h3>
                ${result.price ? `<div class="search-result__price">$${(result.price / 100).toFixed(2)}</div>` : ''}
                ${result.vendor ? `<div class="search-result__vendor">${result.vendor}</div>` : ''}
                ${result.available ? '<span class="search-result__availability available">Disponible</span>' : '<span class="search-result__availability unavailable">Agotado</span>'}
              </div>
            </a>
          </div>
        `;
        
      case 'collection':
        return `
          <div class="search-result ${typeClass}" data-index="${index}">
            <a href="${result.url}" class="search-result__link">
              ${result.featured_image ? `
                <div class="search-result__image">
                  <img src="${result.featured_image.url}" alt="${result.title}" loading="lazy">
                </div>
              ` : ''}
              <div class="search-result__content">
                <span class="search-result__type">${typeLabel}</span>
                <h3 class="search-result__title">${highlightQuery(result.title)}</h3>
                <div class="search-result__description">${result.description || 'Ver productos'}</div>
              </div>
            </a>
          </div>
        `;
        
      case 'page':
        return `
          <div class="search-result ${typeClass}" data-index="${index}">
            <a href="${result.url}" class="search-result__link">
              <div class="search-result__content">
                <span class="search-result__type">${typeLabel}</span>
                <h3 class="search-result__title">${highlightQuery(result.title)}</h3>
                <div class="search-result__description">${result.content ? result.content.substring(0, 120) + '...' : ''}</div>
              </div>
            </a>
          </div>
        `;
        
      case 'article':
        return `
          <div class="search-result ${typeClass}" data-index="${index}">
            <a href="${result.url}" class="search-result__link">
              <div class="search-result__content">
                <span class="search-result__type">${typeLabel}</span>
                <h3 class="search-result__title">${highlightQuery(result.title)}</h3>
                <div class="search-result__description">${result.summary || result.content ? (result.summary || result.content).substring(0, 120) + '...' : ''}</div>
              </div>
            </a>
          </div>
        `;
        
      default:
        return '';
    }
  }

  // Get type label
  function getTypeLabel(type) {
    const labels = {
      product: 'Producto',
      collection: 'Categoría',
      page: 'Página',
      article: 'Artículo'
    };
    return labels[type] || type;
  }

  // Highlight query in text
  function highlightQuery(text) {
    if (!currentQuery) return text;
    
    const regex = new RegExp(`(${currentQuery})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  // Show suggestions
  function showSuggestions() {
    const resultsGrid = document.querySelector('.search-results__grid');
    const resultsEmpty = document.querySelector('.search-results__empty');
    const loadingState = document.querySelector('.search-results__loading');
    
    if (resultsGrid) resultsGrid.style.display = 'none';
    if (resultsEmpty) resultsEmpty.style.display = 'none';
    if (loadingState) loadingState.style.display = 'none';
    
    searchSuggestions.style.display = 'block';
  }

  // Hide suggestions
  function hideSuggestions() {
    searchSuggestions.style.display = 'none';
  }

  // Show loading state
  function showLoadingState() {
    const loadingState = document.querySelector('.search-results__loading');
    const resultsGrid = document.querySelector('.search-results__grid');
    const resultsEmpty = document.querySelector('.search-results__empty');
    
    if (loadingState) loadingState.style.display = 'block';
    if (resultsGrid) resultsGrid.style.display = 'none';
    if (resultsEmpty) resultsEmpty.style.display = 'none';
    
    hideSuggestions();
  }

  // Show error state
  function showErrorState() {
    const resultsEmpty = document.querySelector('.search-results__empty');
    const loadingState = document.querySelector('.search-results__loading');
    
    if (loadingState) loadingState.style.display = 'none';
    if (resultsEmpty) {
      resultsEmpty.style.display = 'block';
      resultsEmpty.querySelector('.search-empty-state h3').textContent = 'Error en la búsqueda';
      resultsEmpty.querySelector('.search-empty-state p').textContent = 'Inténtalo de nuevo más tarde';
    }
  }

  // Update selected result
  function updateSelectedResult(results) {
    results.forEach((result, index) => {
      result.classList.toggle('selected', index === selectedIndex);
    });
    
    // Scroll selected result into view
    if (selectedIndex >= 0 && results[selectedIndex]) {
      results[selectedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }

  // Clean cache
  function cleanCache() {
    const now = Date.now();
    for (const [key, value] of searchCache.entries()) {
      if (now - value.timestamp > SEARCH_CONFIG.cacheTimeout) {
        searchCache.delete(key);
      }
    }
  }

  // Initialize recent searches
  function initializeRecentSearches() {
    const recentSearches = getRecentSearches();
    if (recentSearches.length > 0) {
      updateSuggestionsWithRecent(recentSearches);
    }
  }

  // Get recent searches
  function getRecentSearches() {
    try {
      const recent = localStorage.getItem('rs-recent-searches');
      return recent ? JSON.parse(recent) : [];
    } catch (e) {
      return [];
    }
  }

  // Track search
  function trackSearch(query) {
    try {
      const recentSearches = getRecentSearches();
      const filtered = recentSearches.filter(search => search !== query);
      filtered.unshift(query);
      
      localStorage.setItem('rs-recent-searches', JSON.stringify(filtered.slice(0, 10)));
    } catch (e) {
      console.warn('Could not save recent search');
    }
  }

  // Track suggestion usage
  function trackSuggestionUsage(query) {
    // Could implement analytics here
    console.log('Suggestion used:', query);
  }

  // Update suggestions with recent searches
  function updateSuggestionsWithRecent(recentSearches) {
    const suggestionsList = document.querySelector('.search-suggestions__list');
    if (!suggestionsList) return;
    
    const recentHTML = recentSearches.slice(0, 3).map(search => 
      `<button class="search-suggestion-btn recent" data-query="${search}">${search}</button>`
    ).join('');
    
    suggestionsList.innerHTML = recentHTML + suggestionsList.innerHTML;
  }

  // Announce to screen reader
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

  // Close search (integration with header)
  function closeSearch() {
    if (typeof window.closeSearch === 'function') {
      window.closeSearch();
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSearch);
  } else {
    initializeSearch();
  }

  // Export for testing
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      initializeSearch,
      performSearch,
      displayResults,
      calculateRelevance
    };
  }

})();