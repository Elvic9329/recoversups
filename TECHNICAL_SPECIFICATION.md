# TECHNICAL_SPECIFICATION.md

## 🏗️ Especificaciones Técnicas del Proyecto

### Información del Proyecto
- **Nombre:** RecoverSups - Premium Supplements Theme
- **Versión:** 1.0.0
- **Plataforma:** Shopify 2.0
- **Tipo:** Theme for Sports Supplements E-commerce
- **Target:** High-performance fitness and bodybuilding market

### Stack Tecnológico

#### Frontend
- **Template Engine:** Liquid (Shopify Native)
- **CSS Preprocessor:** SCSS (Liquid compatible)
- **JavaScript:** Vanilla ES6+ with Web Components
- **CSS Methodology:** BEM (Block Element Modifier)
- **CSS Architecture:** ITCSS inspired modular structure

#### Shopify Specific
- **Theme Structure:** Shopify 2.0 (JSON templates)
- **API Integration:** Storefront API, Admin API (partial)
- **Apps Integration:** Compatible with major Shopify apps
- **Multi-currency:** Native Shopify Markets support
- **Multi-language:** Shopify Translate & Adapt ready

### Performance Requirements

#### Core Web Vitals
```javascript
// Target Metrics
const PERFORMANCE_TARGETS = {
  LCP: 2.5, // Largest Contentful Paint (seconds)
  FID: 100, // First Input Delay (milliseconds)
  CLS: 0.1, // Cumulative Layout Shift
  FCP: 1.8, // First Contentful Paint (seconds)
  TTI: 3.8  // Time to Interactive (seconds)
};
```

#### Resource Optimization
- **CSS Bundle Size:** < 50KB (compressed)
- **JavaScript Bundle Size:** < 75KB (compressed)
- **Image Optimization:** WebP with JPEG fallback
- **Font Loading:** Preload critical fonts, swap for others
- **Critical Path:** Above-fold CSS inlined (< 14KB)

### Browser Support Matrix

#### Desktop
- **Chrome:** 90+
- **Firefox:** 88+
- **Safari:** 14+
- **Edge:** 90+

#### Mobile
- **iOS Safari:** 14+
- **Chrome Mobile:** 90+
- **Samsung Internet:** 14+
- **Firefox Mobile:** 88+

#### Accessibility
- **Screen Readers:** NVDA, JAWS, VoiceOver
- **Keyboard Navigation:** Full support
- **High Contrast Mode:** Windows/macOS support
- **Reduced Motion:** Respects user preferences

### Security Specifications

#### Content Security Policy
```javascript
const CSP = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "*.shopify.com", "*.shopifycdn.com"],
  'style-src': ["'self'", "'unsafe-inline'", "*.shopifycdn.com"],
  'img-src': ["'self'", "data:", "*.shopifycdn.com", "*.shopify.com"],
  'font-src': ["'self'", "*.shopifycdn.com", "fonts.googleapis.com", "fonts.gstatic.com"],
  'connect-src': ["'self'", "*.shopify.com", "*.shopifycloud.com"]
};
```

#### Data Protection
- **Personal Data:** GDPR/CCPA compliant handling
- **Cookie Policy:** Minimal essential cookies only
- **Form Validation:** Server-side validation priority
- **XSS Prevention:** Liquid output escaping enforced

### API Integration Specifications

#### Shopify Storefront API
```graphql
# Required Permissions
query ProductDetails($handle: String!) {
  productByHandle(handle: $handle) {
    id
    title
    description
    handle
    productType
    vendor
    images(first: 10) {
      edges {
        node {
          originalSrc
          altText
          width
          height
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          price
          compareAtPrice
          availableForSale
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
}
```

#### AJAX Cart API
```javascript
// Cart API Endpoints Usage
const CART_API = {
  add: '/cart/add.js',
  update: '/cart/update.js',
  change: '/cart/change.js',
  clear: '/cart/clear.js',
  get: '/cart.js'
};
```

### Third-Party Integrations

