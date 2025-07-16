# RecoverSups Development Guide for Claude 3.7

## Quick Start Instructions for Claude 3.7

### Initial Analysis Commands
When starting work on this project, always run these commands first:

```bash
# Check git status
git status

# Review current project structure
ls -la

# Check existing templates
ls templates/

# Review sections
ls sections/

# Check assets
ls assets/
```

### Essential File Reading Priority
1. **Always read first**: `design.md` - Contains complete design system
2. **Core templates**: `templates/product.json`, `templates/collection.json`, `templates/cart.json`
3. **Main sections**: `sections/main-product.liquid`, `sections/header.liquid`
4. **Design system**: `assets/design-tokens.css`, `assets/base-variables.css`

## Development Workflow

### Phase 1: Foundation Validation
```bash
# 1. Validate core templates exist and are functional
Read templates/product.json
Read templates/collection.json  
Read templates/cart.json

# 2. Check main sections
Read sections/main-product.liquid
Read sections/header.liquid
Read sections/footer.liquid

# 3. Verify design system
Read assets/design-tokens.css
Read design.md
```

### Phase 2: Component Development
```bash
# 1. Review existing components
Glob "snippets/*.liquid"
Glob "assets/component-*.css"

# 2. Test component functionality
Read snippets/product-card.liquid
Read assets/component-product-card.css

# 3. Validate JavaScript modules
Read assets/cart-manager.js
Read assets/theme.js
```

### Phase 3: Feature Implementation
```bash
# 1. Implement new features systematically
# 2. Test each component individually
# 3. Validate template integration
# 4. Check responsive design
# 5. Test performance impact
```

## File Structure Understanding

### Template System (JSON)
```json
{
  "sections": {
    "section_id": {
      "type": "section-name",
      "blocks": {
        "block_id": {
          "type": "block-type",
          "settings": {}
        }
      },
      "block_order": ["block_id"],
      "settings": {}
    }
  },
  "order": ["section_id"]
}
```

### Section Structure (Liquid)
```liquid
{% comment %}Section documentation{% endcomment %}

<section class="section-name" data-section="{{ section.id }}">
  {%- for block in section.blocks -%}
    {%- case block.type -%}
      {%- when 'block-type' -%}
        <!-- Block content -->
    {%- endcase -%}
  {%- endfor -%}
</section>

{% schema %}
{
  "name": "Section Name",
  "settings": [],
  "blocks": []
}
{% endschema %}
```

## Critical Development Rules

### 1. Template Structure Rules
- **NEVER** use arrays for blocks in JSON templates
- **ALWAYS** use objects with unique IDs for blocks
- **ALWAYS** include `block_order` array
- **VALIDATE** JSON syntax before saving

### 2. Liquid Syntax Rules
- **ESCAPE** all variables: `{{ variable | escape }}`
- **USE** proper comment syntax: `{% comment %}...{% endcomment %}`
- **AVOID** inline comments within Liquid tags
- **VALIDATE** all Liquid syntax

### 3. CSS Architecture Rules
- **USE** `--rs-` prefix for all custom properties
- **FOLLOW** BEM methodology for class names
- **IMPORT** base files before components
- **VALIDATE** CSS syntax and custom property references

### 4. JavaScript Rules
- **USE** ES6 modules and modern syntax
- **IMPLEMENT** error handling for all functions
- **AVOID** global variables
- **USE** event delegation for dynamic content

## Common Error Prevention

### JSON Template Errors
```bash
# Before editing any template:
Read templates/[template-name].json

# After editing:
# Validate JSON structure
# Check all block IDs are unique
# Verify block_order includes all blocks
```

### Liquid Syntax Errors
```bash
# Common issues to check:
# 1. Unclosed liquid tags
# 2. Invalid comment syntax
# 3. Missing escape filters
# 4. Incorrect pipe syntax
```

### CSS Issues
```bash
# Always verify:
# 1. Custom property references exist in design-tokens.css
# 2. BEM class naming consistency
# 3. Import order in manifest files
```

## Testing Checklist

### Template Testing
- [ ] Product page loads without errors
- [ ] Collection page displays products
- [ ] Cart functionality works
- [ ] All sections render properly
- [ ] Blocks can be added/removed in theme editor

### Responsive Testing
- [ ] Mobile layout (320px-768px)
- [ ] Tablet layout (768px-1024px)
- [ ] Desktop layout (1024px+)
- [ ] Cross-browser compatibility

### Performance Testing
- [ ] Core Web Vitals scores
- [ ] Image optimization
- [ ] CSS/JS minification
- [ ] Critical CSS implementation

## Shopify Development Commands

### Theme Development
```bash
# Install Shopify CLI
npm install -g @shopify/cli

# Connect to store
shopify theme dev

# Pull latest from store
shopify theme pull

# Push changes to store
shopify theme push
```

### File Operations
```bash
# Create new section
touch sections/new-section.liquid

# Create new snippet  
touch snippets/new-snippet.liquid

# Create component CSS
touch assets/component-new.css
```

## Design System Integration

### Using Design Tokens
```css
/* Always reference design tokens */
.component {
  background-color: var(--rs-color-background);
  color: var(--rs-color-foreground);
  padding: var(--rs-spacing-md);
  border-radius: var(--rs-radius-md);
  box-shadow: var(--rs-shadow-md);
}
```

### Color Usage
```css
/* Primary brand colors */
--rs-color-primary: #b62921;
--rs-color-secondary: #2c3e50;

/* Semantic colors */
--rs-color-success: #10b981;
--rs-color-warning: #f59e0b;
--rs-color-error: #ef4444;
```

## Debugging Strategies

### Template Issues
1. Simplify template to minimal working version
2. Add sections incrementally
3. Validate each addition
4. Check browser console for errors

### Liquid Errors
1. Use `{% comment %}` to isolate problematic code
2. Check variable existence with `{% if variable %}`
3. Use `| json` filter to debug object contents
4. Validate with Shopify's Liquid validator

### CSS Issues
1. Use browser dev tools to inspect computed styles
2. Verify custom property values
3. Check specificity conflicts
4. Validate CSS syntax

### JavaScript Errors
1. Use browser console for error messages
2. Add `console.log()` statements for debugging
3. Check event listeners are properly attached
4. Validate ES6 syntax compatibility

## Performance Optimization

### Critical CSS
```html
<!-- Inline critical CSS in <head> -->
<style>
{% include 'critical.css' %}
</style>
```

### Lazy Loading
```liquid
<!-- Lazy load non-critical images -->
<img loading="lazy" src="{{ image | image_url }}" alt="{{ image.alt }}">
```

### Asset Optimization
```liquid
<!-- Preload critical assets -->
{{ 'theme.css' | asset_url | preload_tag: as: 'style' }}
{{ 'theme.js' | asset_url | preload_tag: as: 'script' }}
```

## Commit Guidelines

### Commit Message Format
```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Scope: template, section, component, design, config

Examples:
feat(product): add nutrition facts table
fix(cart): resolve upsell display issue
docs(readme): update development guide
```

### Pre-commit Checklist
- [ ] All templates validate
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Performance impact assessed
- [ ] Documentation updated

This guide ensures systematic, error-free development for the RecoverSups theme.