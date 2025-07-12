# DOCUMENTATION.md

## 🎯 Visión del Proyecto

Crear un tema de Shopify 2.0 de nivel enterprise para tienda de suplementos deportivos que combine excelencia técnica, conversión optimizada y experiencia de usuario superior. Este tema será la referencia técnica en el nicho de fitness e-commerce, garantizando performance, accesibilidad y escalabilidad de clase mundial.

## 🏗️ Arquitectura del Proyecto

### Estructura de Archivos Shopify (Sin Subcarpetas)
```
theme/
├── assets/
│   ├── base-reset.css
│   ├── base-variables.css
│   ├── base-typography.css
│   ├── component-buttons.css
│   ├── component-forms.css
│   ├── component-product-card.css
│   ├── component-navigation.css
│   ├── component-cart-drawer.css
│   ├── section-header.css
│   ├── section-footer.css
│   ├── section-hero.css
│   ├── section-featured-products.css
│   ├── page-product.css
│   ├── page-collection.css
│   ├── page-cart.css
│   ├── utils-mixins.css
│   ├── utils-animations.css
│   ├── theme.scss.liquid
│   └── theme.js
├── config/
│   ├── settings_data.json
│   └── settings_schema.json
├── layout/
│   └── theme.liquid
├── locales/
│   └── en.default.json
├── sections/
│   ├── header.liquid
│   ├── footer.liquid
│   ├── hero-carousel.liquid
│   ├── featured-products.liquid
│   ├── main-product.liquid
│   ├── main-collection-product-grid.liquid
│   ├── main-cart.liquid
│   ├── shop-by-goal.liquid
│   ├── product-bundles.liquid
│   ├── fitness-testimonials.liquid
│   └── product-comparison.liquid
├── snippets/
│   ├── product-card.liquid
│   ├── product-form.liquid
│   ├── cart-drawer.liquid
│   ├── nutrition-table.liquid
│   ├── benefit-icons.liquid
│   ├── certification-badges.liquid
│   ├── flavor-selector.liquid
│   ├── goal-card.liquid
│   ├── bundle-card.liquid
│   ├── transformation-card.liquid
│   ├── comparison-table.liquid
│   ├── loading-spinner.liquid
│   ├── seo-schema.liquid
│   └── breadcrumbs.liquid
└── templates/
    ├── 404.json
    ├── article.json
    ├── blog.json
    ├── cart.json
    ├── collection.json
    ├── index.json
    ├── page.json
    ├── page.guide-supplements.json
    ├── password.json
    ├── product.json
    └── search.json
```

### Decisiones Arquitectónicas Críticas

#### 1. Metodología CSS: BEM Puro + CSS Custom Properties
```scss
// ✅ CORRECTO: BEM Puro
.product-card {
  &__image { }
  &__title { }
  &__price {
    &--sale { }
  }
  &--featured { }
}

// ❌ PROHIBIDO: Utility Classes Mezcladas
.product-card.bg-white.text-center // NO USAR
```

#### 2. Sistema de Archivos CSS Modular
```scss
// theme.scss.liquid - SOLO IMPORTS
@import 'base-reset.css';
@import 'base-variables.css';
@import 'base-typography.css';
@import 'component-buttons.css';
@import 'component-forms.css';
// ... resto de imports
```

#### 3. JavaScript: Web Components + Progressive Enhancement
```javascript
// ✅ CORRECTO: Web Components para funcionalidad compleja
class ProductForm extends HTMLElement { }
customElements.define('product-form', ProductForm);

// ✅ CORRECTO: Progressive Enhancement
if ('customElements' in window) {
  // Enhanced functionality
} else {
  // Fallback functionality
}
```

## 📋 Estándares de Nomenclatura

### Archivos CSS
- **Base:** `base-[propósito].css` (ej: `base-reset.css`)
- **Componentes:** `component-[nombre].css` (ej: `component-product-card.css`)
- **Secciones:** `section-[nombre].css` (ej: `section-header.css`)
- **Páginas:** `page-[nombre].css` (ej: `page-product.css`)
- **Utilitarios:** `utils-[propósito].css` (ej: `utils-animations.css`)