#### Analytics & Tracking
```javascript
// Google Analytics 4 Enhanced E-commerce
const GA4_EVENTS = {
  'view_item': 'Product page view',
  'add_to_cart': 'Add to cart action',
  'begin_checkout': 'Checkout initiation',
  'purchase': 'Completed purchase',
  'view_item_list': 'Collection page view'
};

// Facebook Pixel Events
const FB_EVENTS = {
  'ViewContent': 'Product/Collection view',
  'AddToCart': 'Add to cart',
  'InitiateCheckout': 'Checkout start',
  'Purchase': 'Order completion'
};
```

#### Email Marketing
- **Klaviyo:** Product recommendations, abandoned cart
- **Mailchimp:** Newsletter signup integration
- **Custom:** Newsletter signup via Shopify Customer API

#### Reviews & Social Proof
- **Shopify Product Reviews:** Native integration
- **Judge.me:** Advanced review features
- **Yotpo:** Review and UGC platform
- **Custom:** Instagram feed integration

### Development Environment

#### Required Tools
```json
{
  "node": "16.0.0+",
  "npm": "8.0.0+",
  "shopify-cli": "3.0.0+",
  "sass": "1.50.0+",
  "postcss": "8.4.0+",
  "autoprefixer": "10.4.0+"
}
```

#### Build Process
```bash
# Development Workflow
shopify theme dev --store=dev-store.myshopify.com
npm run scss:watch
npm run js:watch

# Production Build
npm run build:css
npm run build:js
npm run optimize:images
shopify theme push --store=production-store.myshopify.com
```

### Testing Specifications

#### Automated Testing
```javascript
// Jest Configuration for JS Components
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  collectCoverageFrom: [
    'assets/js/**/*.js',
    '!assets/js/vendor/**'
  ]
};

// Lighthouse CI Configuration
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [
        'https://dev-store.myshopify.com/',
        'https://dev-store.myshopify.com/collections/protein',
        'https://dev-store.myshopify.com/products/whey-protein'
      ]
    },
    assert: {
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.95}],
        'categories:best-practices': ['error', {minScore: 0.9}],
        'categories:seo': ['error', {minScore: 0.9}]
      }
    }
  }
};
```

#### Manual Testing Checklist
- [ ] Cross-browser compatibility testing
- [ ] Mobile device testing (iOS/Android)
- [ ] Screen reader testing (NVDA, VoiceOver)
- [ ] Keyboard navigation testing
- [ ] Performance testing on 3G networks
- [ ] Cart functionality testing
- [ ] Checkout flow testing
- [ ] Form validation testing

### Deployment Specifications

#### Environments
```bash
# Development
STORE_URL=dev-recoversups.myshopify.com
SHOPIFY_FLAG_STORE=dev-recoversups

# Staging
STORE_URL=staging-recoversups.myshopify.com
SHOPIFY_FLAG_STORE=staging-recoversups

# Production
STORE_URL=recoversups.myshopify.com
SHOPIFY_FLAG_STORE=recoversups
```

#### Release Process
1. **Development:** Feature branches merged to `develop`
2. **Staging:** Release candidates deployed to staging store
3. **QA Testing:** Full testing suite execution
4. **Production:** Approved releases deployed to live store
5. **Monitoring:** Performance and error monitoring post-deployment

### Monitoring & Analytics

#### Performance Monitoring
```javascript
// Core Web Vitals Monitoring
import {getLCP, getFID, getCLS, getFCP, getTTFB} from 'web-vitals';

function sendToAnalytics(metric) {
  gtag('event', metric.name, {
    custom_parameter_1: metric.value,
    custom_parameter_2: metric.id,
    custom_parameter_3: metric.delta
  });
}

getLCP(sendToAnalytics);
getFID(sendToAnalytics);
getCLS(sendToAnalytics);
getFCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

#### Error Monitoring
```javascript
// Global Error Handling
window.addEventListener('error', (event) => {
  console.error('JS Error:', event.error);
  // Send to monitoring service
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
  // Send to monitoring service
});
```