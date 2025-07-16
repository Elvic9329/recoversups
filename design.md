# RecoverSups Design System

## Overview
The RecoverSups design system is built on CSS custom properties with a consistent `--rs-` prefix, supporting both light and dark themes. The system emphasizes performance, accessibility, and brand consistency for the supplement e-commerce market.

## Design Principles

### 1. Brand-Focused
- Strong, confident colors reflecting fitness and health
- Premium feel appropriate for supplement industry
- Trust-building through professional presentation

### 2. Performance-First
- CSS custom properties for efficient theming
- Minimal design tokens for fast rendering
- Critical path optimization

### 3. Accessibility-Driven
- WCAG 2.1 AA compliance
- High contrast ratios
- Clear visual hierarchy

### 4. Mobile-First
- Responsive design from 320px upward
- Touch-friendly interface elements
- Optimized for mobile commerce

## Color System

### Primary Colors
```css
:root {
  --rs-color-primary: #b62921;           /* Brand red */
  --rs-color-primary-foreground: #ffffff; /* Text on primary */
  --rs-color-secondary: #2c3e50;         /* Brand navy */
  --rs-color-secondary-foreground: #f7fafc; /* Text on secondary */
}
```

### Semantic Colors
```css
:root {
  --rs-color-background: #ffffff;        /* Page background */
  --rs-color-foreground: #1a202c;        /* Primary text */
  --rs-color-card: #f7fafc;             /* Card background */
  --rs-color-card-foreground: #1a202c;   /* Card text */
  --rs-color-muted: #e2e8f0;            /* Subtle elements */
  --rs-color-muted-foreground: #718096;  /* Muted text */
  --rs-color-accent: #e74c3c;           /* Accent elements */
  --rs-color-accent-foreground: #ffffff; /* Text on accent */
}
```

### Status Colors
```css
:root {
  --rs-color-destructive: #e53e3e;       /* Error/danger */
  --rs-color-destructive-foreground: #f7fafc; /* Error text */
  --rs-color-success: #10b981;           /* Success states */
  --rs-color-warning: #f59e0b;           /* Warning states */
  --rs-color-info: #3b82f6;             /* Information */
}
```

### Interactive Colors
```css
:root {
  --rs-color-border: #cbd5e0;           /* Borders */
  --rs-color-input: #e2e8f0;            /* Form inputs */
  --rs-color-ring: #b62921;             /* Focus rings */
}
```

### Dark Theme
```css
.dark {
  --rs-color-background: #1a1a1a;
  --rs-color-foreground: #f7fafc;
  --rs-color-card: #2d3748;
  --rs-color-card-foreground: #e2e8f0;
  --rs-color-muted: #4a5568;
  --rs-color-muted-foreground: #a0aec0;
  --rs-color-border: #4a5568;
  --rs-color-input: #4a5568;
}
```

## Typography System

### Font Families
```css
:root {
  --rs-font-sans: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --rs-font-serif: Lora, Georgia, "Times New Roman", serif;
  --rs-font-mono: Menlo, Monaco, "Fira Code", "Courier New", monospace;
}
```

### Font Weights
```css
:root {
  --rs-font-weight-light: 300;
  --rs-font-weight-normal: 400;
  --rs-font-weight-medium: 500;
  --rs-font-weight-semibold: 600;
  --rs-font-weight-bold: 700;
  --rs-font-weight-extrabold: 800;
}
```

### Font Sizes
```css
:root {
  --rs-font-size-xs: 0.75rem;    /* 12px */
  --rs-font-size-sm: 0.875rem;   /* 14px */
  --rs-font-size-base: 1rem;     /* 16px */
  --rs-font-size-lg: 1.125rem;   /* 18px */
  --rs-font-size-xl: 1.25rem;    /* 20px */
  --rs-font-size-2xl: 1.5rem;    /* 24px */
  --rs-font-size-3xl: 1.875rem;  /* 30px */
  --rs-font-size-4xl: 2.25rem;   /* 36px */
  --rs-font-size-5xl: 3rem;      /* 48px */
}
```

### Line Heights
```css
:root {
  --rs-line-height-tight: 1.25;
  --rs-line-height-normal: 1.5;
  --rs-line-height-relaxed: 1.625;
  --rs-line-height-loose: 2;
}
```

### Letter Spacing
```css
:root {
  --rs-tracking-normal: -0.025em;
  --rs-tracking-tight: calc(var(--rs-tracking-normal) - 0.025em);
  --rs-tracking-tighter: calc(var(--rs-tracking-normal) - 0.05em);
  --rs-tracking-wide: calc(var(--rs-tracking-normal) + 0.025em);
  --rs-tracking-wider: calc(var(--rs-tracking-normal) + 0.05em);
  --rs-tracking-widest: calc(var(--rs-tracking-normal) + 0.1em);
}
```

## Spacing System

### Base Spacing Unit
```css
:root {
  --rs-spacing: 0.25rem; /* 4px base unit */
}
```