### Archivos Liquid
- **Secciones:** `[propósito-específico].liquid` (ej: `main-product.liquid`)
- **Snippets:** `[componente-específico].liquid` (ej: `product-card.liquid`)
- **Templates:** `[tipo].json` o `[tipo].[subtipo].json`

### Clases CSS (BEM Estricto)
```scss
// Bloque
.supplement-card { }

// Elementos
.supplement-card__image { }
.supplement-card__title { }
.supplement-card__price { }
.supplement-card__nutrition { }

// Modificadores
.supplement-card--featured { }
.supplement-card--on-sale { }
.supplement-card__price--discounted { }
```

### Variables CSS
```scss
:root {
  // Colores: --color-[propósito]-[tono]
  --color-primary-green: #7ED321;
  --color-primary-black: #000000;
  --color-accent-energy: #FF6B35;
  --color-accent-muscle: #4A90E2;
  --color-accent-recovery: #9013FE;
  
  // Tipografía: --font-[propósito]
  --font-heading: "Montserrat", sans-serif;
  --font-body: "Open Sans", sans-serif;
  --font-mono: "Roboto Mono", monospace;
  
  // Espaciado: --spacing-[tamaño]
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  
  // Breakpoints: --breakpoint-[dispositivo]
  --breakpoint-mobile: 768px;
  --breakpoint-tablet: 1024px;
  --breakpoint-desktop: 1200px;
  --breakpoint-wide: 1440px;
}
```

## 🎨 Sistema de Diseño para Suplementos Deportivos

### Paleta de Colores Especializada
```scss
:root {
  // Marca Principal
  --color-brand-primary: #000000;      // Negro potencia
  --color-brand-secondary: #7ED321;    // Verde energía
  --color-brand-accent: #FFFFFF;       // Blanco pureza
  
  // Objetivos Fitness (Categorización Visual)
  --color-goal-muscle: #4A90E2;        // Azul músculo
  --color-goal-energy: #FF6B35;        // Naranja energía
  --color-goal-recovery: #9013FE;      // Púrpura recuperación
  --color-goal-endurance: #00BCD4;     // Cian resistencia
  --color-goal-weight: #E91E63;        // Rosa definición
  
  // Estados y Comunicación
  --color-success: #4CAF50;            // Verde éxito
  --color-warning: #FF9800;            // Naranja advertencia
  --color-error: #F44336;              // Rojo error
  --color-info: #2196F3;               // Azul información
  
  // Neutros Profesionales
  --color-neutral-900: #1A1A1A;        // Negro texto
  --color-neutral-700: #333333;        // Gris oscuro
  --color-neutral-500: #666666;        // Gris medio
  --color-neutral-300: #999999;        // Gris claro
  --color-neutral-100: #F5F5F5;        // Gris muy claro
  --color-neutral-50: #FAFAFA;         // Casi blanco
}
```

### Jerarquía Tipográfica
```scss
:root {
  // Familias Tipográficas
  --font-primary: "Montserrat", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-secondary: "Open Sans", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: "Roboto Mono", Consolas, Monaco, monospace;
  
  // Escalas Responsivas
  --text-hero: clamp(2.5rem, 5vw, 4.5rem);
  --text-h1: clamp(2rem, 4vw, 3.5rem);
  --text-h2: clamp(1.5rem, 3vw, 2.5rem);
  --text-h3: clamp(1.25rem, 2.5vw, 2rem);
  --text-h4: clamp(1.125rem, 2vw, 1.5rem);
  --text-h5: clamp(1rem, 1.5vw, 1.25rem);
  --text-h6: clamp(0.875rem, 1.25vw, 1.125rem);
  
  // Texto Cuerpo
  --text-body-lg: 1.125rem;
  --text-body: 1rem;
  --text-body-sm: 0.875rem;
  --text-caption: 0.75rem;
  
  // Pesos Tipográficos
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  
  // Interlineado
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}
```

## 🚀 Estándares de Performance

### Métricas Objetivo (Google PageSpeed)
- **Performance Score:** ≥ 95
- **Accessibility Score:** ≥ 98
- **Best Practices Score:** ≥ 95
- **SEO Score:** ≥ 95

