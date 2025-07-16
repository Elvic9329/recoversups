# RecoverSups Troubleshooting Guide

## Common Issues and Solutions

### Template Issues

#### Issue: "Page not found" on product pages
**Symptoms**: Product pages return 404 errors, theme editor shows template errors
**Causes**: 
- Incorrect JSON template structure
- Missing required sections
- Invalid block configuration

**Solutions**:
```bash
# 1. Validate template JSON structure
Read templates/product.json

# 2. Check main-product section exists
Read sections/main-product.liquid

# 3. Verify template syntax
# JSON must use objects for blocks, not arrays
```

**Template Fix**:
```json
// ❌ Incorrect (arrays)
"blocks": [
  {
    "type": "title",
    "settings": {}
  }
]

// ✅ Correct (objects with IDs)
"blocks": {
  "title_123": {
    "type": "title", 
    "settings": {}
  }
},
"block_order": ["title_123"]
```

#### Issue: Liquid syntax errors on upload
**Symptoms**: Upload fails with liquid syntax errors
**Common Errors**:
- Invalid comment syntax
- Unclosed liquid tags
- Missing escape filters
- Invalid pipe usage

**Solutions**:
```liquid
<!-- ❌ Incorrect comment syntax -->
{# This is wrong #}

<!-- ✅ Correct comment syntax -->
{% comment %}This is correct{% endcomment %}

<!-- ❌ Missing escape filter -->
<h1>{{ product.title }}</h1>

<!-- ✅ With escape filter -->
<h1>{{ product.title | escape }}</h1>

<!-- ❌ Invalid pipe in liquid tag -->
{% if product.title | size > 0 %}

<!-- ✅ Correct usage -->
{% assign title_length = product.title | size %}
{% if title_length > 0 %}
```

### Section Issues

#### Issue: Sections not appearing in theme editor
**Symptoms**: Custom sections don't show up in section library
**Causes**:
- Missing or invalid schema
- Incorrect section file location
- Schema syntax errors

**Solutions**:
```liquid
{% schema %}
{
  "name": "Section Name",
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Title",
      "default": "Default Title"
    }
  ],
  "presets": [
    {
      "name": "Section Name"
    }
  ]
}
{% endschema %}
```

#### Issue: Block rendering errors
**Symptoms**: Sections load but blocks don't render
**Causes**:
- Missing block type cases
- Invalid block.shopify_attributes
- Block settings not properly referenced

**Solutions**:
```liquid
{%- for block in section.blocks -%}
  {%- case block.type -%}
    {%- when 'text' -%}
      <div class="block-text" {{ block.shopify_attributes }}>
        {{ block.settings.text }}
      </div>
    {%- when 'image' -%}
      <div class="block-image" {{ block.shopify_attributes }}>
        {% if block.settings.image %}
          <img src="{{ block.settings.image | image_url }}" 
               alt="{{ block.settings.image.alt | escape }}">
        {% endif %}
      </div>
  {%- endcase -%}
{%- endfor -%}
```

### CSS Issues

#### Issue: Design tokens not working
**Symptoms**: CSS custom properties show as literal values
**Causes**:
- Missing design-tokens.css import
- Incorrect custom property names
- CSS loading order issues

**Solutions**:
```css
/* Ensure design tokens are imported first */
@import 'design-tokens.css';

/* ❌ Incorrect property name */
color: var(--color-primary);

/* ✅ Correct property name */
color: var(--rs-color-primary);

/* ❌ Missing fallback */
color: var(--rs-color-primary);

/* ✅ With fallback */
color: var(--rs-color-primary, #b62921);
```

#### Issue: BEM class naming conflicts
**Symptoms**: Styles not applying correctly, specificity issues
**Solutions**:
```css
/* ❌ Incorrect BEM structure */
.product-card-title-text { }

/* ✅ Correct BEM structure */
.product-card__title { }
.product-card__title--large { }
.product-card--featured { }
```

#### Issue: Dark theme not working
**Symptoms**: Dark theme styles not applying
**Solutions**:
```css
/* Ensure dark theme class is properly applied */
.dark {
  --rs-color-background: #1a1a1a;
  --rs-color-foreground: #f7fafc;
}

/* Use custom properties, not hardcoded values */
.component {
  background-color: var(--rs-color-background);
  color: var(--rs-color-foreground);
}
```

### JavaScript Issues

#### Issue: Cart functionality not working
**Symptoms**: Add to cart fails, cart drawer doesn't open
**Causes**:
- Missing cart-manager.js
- Event listeners not properly attached
- AJAX requests failing

**Solutions**:
```javascript
// Ensure CartManager is loaded
import { CartManager } from './cart-manager.js';

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', () => {
  CartManager.init();
});

// Handle add to cart
document.addEventListener('submit', (e) => {
  if (e.target.matches('[data-type="add-to-cart-form"]')) {
    e.preventDefault();
    CartManager.addToCart(new FormData(e.target));
  }
});
```

#### Issue: Variant selection not working
**Symptoms**: Variant changes don't update price/availability
**Solutions**:
```javascript
// Ensure variant data is available
<script type="application/json" data-variant-json>
  {{ product.variants | json }}
</script>

// Proper variant change handling
onVariantChange() {
  this.updateOptions();
  this.updateMasterId();
  
  if (!this.currentVariant) {
    this.toggleAddButton(true, 'Sold Out', false);
    return;
  }
  
  this.updatePrice();
  this.updateVariantInput();
  this.updateMedia();
}
```

