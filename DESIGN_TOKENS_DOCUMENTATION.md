# RecoverSups Design Tokens Documentation

## Overview

This document provides comprehensive documentation for the RecoverSups design token system. All tokens use the `--rs-` prefix and are designed for performance, accessibility, and brand consistency.

## 📁 File Structure

```
/assets/
├── tokens.scss              # Main design tokens file
├── typography-mixins.scss    # Typography utility mixins
└── theme.scss               # Import and usage file
```

## 🎨 Token Categories

### 1. Color System

#### Primary Colors
```scss
--rs-color-primary: #b62921;              // Brand red
--rs-color-primary-foreground: #ffffff;   // Text on primary
--rs-color-secondary: #2c3e50;            // Brand navy
--rs-color-secondary-foreground: #f7fafc; // Text on secondary
```

#### Usage Example:
```scss
.button-primary {
  background-color: var(--rs-color-primary);
  color: var(--rs-color-primary-foreground);
}
```

#### Status Colors
```scss
--rs-color-success: #10b981;     // Green for success states
--rs-color-warning: #f59e0b;     // Orange for warnings
--rs-color-destructive: #e53e3e; // Red for errors
--rs-color-info: #3b82f6;       // Blue for information
```

### 2. Typography System

#### Font Families
```scss
--rs-font-sans: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--rs-font-serif: Lora, Georgia, "Times New Roman", serif;
--rs-font-mono: Menlo, Monaco, "Fira Code", "Courier New", monospace;
```

#### Font Sizes (Mobile-first scale)
```scss
--rs-font-size-xs: 0.75rem;   // 12px
--rs-font-size-sm: 0.875rem;  // 14px
--rs-font-size-base: 1rem;    // 16px
--rs-font-size-lg: 1.125rem;  // 18px
--rs-font-size-xl: 1.25rem;   // 20px
--rs-font-size-2xl: 1.5rem;   // 24px
--rs-font-size-3xl: 1.875rem; // 30px
--rs-font-size-4xl: 2.25rem;  // 36px
--rs-font-size-5xl: 3rem;     // 48px
```

#### Typography Mixins Usage
```scss
.heading-1 {
  @include rs-text-h1; // Automatically responsive
}

.body-text {
  @include rs-text-body; // Standard body text
}

.product-price {
  @include rs-text-price; // Special price styling
}
```

### 3. Spacing System

#### Base Unit System (4px grid)
```scss
--rs-spacing: 0.25rem; // 4px base unit

// Scale
--rs-spacing-1: 4px;   // var(--rs-spacing) * 1
--rs-spacing-2: 8px;   // var(--rs-spacing) * 2
--rs-spacing-4: 16px;  // var(--rs-spacing) * 4
--rs-spacing-8: 32px;  // var(--rs-spacing) * 8
--rs-spacing-16: 64px; // var(--rs-spacing) * 16
```

#### Semantic Spacing
```scss
--rs-spacing-xs: 4px;   // Tiny gaps
--rs-spacing-sm: 8px;   // Small gaps
--rs-spacing-md: 16px;  // Standard gaps
--rs-spacing-lg: 24px;  // Large gaps
--rs-spacing-xl: 32px;  // Extra large gaps
```

### 4. Breakpoint System

#### Values
```scss
--rs-breakpoint-sm: 640px;   // Small tablets
--rs-breakpoint-md: 768px;   // Tablets
--rs-breakpoint-lg: 1024px;  // Small laptops
--rs-breakpoint-xl: 1280px;  // Laptops
--rs-breakpoint-2xl: 1536px; // Large screens
```

#### Usage (Mobile-first)
```scss
.component {
  padding: var(--rs-spacing-4); // Mobile: 16px
  
  @media (min-width: 768px) {
    padding: var(--rs-spacing-6); // Tablet: 24px
  }
  
  @media (min-width: 1024px) {
    padding: var(--rs-spacing-8); // Desktop: 32px
  }
}
```

### 5. Animation & Transitions

#### Duration Tokens
```scss
--rs-transition-fast: 150ms;      // Quick interactions
--rs-transition-normal: 200ms;    // Standard transitions
--rs-transition-slow: 300ms;      // Deliberate animations
```

#### Easing Functions
```scss
--rs-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);    // Standard easing
--rs-ease-back: cubic-bezier(0.68, -0.55, 0.265, 1.55); // Bounce effect
```

#### Common Transitions
```scss
--rs-transition-all: all var(--rs-transition-normal) var(--rs-ease-in-out);
--rs-transition-colors: color var(--rs-transition-fast) var(--rs-ease-in-out),
                       background-color var(--rs-transition-fast) var(--rs-ease-in-out);
```

### 6. Z-Index System

#### Layer Organization
```scss
--rs-z-index-dropdown: 1000;  // Dropdown menus
--rs-z-index-sticky: 1100;    // Sticky headers
--rs-z-index-overlay: 1300;   // Overlays
--rs-z-index-modal: 1400;     // Modal dialogs
--rs-z-index-tooltip: 1700;   // Tooltips
--rs-z-index-toast: 1800;     // Toast notifications
```

## 🌙 Dark Theme Support

### Automatic Theme Switching
```scss
.component {
  background-color: var(--rs-color-background);
  color: var(--rs-color-foreground);
}

/* Automatically adapts when .dark class is applied to body */
```