### CSS Performance
```scss
/* ✅ CSS Crítico Above-the-Fold (Max 14KB) */
/* Incluir solo: layout básico, hero section, navigation */

/* ✅ CSS No-Crítico (Lazy Load) */
/* Cargar después: product grids, footer, modals */

/* ✅ Técnicas de Optimización */
.product-card {
  contain: layout style paint; // CSS Containment
  content-visibility: auto; // Content Visibility API
}
```

### JavaScript Performance
```javascript
// ✅ Lazy Loading de Web Components
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Cargar componente solo cuando sea visible
        import('./components/product-form.js');
      }
    });
  });
}

// ✅ Event Delegation Obligatorio
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-add-to-cart]')) {
    // Handle add to cart
  }
});

// ✅ Debouncing para Búsqueda
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
```

## ♿ Estándares de Accesibilidad

### WCAG 2.1 AA Compliance
```html
<!-- ✅ Estructura Semántica Obligatoria -->
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <ul>
      <li><a href="/" aria-current="page">Home</a></li>
    </ul>
  </nav>
</header>

<main role="main" id="main-content">
  <!-- Skip link obligatorio -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
</main>

<!-- ✅ ARIA Labels y Estados -->
<button 
  aria-expanded="false" 
  aria-controls="mobile-menu"
  aria-label="Toggle mobile menu"
>
  Menu
</button>

<!-- ✅ Form Labels Obligatorios -->
<label for="email">Email Address</label>
<input 
  type="email" 
  id="email" 
  name="email" 
  required 
  aria-describedby="email-error"
  aria-invalid="false"
>
<div id="email-error" role="alert"></div>
```

### Contraste de Colores
```scss
/* ✅ Ratios de Contraste Mínimos */
.text-primary { 
  color: var(--color-neutral-900); /* Ratio: 21:1 */
}
.text-secondary { 
  color: var(--color-neutral-700); /* Ratio: 12.6:1 */
}
.text-muted { 
  color: var(--color-neutral-500); /* Ratio: 7:1 (mínimo 4.5:1) */
}

/* ✅ Estados de Focus Visibles */
.btn:focus-visible {
  outline: 2px solid var(--color-primary-green);
  outline-offset: 2px;
}
```

## 📱 Responsive Design

### Breakpoints y Estrategia Mobile-First
```scss
/* ✅ Mobile First Obligatorio */
.product-grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile */
  gap: var(--spacing-md);
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Tablet */
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* Desktop */
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr); /* Large Desktop */
  }
}
```

## 🔧 Desarrollo y Mantenimiento

### Git Workflow
```bash
# ✅ Branch Naming Convention
feature/TASK-001-eliminate-template-conflict
bugfix/TASK-015-cart-drawer-ajax
hotfix/critical-performance-issue
release/v1.0.0

# ✅ Commit Message Format
type(scope): description

feat(product): add nutrition table component
fix(cart): resolve AJAX quantity update issue
perf(css): optimize critical path CSS loading
docs(readme): update installation instructions
```

### Testing Obligatorio
```javascript
// ✅ Unit Testing para Web Components
describe('ProductForm', () => {
  test('should update variant when option changes', () => {
    // Test implementation
  });
});

// ✅ Accessibility Testing
axe.run().then(results => {
  if (results.violations.length > 0) {
    console.error('Accessibility violations:', results.violations);
  }
});

// ✅ Performance Testing
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'largest-contentful-paint') {
      console.log('LCP:', entry.startTime);
    }
  }
});
observer.observe({entryTypes: ['largest-contentful-paint']});
```

### Documentación de Código
```liquid
{% comment %}
  Product Card Component
  
  Description: Reusable product card for displaying products across the site
  
  Parameters:
    - product {Object} Required: Product object from Shopify
    - show_vendor {Boolean} Optional: Display product vendor (default: false)
    - show_description {Boolean} Optional: Display product description (default: true)
    - image_size {String} Optional: Image size ('small', 'medium', 'large') (default: 'medium')
  
  Usage:
    {% render 'product-card', product: product, show_vendor: true %}
  
  Dependencies:
    - CSS: component-product-card.css
    - JS: ProductCard web component (lazy loaded)
  
  Accessibility:
    - Keyboard navigable
    - Screen reader optimized
    - ARIA labels included
{% endcomment %}
```