### Performance Issues

#### Issue: Slow page load times
**Symptoms**: High LCP, CLS, or FID scores
**Solutions**:
```liquid
<!-- Preload critical resources -->
{{ 'critical.css' | asset_url | preload_tag: as: 'style' }}
{{ 'theme.js' | asset_url | preload_tag: as: 'script' }}

<!-- Optimize images -->
<img loading="lazy" 
     src="{{ image | image_url: width: 800 }}"
     srcset="{{ image | image_url: width: 400 }} 400w,
             {{ image | image_url: width: 800 }} 800w"
     sizes="(max-width: 768px) 400px, 800px"
     alt="{{ image.alt | escape }}">

<!-- Critical CSS inline -->
<style>
{% render 'critical-css-loader' %}
</style>
```

#### Issue: Large JavaScript bundles
**Solutions**:
```javascript
// Use dynamic imports for non-critical features
const loadProductComparison = () => {
  return import('./component-comparison.js');
};

// Lazy load components
if (document.querySelector('.product-comparison')) {
  loadProductComparison().then(module => {
    module.init();
  });
}
```

### Shopify-Specific Issues

#### Issue: Theme upload failures
**Symptoms**: ZIP upload fails, individual file uploads fail
**Solutions**:
```bash
# Check file sizes (Shopify limits)
find . -name "*.liquid" -size +100k
find . -name "*.css" -size +100k  
find . -name "*.js" -size +100k

# Validate all JSON files
for file in templates/*.json; do
  echo "Validating $file"
  cat "$file" | jq . > /dev/null || echo "Invalid JSON: $file"
done

# Check for invalid characters
grep -r "'" templates/ # Check for smart quotes
grep -r """ templates/ # Check for smart quotes
```

#### Issue: Section group errors
**Symptoms**: Sections don't appear in correct groups
**Solutions**:
```json
// Add proper section groups in schema
{
  "name": "Product Information",
  "tag": "section", 
  "class": "section",
  "settings": [],
  "blocks": [],
  "group": "product"
}
```

### Metafields Issues

#### Issue: Metafields not displaying
**Symptoms**: Product metafields show as empty
**Solutions**:
```liquid
<!-- Check if metafield exists -->
{% if product.metafields.nutrition.facts %}
  {{ product.metafields.nutrition.facts }}
{% else %}
  <p>No nutrition information available</p>
{% endif %}

<!-- Use proper metafield syntax -->
{{ product.metafields.namespace.key.value }}
{{ product.metafields["namespace"]["key"] }}
```

### Debugging Strategies

#### Template Debugging
```liquid
<!-- Debug template variables -->
<script>
  console.log('Product:', {{ product | json }});
  console.log('Collection:', {{ collection | json }});
</script>

<!-- Debug liquid variables -->
{{ product | json }}
{{ settings | json }}
```

#### CSS Debugging
```css
/* Debug layout issues */
* {
  outline: 1px solid red !important;
}

/* Debug custom properties */
.debug {
  --debug-primary: var(--rs-color-primary, 'NOT_DEFINED');
  color: var(--debug-primary);
}
```

#### JavaScript Debugging
```javascript
// Debug cart state
console.log('Cart:', CartManager.getState());

// Debug event listeners
document.addEventListener('click', (e) => {
  console.log('Clicked:', e.target);
});

// Debug AJAX requests
fetch('/cart/add.js', options)
  .then(response => {
    console.log('Response:', response);
    return response.json();
  })
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### Recovery Procedures

#### Template Recovery
```bash
# If templates are broken, restore from backup
cp templates/product.json.backup templates/product.json

# Or use minimal working template
cat > templates/product.json << 'EOF'
{
  "sections": {
    "main": {
      "type": "main-product",
      "settings": {}
    }
  },
  "order": ["main"]
}
EOF
```

#### Section Recovery
```liquid
<!-- Minimal working section -->
<div class="section-{{ section.id }}">
  <h2>{{ section.settings.title | default: 'Default Title' }}</h2>
  <p>{{ section.settings.text | default: 'Default text' }}</p>
</div>

{% schema %}
{
  "name": "Simple Section",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Title"
    },
    {
      "type": "textarea",
      "id": "text", 
      "label": "Text"
    }
  ]
}
{% endschema %}
```

### Prevention Best Practices

#### Code Validation
```bash
# Always validate before uploading
# 1. JSON syntax check
jq . templates/*.json

# 2. Liquid syntax check (manual review)
grep -r "{% " sections/ snippets/

# 3. CSS validation
# Use browser dev tools or online validators

# 4. JavaScript validation  
# Use ESLint or browser console
```

#### Testing Checklist
- [ ] Product page loads
- [ ] Collection page loads  
- [ ] Cart functionality works
- [ ] Mobile responsive
- [ ] Cross-browser compatible
- [ ] Performance metrics acceptable
- [ ] Accessibility compliant

#### Backup Strategy
```bash
# Create backups before major changes
cp templates/product.json templates/product.json.backup
cp sections/main-product.liquid sections/main-product.liquid.backup

# Version control
git add .
git commit -m "Before major changes"
```

This troubleshooting guide covers the most common issues encountered during RecoverSups theme development and provides systematic solutions for quick recovery.