### Dark Theme Tokens
```scss
.dark {
  --rs-color-background: #1a1a1a;
  --rs-color-foreground: #f7fafc;
  --rs-color-card: #2d3748;
  --rs-color-border: #4a5568;
}
```

### Implementation
```javascript
// Toggle dark mode
document.body.classList.toggle('dark');
```

## ♿ Accessibility Features

### Focus Management
```scss
.interactive-element:focus-visible {
  outline: 2px solid var(--rs-color-ring);
  outline-offset: 2px;
}
```

### High Contrast Support
```scss
@media (prefers-contrast: high) {
  :root {
    --rs-color-border: #000000;
    --rs-color-ring: #000000;
  }
}
```

### Reduced Motion Support
```scss
@media (prefers-reduced-motion: reduce) {
  :root {
    --rs-transition-normal: 0ms; // Disables animations
  }
}
```

## 🛒 Supplement-Specific Tokens

### Nutrition Facts Styling
```scss
.nutrition-facts {
  @include rs-text-nutrition-header; // Uppercase header
}

.nutrition-value {
  @include rs-text-nutrition-value; // Monospace numbers
}
```

### Product Pricing
```scss
.price-current {
  @include rs-text-price; // Bold, primary color
}

.price-compare {
  @include rs-text-price-compare; // Strikethrough, muted
}
```

### Goal-Based Styling
```scss
.goal-badge {
  @include rs-text-goal; // Uppercase, accent color
}

.ingredient-name {
  @include rs-text-ingredient; // Serif, italic
}
```

## 📱 Responsive Design Patterns

### Mobile-First Approach
```scss
// ✅ Correct - Mobile first
.component {
  font-size: var(--rs-font-size-sm);    // Mobile: 14px
  
  @media (min-width: 768px) {
    font-size: var(--rs-font-size-base); // Tablet: 16px
  }
}

// ❌ Incorrect - Desktop first
.component {
  font-size: var(--rs-font-size-base);
  
  @media (max-width: 767px) {
    font-size: var(--rs-font-size-sm);
  }
}
```

### Fluid Typography
```scss
.hero-title {
  @include rs-text-fluid(
    var(--rs-font-size-2xl),  // Min size: 24px
    var(--rs-font-size-5xl)   // Max size: 48px
  );
}
```

## 🚀 Performance Optimizations

### Hardware Acceleration
```scss
.animated-element {
  @extend .rs-gpu-accelerated; // Forces GPU acceleration
}
```

### Font Loading
```scss
:root {
  font-display: swap; // Improves font loading performance
}
```

## 🎯 Best Practices

### ✅ Do's
```scss
// Use semantic tokens
.button {
  background-color: var(--rs-color-primary);
  padding: var(--rs-spacing-md);
  border-radius: var(--rs-radius-lg);
}

// Use mixins for complex typography
.product-title {
  @include rs-text-h3;
}

// Use transition tokens
.interactive {
  transition: var(--rs-transition-colors);
}
```

### ❌ Don'ts
```scss
// Don't use hardcoded values
.button {
  background-color: #b62921; /* Use var(--rs-color-primary) */
  padding: 16px;             /* Use var(--rs-spacing-md) */
  border-radius: 8px;        /* Use var(--rs-radius-lg) */
}

// Don't create custom colors outside the system
.special-button {
  background-color: #ff69b4; /* Not in design system */
}
```

## 🔧 Usage in Liquid Templates

### CSS Classes with Tokens
```liquid
<div class="hero-section" style="
  background-color: var(--rs-color-primary);
  padding: var(--rs-spacing-2xl);
  border-radius: var(--rs-radius-xl);
">
  <h1 style="color: var(--rs-color-primary-foreground);">
    {{ section.settings.title }}
  </h1>
</div>
```

### Utility Classes (to be created)
```liquid
<div class="rs-bg-primary rs-text-primary-foreground rs-p-xl rs-rounded-xl">
  <h1 class="rs-text-h1">{{ section.settings.title }}</h1>
</div>
```

## 🧪 Testing Tokens

### Visual Regression Testing
1. Test all color combinations for sufficient contrast
2. Verify dark mode implementation
3. Test responsive scaling across breakpoints
4. Validate accessibility with screen readers

### Performance Testing
1. Measure CSS bundle size impact
2. Test rendering performance with many tokens
3. Validate font loading optimization

## 📦 Import Structure

### In theme.scss
```scss
// Import tokens first
@import 'tokens';

// Then mixins
@import 'typography-mixins';

// Then components (using tokens and mixins)
@import 'components/buttons';
@import 'components/cards';
```

### Critical CSS
```scss
// Include essential tokens in critical CSS
:root {
  --rs-color-primary: #b62921;
  --rs-color-background: #ffffff;
  --rs-font-sans: Montserrat, sans-serif;
  --rs-spacing-md: 1rem;
}
```

## 🔄 Token Updates

### Version Control
- Always update tokens through this documentation
- Test changes across all components
- Update examples when tokens change
- Maintain backward compatibility when possible

### Migration Guide
When updating tokens:
1. Update `tokens.scss`
2. Update this documentation
3. Test all components
4. Update component examples
5. Notify team of changes

---

**Last Updated:** [Current Date]  
**Version:** 1.0.0  
**Maintainer:** Design Systems Team