### Spacing Scale
```css
:root {
  --rs-spacing-px: 1px;
  --rs-spacing-0: 0;
  --rs-spacing-1: calc(var(--rs-spacing) * 1);    /* 4px */
  --rs-spacing-2: calc(var(--rs-spacing) * 2);    /* 8px */
  --rs-spacing-3: calc(var(--rs-spacing) * 3);    /* 12px */
  --rs-spacing-4: calc(var(--rs-spacing) * 4);    /* 16px */
  --rs-spacing-5: calc(var(--rs-spacing) * 5);    /* 20px */
  --rs-spacing-6: calc(var(--rs-spacing) * 6);    /* 24px */
  --rs-spacing-8: calc(var(--rs-spacing) * 8);    /* 32px */
  --rs-spacing-10: calc(var(--rs-spacing) * 10);  /* 40px */
  --rs-spacing-12: calc(var(--rs-spacing) * 12);  /* 48px */
  --rs-spacing-16: calc(var(--rs-spacing) * 16);  /* 64px */
  --rs-spacing-20: calc(var(--rs-spacing) * 20);  /* 80px */
  --rs-spacing-24: calc(var(--rs-spacing) * 24);  /* 96px */
  --rs-spacing-32: calc(var(--rs-spacing) * 32);  /* 128px */
}
```

### Semantic Spacing
```css
:root {
  --rs-spacing-xs: var(--rs-spacing-1);   /* 4px */
  --rs-spacing-sm: var(--rs-spacing-2);   /* 8px */
  --rs-spacing-md: var(--rs-spacing-4);   /* 16px */
  --rs-spacing-lg: var(--rs-spacing-6);   /* 24px */
  --rs-spacing-xl: var(--rs-spacing-8);   /* 32px */
  --rs-spacing-2xl: var(--rs-spacing-12); /* 48px */
  --rs-spacing-3xl: var(--rs-spacing-16); /* 64px */
}
```

## Border Radius System

### Base Radius
```css
:root {
  --rs-radius: 0.5rem; /* 8px base radius */
}
```

### Radius Scale
```css
:root {
  --rs-radius-none: 0;
  --rs-radius-sm: calc(var(--rs-radius) - 4px);  /* 4px */
  --rs-radius-md: calc(var(--rs-radius) - 2px);  /* 6px */
  --rs-radius-lg: var(--rs-radius);              /* 8px */
  --rs-radius-xl: calc(var(--rs-radius) + 4px);  /* 12px */
  --rs-radius-2xl: calc(var(--rs-radius) + 8px); /* 16px */
  --rs-radius-full: 9999px;
}
```

## Shadow System

### Shadow Definitions
```css
:root {
  --rs-shadow-2xs: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.05);
  --rs-shadow-xs: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.05);
  --rs-shadow-sm: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.10), 0.1rem 1px 2px -0.9px hsl(0 0% 0% / 0.10);
  --rs-shadow: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.10), 0.1rem 1px 2px -0.9px hsl(0 0% 0% / 0.10);
  --rs-shadow-md: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.10), 0.1rem 2px 4px -0.9px hsl(0 0% 0% / 0.10);
  --rs-shadow-lg: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.10), 0.1rem 4px 6px -0.9px hsl(0 0% 0% / 0.10);
  --rs-shadow-xl: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.10), 0.1rem 8px 10px -0.9px hsl(0 0% 0% / 0.10);
  --rs-shadow-2xl: 0.1rem 0.1rem 0.5rem 0.1rem hsl(0 0% 0% / 0.25);
}
```

### Semantic Shadows
```css
:root {
  --rs-shadow-button: var(--rs-shadow-sm);
  --rs-shadow-card: var(--rs-shadow-md);
  --rs-shadow-modal: var(--rs-shadow-xl);
  --rs-shadow-dropdown: var(--rs-shadow-lg);
}
```

## Breakpoint System

### Breakpoint Values
```css
:root {
  --rs-breakpoint-sm: 640px;   /* Small devices */
  --rs-breakpoint-md: 768px;   /* Medium devices */
  --rs-breakpoint-lg: 1024px;  /* Large devices */
  --rs-breakpoint-xl: 1280px;  /* Extra large devices */
  --rs-breakpoint-2xl: 1536px; /* 2X large devices */
}
```

### Media Query Mixins
```css
/* Mobile first approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

## Component Patterns

### Button System
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--rs-spacing-2) var(--rs-spacing-4);
  border-radius: var(--rs-radius-md);
  font-family: var(--rs-font-sans);
  font-weight: var(--rs-font-weight-medium);
  font-size: var(--rs-font-size-sm);
  line-height: var(--rs-line-height-tight);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.btn--primary {
  background-color: var(--rs-color-primary);
  color: var(--rs-color-primary-foreground);
  box-shadow: var(--rs-shadow-button);
}

.btn--secondary {
  background-color: var(--rs-color-secondary);
  color: var(--rs-color-secondary-foreground);
  box-shadow: var(--rs-shadow-button);
}

.btn--outline {
  background-color: transparent;
  color: var(--rs-color-primary);
  border: 1px solid var(--rs-color-border);
}
```

