# Shopify 2.0 Architecture - RecoverSups Theme

## Shopify 2.0 Overview

Shopify 2.0 introduces a new theme architecture based on JSON templates, dynamic sections, and improved customization capabilities. This document outlines the specific implementation for RecoverSups.

## Template System

### JSON Template Structure
```json
{
  "sections": {
    "unique_section_id": {
      "type": "section-file-name",
      "blocks": {
        "unique_block_id": {
          "type": "block_type",
          "settings": {
            "setting_key": "value"
          }
        }
      },
      "block_order": ["unique_block_id"],
      "settings": {
        "section_setting": "value"
      }
    }
  },
  "order": ["unique_section_id"]
}
```

### Current Templates

#### product.json
```json
{
  "sections": {
    "main": {
      "type": "main-product",
      "blocks": {
        "title": {
          "type": "title",
          "settings": {
            "show_vendor": false
          }
        },
        "price": {
          "type": "price",
          "settings": {
            "show_compare_price": true
          }
        },
        "description": {
          "type": "description"
        },
        "variant_picker": {
          "type": "variant_picker",
          "settings": {
            "picker_type": "button"
          }
        },
        "buy_buttons": {
          "type": "buy_buttons",
          "settings": {
            "show_dynamic_checkout": true
          }
        }
      },
      "block_order": ["title", "price", "description", "variant_picker", "buy_buttons"],
      "settings": {
        "gallery_layout": "stacked",
        "media_size": "medium",
        "media_position": "left",
        "enable_sticky_info": true
      }
    }
  },
  "order": ["main"]
}
```

#### collection.json
Features collection banner, filters, product grid, and related sections.

#### cart.json
Includes main cart, upsells, shipping info, and trust signals.

## Section Architecture

### Section File Structure
```liquid
{% comment %}
Section: Section Name
Description: What this section does
Usage: Where and how it's used
{% endcomment %}

<section class="section-{{ section.id }}" data-section="{{ section.id }}">
  <div class="page-width">
    {%- for block in section.blocks -%}
      {%- case block.type -%}
        {%- when 'block_type' -%}
          <div class="block-{{ block.type }}" {{ block.shopify_attributes }}>
            <!-- Block content -->
          </div>
      {%- endcase -%}
    {%- endfor -%}
  </div>
</section>

<style>
  /* Section-specific styles */
</style>

<script>
  // Section-specific JavaScript
</script>

{% schema %}
{
  "name": "Section Name",
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "text",
      "id": "setting_id",
      "label": "Setting Label",
      "default": "Default Value"
    }
  ],
  "blocks": [
    {
      "type": "block_type",
      "name": "Block Name",
      "settings": []
    }
  ],
  "presets": [
    {
      "name": "Section Name",
      "blocks": []
    }
  ]
}
{% endschema %}
```

### Core Sections

#### main-product.liquid
- **Purpose**: Product page main content
- **Blocks**: title, price, description, variant_picker, buy_buttons
- **Features**: Media gallery, variant selection, add to cart
- **Location**: `sections/main-product.liquid`

#### header.liquid
- **Purpose**: Site navigation and branding
- **Features**: Logo, navigation menu, cart icon, search
- **Location**: `sections/header.liquid`

#### footer.liquid
- **Purpose**: Site footer content
- **Features**: Links, social media, newsletter signup
- **Location**: `sections/footer.liquid`

#### cart-upsells.liquid
- **Purpose**: Cross-sell products in cart
- **Features**: Related products, bundle suggestions
- **Location**: `sections/cart-upsells.liquid`

### Supplement-Specific Sections

#### shop-by-goal.liquid
- **Purpose**: Fitness goal-based product discovery
- **Features**: Goal categories, filtered product display
- **Settings**: Goal types, product collections

#### product-bundles.liquid
- **Purpose**: Product bundle creation and display
- **Features**: Bundle pricing, combination products
- **Settings**: Bundle types, discount percentages

#### fitness-testimonials.liquid
- **Purpose**: Customer transformation stories
- **Features**: Before/after images, testimonial text
- **Settings**: Testimonial selection, display options

#### product-comparison.liquid
- **Purpose**: Side-by-side product comparison
- **Features**: Comparison table, feature highlighting
- **Settings**: Comparable products, comparison criteria

## Block System

### Block Types

#### Text Blocks
```json
{
  "type": "text",
  "name": "Text",
  "settings": [
    {
      "type": "richtext",
      "id": "text",
      "label": "Text",
      "default": "<p>Default text</p>"
    }
  ]
}
```

#### Image Blocks
```json
{
  "type": "image", 
  "name": "Image",
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "text",
      "id": "alt_text",
      "label": "Alt Text"
    }
  ]
}
```

#### Product Blocks
```json
{
  "type": "product",
  "name": "Product",
  "settings": [
    {
      "type": "product",
      "id": "product",
      "label": "Product"
    }
  ]
}
```

## Snippet System

### Snippet Structure
```liquid
{% comment %}
Snippet: snippet-name
Purpose: What this snippet does
Parameters: Required liquid variables
Usage: How to include this snippet
{% endcomment %}

{% liquid
  assign param_with_default = param_with_default | default: 'default_value'
  assign required_param = required_param
%}

<div class="snippet-container">
  <!-- Snippet content -->
</div>
```

