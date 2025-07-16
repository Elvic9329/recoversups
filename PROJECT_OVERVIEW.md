# RecoverSups - Project Overview

## Project Description
RecoverSups is a premium Shopify 2.0 theme designed specifically for supplements and fitness e-commerce. The theme focuses on conversion optimization, user experience, and specialized features for the supplement industry.

## Current Project Status
- **Phase**: Development Restart
- **Branch**: main
- **Theme Architecture**: Shopify 2.0 (JSON templates, sections, snippets)
- **Design System**: CSS Custom Properties with --rs- prefix

## Project Structure

### Core Directories
```
/workspaces/recoversups/
├── assets/           # CSS, JS, and static assets
├── layout/           # Theme layout files
├── sections/         # Shopify 2.0 sections
├── snippets/         # Reusable Liquid components
├── templates/        # JSON template definitions
└── *.md             # Documentation files
```

### Key Files Overview

#### Templates (JSON)
- `templates/product.json` - Product page configuration
- `templates/collection.json` - Collection page configuration  
- `templates/cart.json` - Cart page configuration

#### Core Sections
- `sections/main-product.liquid` - Product page main section
- `sections/header.liquid` - Site header
- `sections/footer.liquid` - Site footer
- `sections/cart-upsells.liquid` - Cart upselling functionality
- `sections/product-recommendations.liquid` - Product recommendations
- `sections/featured-collection.liquid` - Featured collection display

#### Specialized Sections
- `sections/shop-by-goal.liquid` - Fitness goal-based shopping
- `sections/product-bundles.liquid` - Product bundle functionality
- `sections/fitness-testimonials.liquid` - Customer testimonials
- `sections/product-comparison.liquid` - Product comparison tools
- `sections/nutrition-facts.liquid` - Supplement facts display

#### Components & Snippets
- `snippets/product-card.liquid` - Product card component
- `snippets/nutrition-table.liquid` - Nutrition facts table
- `snippets/certification-badges.liquid` - Quality certifications
- `snippets/benefit-icons.liquid` - Product benefit icons
- `snippets/cart-drawer.liquid` - Slide-out cart
- `snippets/comparison-table.liquid` - Product comparison

#### Assets Structure
**CSS Architecture**:
- `assets/base-*.css` - Foundation styles (reset, typography, variables)
- `assets/component-*.css` - Component-specific styles
- `assets/section-*.css` - Section-specific styles
- `assets/page-*.css` - Page-specific styles
- `assets/design-tokens.css` - Design system tokens
- `assets/critical.css` - Above-the-fold critical CSS

**JavaScript Architecture**:
- `assets/theme.js` - Main theme JavaScript
- `assets/cart-manager.js` - Centralized cart management
- `assets/module-*.js` - Modular functionality
- `assets/component-*.js` - Component-specific scripts

## Design System
- **Prefix**: `--rs-` for all custom properties
- **Color Scheme**: Light/Dark theme support
- **Typography**: Montserrat (Sans), Lora (Serif), Menlo (Mono)
- **Spacing**: 0.25rem base unit
- **Shadows**: 7-tier shadow system
- **Radius**: 0.5rem base border radius

## Key Features

### E-commerce Features
- Advanced product filtering by goals, ingredients, certifications
- Smart cart upsells and cross-sells
- Product comparison tools
- Bundle and subscription options
- Nutrition facts and ingredient transparency

### Performance Features
- Critical CSS inlining
- Lazy loading for images and components
- Modular JavaScript architecture
- Optimized asset loading

### Supplement-Specific Features
- Nutrition facts tables
- Certification badges (NSF, FDA, etc.)
- Fitness goal categorization
- Ingredient highlighting
- Dosage and usage instructions

## Technical Requirements
- Shopify 2.0 compatible
- Mobile-first responsive design
- WCAG 2.1 AA accessibility compliance
- Core Web Vitals optimization
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)

## Development Approach
- BEM CSS methodology
- Component-based architecture
- Progressive enhancement
- Performance-first development
- Modular and maintainable code structure

## Current Challenges
Previous development faced template structure issues causing "page not found" errors. The restart focuses on:
1. Simplified, working template structure
2. Systematic validation of all components
3. Robust error handling and fallbacks
4. Comprehensive testing approach

## Next Steps
1. Establish solid foundation with working basic templates
2. Implement core e-commerce functionality
3. Add supplement-specific features progressively
4. Optimize for performance and accessibility
5. Comprehensive testing and validation