### Card System
```css
.card {
  background-color: var(--rs-color-card);
  color: var(--rs-color-card-foreground);
  border-radius: var(--rs-radius-lg);
  box-shadow: var(--rs-shadow-card);
  padding: var(--rs-spacing-6);
  border: 1px solid var(--rs-color-border);
}

.card__header {
  margin-bottom: var(--rs-spacing-4);
}

.card__title {
  font-size: var(--rs-font-size-lg);
  font-weight: var(--rs-font-weight-semibold);
  color: var(--rs-color-foreground);
}

.card__content {
  color: var(--rs-color-muted-foreground);
  line-height: var(--rs-line-height-relaxed);
}
```

### Form System
```css
.form-group {
  margin-bottom: var(--rs-spacing-4);
}

.form-label {
  display: block;
  font-size: var(--rs-font-size-sm);
  font-weight: var(--rs-font-weight-medium);
  color: var(--rs-color-foreground);
  margin-bottom: var(--rs-spacing-1);
}

.form-input {
  width: 100%;
  padding: var(--rs-spacing-3);
  background-color: var(--rs-color-input);
  border: 1px solid var(--rs-color-border);
  border-radius: var(--rs-radius-md);
  font-size: var(--rs-font-size-base);
  color: var(--rs-color-foreground);
  transition: border-color 0.2s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: var(--rs-color-ring);
  box-shadow: 0 0 0 2px var(--rs-color-ring);
}
```

## Supplement-Specific Components

### Nutrition Table
```css
.nutrition-table {
  background-color: var(--rs-color-card);
  border: 1px solid var(--rs-color-border);
  border-radius: var(--rs-radius-lg);
  overflow: hidden;
}

.nutrition-table__header {
  background-color: var(--rs-color-primary);
  color: var(--rs-color-primary-foreground);
  padding: var(--rs-spacing-4);
  font-weight: var(--rs-font-weight-bold);
}

.nutrition-table__row {
  display: flex;
  justify-content: space-between;
  padding: var(--rs-spacing-2) var(--rs-spacing-4);
  border-bottom: 1px solid var(--rs-color-border);
}
```

### Certification Badges
```css
.certification-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--rs-spacing-1);
  padding: var(--rs-spacing-1) var(--rs-spacing-2);
  background-color: var(--rs-color-accent);
  color: var(--rs-color-accent-foreground);
  border-radius: var(--rs-radius-full);
  font-size: var(--rs-font-size-xs);
  font-weight: var(--rs-font-weight-semibold);
}
```

### Goal Cards
```css
.goal-card {
  position: relative;
  background: linear-gradient(135deg, var(--rs-color-primary), var(--rs-color-secondary));
  color: var(--rs-color-primary-foreground);
  border-radius: var(--rs-radius-xl);
  padding: var(--rs-spacing-6);
  text-align: center;
  overflow: hidden;
}

.goal-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  z-index: 1;
}
```

## Usage Guidelines

### Design Token Usage
```css
/* ✅ Correct */
.component {
  background-color: var(--rs-color-background);
  color: var(--rs-color-foreground);
  padding: var(--rs-spacing-md);
  border-radius: var(--rs-radius-lg);
}

/* ❌ Incorrect */
.component {
  background-color: #ffffff;
  color: #1a202c;
  padding: 16px;
  border-radius: 8px;
}
```

### Responsive Design Patterns
```css
.component {
  /* Mobile first */
  padding: var(--rs-spacing-4);
  font-size: var(--rs-font-size-sm);
}

@media (min-width: 768px) {
  .component {
    padding: var(--rs-spacing-6);
    font-size: var(--rs-font-size-base);
  }
}

@media (min-width: 1024px) {
  .component {
    padding: var(--rs-spacing-8);
    font-size: var(--rs-font-size-lg);
  }
}
```

### Dark Theme Implementation
```css
.component {
  background-color: var(--rs-color-card);
  color: var(--rs-color-card-foreground);
  border: 1px solid var(--rs-color-border);
}

/* Automatic dark theme adaptation */
.dark .component {
  /* Colors automatically change via CSS custom properties */
}
```

## Accessibility Features

### Focus Management
```css
.interactive-element:focus {
  outline: 2px solid var(--rs-color-ring);
  outline-offset: 2px;
}

.interactive-element:focus-visible {
  outline: 2px solid var(--rs-color-ring);
  outline-offset: 2px;
}
```

### High Contrast Support
```css
@media (prefers-contrast: high) {
  :root {
    --rs-color-border: #000000;
    --rs-color-ring: #000000;
  }
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This design system provides a comprehensive foundation for building consistent, accessible, and performant interfaces for the RecoverSups supplement e-commerce platform.n