### Core Snippets

#### product-card.liquid
- **Purpose**: Reusable product card component
- **Parameters**: product, show_vendor, show_rating, card_style
- **Usage**: `{% render 'product-card', product: product %}`

#### nutrition-table.liquid
- **Purpose**: Supplement facts display
- **Parameters**: product, table_style
- **Usage**: `{% render 'nutrition-table', product: product %}`

#### cart-drawer.liquid
- **Purpose**: Slide-out cart interface
- **Parameters**: cart_style, show_upsells
- **Usage**: `{% render 'cart-drawer' %}`

## Asset Management

### CSS Architecture
```
assets/
├── base-reset.css          # CSS reset and normalization
├── base-typography.css     # Typography definitions
├── base-variables.css      # CSS custom properties
├── design-tokens.css       # Design system tokens
├── critical.css           # Above-the-fold styles
├── component-*.css         # Component styles
├── section-*.css          # Section styles
├── page-*.css             # Page-specific styles
└── theme.scss.liquid      # Main stylesheet
```

### JavaScript Architecture
```
assets/
├── theme.js               # Main theme functionality
├── cart-manager.js        # Cart state management
├── module-*.js           # Feature modules
├── component-*.js        # Component scripts
└── performance-optimizations.js
```

## Liquid Filters and Tags

### RecoverSups Custom Filters
```liquid
{{ product.metafields.nutrition.facts | nutrition_table }}
{{ product.tags | fitness_goals }}
{{ collection.products | filter_by_goal: 'muscle-gain' }}
```

### Common Shopify Filters
```liquid
{{ product.price | money }}
{{ product.featured_image | image_url: width: 300 }}
{{ product.description | strip_html | truncate: 150 }}
{{ 'theme.css' | asset_url }}
```

### Performance Filters
```liquid
{{ 'image.jpg' | image_url: width: 300 | image_tag: loading: 'lazy' }}
{{ 'script.js' | asset_url | script_tag: defer: true }}
{{ 'style.css' | asset_url | stylesheet_tag: preload: true }}
```

## Theme Settings

### config/settings_schema.json
```json
[
  {
    "name": "theme_info",
    "theme_name": "RecoverSups",
    "theme_version": "1.0.0",
    "theme_author": "RecoverSups Team",
    "theme_documentation_url": "",
    "theme_support_url": ""
  },
  {
    "name": "Colors",
    "settings": [
      {
        "type": "color",
        "id": "colors_primary",
        "default": "#b62921",
        "label": "Primary Color"
      }
    ]
  },
  {
    "name": "Typography",
    "settings": [
      {
        "type": "font_picker",
        "id": "type_header_font",
        "default": "montserrat_n7",
        "label": "Heading Font"
      }
    ]
  }
]
```

## Metafields Integration

### Product Metafields
```liquid
<!-- Nutrition Facts -->
{{ product.metafields.nutrition.serving_size }}
{{ product.metafields.nutrition.ingredients }}
{{ product.metafields.nutrition.allergens }}

<!-- Supplement Info -->
{{ product.metafields.supplement.dosage }}
{{ product.metafields.supplement.timing }}
{{ product.metafields.supplement.certifications }}

<!-- Fitness Goals -->
{{ product.metafields.fitness.goals }}
{{ product.metafields.fitness.categories }}
```

### Collection Metafields
```liquid
<!-- Collection Attributes -->
{{ collection.metafields.display.banner_image }}
{{ collection.metafields.seo.description }}
{{ collection.metafields.filters.available_goals }}
```

## API Integration

### AJAX Cart API
```javascript
// Add to cart
fetch('/cart/add.js', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: variantId,
    quantity: 1
  })
});

// Update cart
fetch('/cart/update.js', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    updates: { [variantId]: quantity }
  })
});
```

### Product Recommendations API
```javascript
fetch(`/recommendations/products.json?product_id=${productId}&limit=4`)
  .then(response => response.json())
  .then(data => {
    // Handle recommendations
  });
```

## SEO and Performance

### Meta Tags
```liquid
<meta name="description" content="{{ page_description | default: shop.description | escape }}">
<meta property="og:title" content="{{ page_title | default: shop.name | escape }}">
<meta property="og:image" content="{{ page_image | default: shop.brand.logo | image_url }}">
```

### Structured Data
```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "{{ product.title | escape }}",
  "description": "{{ product.description | strip_html | escape }}",
  "image": "{{ product.featured_image | image_url }}",
  "offers": {
    "@type": "Offer",
    "price": "{{ product.price | money_without_currency }}",
    "priceCurrency": "{{ cart.currency.iso_code }}"
  }
}
</script>
```

## Development Best Practices

### Template Validation
1. Validate JSON syntax
2. Ensure unique block IDs
3. Include all blocks in block_order
4. Test section rendering

### Performance Optimization
1. Use critical CSS for above-the-fold content
2. Implement lazy loading for images
3. Minimize HTTP requests
4. Optimize asset delivery

### Accessibility
1. Use semantic HTML elements
2. Include proper ARIA labels
3. Ensure keyboard navigation
4. Maintain color contrast ratios

This architecture ensures a scalable, maintainable, and high-performing Shopify 2.0 theme for RecoverSups.