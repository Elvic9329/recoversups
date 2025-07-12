# TASK_MANAGER.md

## 🎯 Plan Maestro de Ejecución - RecoverSups Theme

### Estado del Proyecto
**Versión Actual:** 0.5 (Base funcional con problemas críticos)  
**Versión Objetivo:** 1.0 (Tema enterprise-grade completamente funcional)  
**Tiempo Total Estimado:** 8-10 semanas  
**Equipo:** 1 Senior Full-Stack Developer (Shopify Expert)

---

## 📋 FASE 1: CORRECCIÓN CRÍTICA Y REFACTORIZACIÓN (Semanas 1-2)

### - [ ] **TASK-001**
**ID:** CLEANUP-001  
**Título:** Eliminar conflictos de estructura y preparar base limpia  
**Descripción:** Eliminar archivos conflictivos, limpiar estructura de directorios y preparar la base para el desarrollo modular sin conflictos.  
**Archivos Involucrados:**
- `templates/theme.liquid` (ELIMINAR)
- Verificar referencias rotas en todo el codebase
- Limpiar imports CSS no utilizados

**Dependencias:** Ninguna  
**Tiempo Estimado:** 4 horas  
**Prioridad:** CRÍTICA  
**Prompt ID:** PROMPT-001

### - [ ] **TASK-002**
**ID:** CSS-REFACTOR-001  
**Título:** Crear estructura CSS modular y dividir theme.scss monolítico  
**Descripción:** Implementar arquitectura CSS modular usando archivos individuales para cada componente, siguiendo convenciones de naming de Shopify.  
**Archivos Involucrados:**
- `assets/base-reset.css` (CREAR)
- `assets/base-variables.css` (CREAR)
- `assets/base-typography.css` (CREAR)
- `assets/component-buttons.css` (CREAR)
- `assets/component-forms.css` (CREAR)
- `assets/utils-mixins.css` (CREAR)
- `assets/theme.scss.liquid` (REFACTORIZAR)

**Dependencias:** TASK-001  
**Tiempo Estimado:** 8 horas  
**Prioridad:** CRÍTICA  
**Prompt ID:** PROMPT-002

### - [ ] **TASK-003**
**ID:** CSS-BEM-001  
**Título:** Convertir CSS existente a metodología BEM pura  
**Descripción:** Refactorizar todas las clases CSS para usar exclusivamente metodología BEM, eliminando utility classes mixtas y estableciendo consistencia total.  
**Archivos Involucrados:**
- `sections/header.liquid` (MODIFICAR)
- `sections/footer.liquid` (MODIFICAR)
- `sections/featured-products.liquid` (MODIFICAR)
- `sections/hero-corousel.liquid` (MODIFICAR)
- `assets/section-header.css` (CREAR)
- `assets/section-footer.css` (CREAR)
- `assets/section-featured-products.css` (CREAR)
- `assets/section-hero.css` (CREAR)

**Dependencias:** TASK-002  
**Tiempo Estimado:** 12 horas  
**Prioridad:** ALTA  
**Prompt ID:** PROMPT-003

### - [ ] **TASK-004**
**ID:** JS-OPTIMIZATION-001  
**Título:** Optimizar JavaScript y implementar mejores prácticas  
**Descripción:** Refactorizar JavaScript existente, implementar event delegation, limpiar listeners no utilizados y modularizar código inline.  
**Archivos Involucrados:**
- `assets/theme.js` (REFACTORIZAR)
- `sections/header.liquid` (MOVER JS inline)
- `sections/hero-corousel.liquid` (MOVER JS inline)
- `assets/components-navigation.js` (CREAR)
- `assets/components-carousel.js` (CREAR)

**Dependencias:** TASK-001  
**Tiempo Estimado:** 10 horas  
**Prioridad:** ALTA  
**Prompt ID:** PROMPT-004

### - [ ] **TASK-005**
**ID:** PERFORMANCE-001  
**Título:** Implementar CSS crítico y lazy loading  
**Descripción:** Separar CSS crítico above-the-fold del CSS no crítico e implementar lazy loading para componentes no inmediatos.  
**Archivos Involucrados:**
- `assets/critical.css` (CREAR)
- `layout/theme.liquid` (MODIFICAR)
- `assets/non-critical.css` (CREAR)
- Todos los archivos CSS componentes (MODIFICAR)

**Dependencias:** TASK-002, TASK-003  
**Tiempo Estimado:** 6 horas  
**Prioridad:** ALTA  
**Prompt ID:** PROMPT-005

---

## 📋 FASE 2: COMPONENTES BASE CRÍTICOS (Semanas 2-3)

### - [ ] **TASK-006**
**ID:** COMPONENT-001  
**Título:** Crear snippet product-card universal y reutilizable  
**Descripción:** Desarrollar el componente product-card que sirva como base para todos los contextos: homepage, colecciones, recomendaciones, con variantes de diseño.  
**Archivos Involucrados:**
- `snippets/product-card.liquid` (CREAR)
- `assets/component-product-card.css` (CREAR)
- `assets/component-product-badge.css` (CREAR)

**Dependencias:** TASK-003  
**Tiempo Estimado:** 8 horas  
**Prioridad:** CRÍTICA  
**Prompt ID:** PROMPT-006

### - [ ] **TASK-007**
**ID:** COMPONENT-002  
**Título:** Crear cart drawer completo con funcionalidad AJAX  
**Descripción:** Implementar cart drawer lateral con funcionalidad AJAX completa, actualizaciones en tiempo real, upsells y optimización de conversión.  
**Archivos Involucrados:**
- `snippets/cart-drawer.liquid` (CREAR)
- `assets/component-cart-drawer.css` (CREAR)
- `assets/component-cart-drawer.js` (CREAR)
- `layout/theme.liquid` (MODIFICAR)

**Dependencias:** TASK-004, TASK-006  
**Tiempo Estimado:** 12 horas  
**Prioridad:** CRÍTICA  
**Prompt ID:** PROMPT-007

### - [ ] **TASK-008**
**ID:** COMPONENT-003  
**Título:** Crear snippets especializados para suplementos  
**Descripción:** Desarrollar componentes específicos de la industria: nutrition table, benefit icons, certification badges, flavor selector.  
**Archivos Involucrados:**
- `snippets/nutrition-table.liquid` (CREAR)
- `snippets/benefit-icons.liquid` (CREAR)
- `snippets/certification-badges.liquid` (CREAR)
- `snippets/flavor-selector.liquid` (CREAR)
- `assets/component-nutrition-table.css` (CREAR)
- `assets/component-benefit-icons.css` (CREAR)
- `assets/component-certification-badges.css` (CREAR)
- `assets/component-flavor-selector.css` (CREAR)

**Dependencias:** TASK-003  
**Tiempo Estimado:** 10 horas  
**Prioridad:** ALTA  
**Prompt ID:** PROMPT-008

---

## 📋 FASE 3: TEMPLATES Y PÁGINAS PRINCIPALES (Semanas 3-4)

### - [ ] **TASK-009**
**ID:** TEMPLATE-001  
**Título:** Crear template product.json y sección main-product completa  
**Descripción:** Desarrollar la página de producto completa con galería, información detallada, formulario de variantes, nutrition facts y recomendaciones.  
**Archivos Involucrados:**
- `templates/product.json` (CREAR)
- `sections/main-product.liquid` (CREAR)
- `sections/product-gallery.liquid` (CREAR)
- `sections/product-recommendations.liquid` (CREAR)
- `assets/page-product.css` (CREAR)
- `assets/section-main-product.css` (CREAR)

**Dependencias:** TASK-006, TASK-008  
**Tiempo Estimado:** 16 horas  
**Prioridad:** CRÍTICA  
**Prompt ID:** PROMPT-009

### - [ ] **TASK-010**
**ID:** TEMPLATE-002  
**Título:** Crear template collection.json con filtros avanzados  
**Descripción:** Implementar página de colección con grilla de productos y sistema de filtros específico para suplementos (objetivo, ingrediente, tipo, precio).  
**Archivos Involucrados:**
- `templates/collection.json` (CREAR)
- `sections/main-collection-product-grid.liquid` (CREAR)
- `sections/collection-filters.liquid` (CREAR)
- `snippets/filter-group.liquid` (CREAR)
- `assets/page-collection.css` (CREAR)
- `assets/component-filters.css` (CREAR)

**Dependencias:** TASK-006  
**Tiempo Estimado:** 14 horas  
**Prioridad:** CRÍTICA  
**Prompt ID:** PROMPT-010

### - [ ] **TASK-011**
**ID:** TEMPLATE-003  
**Título:** Crear template cart.json y página de carrito  
**Descripción:** Desarrollar página de carrito completa con funcionalidad AJAX, shipping calculator, upsells y optimización de conversión.  
**Archivos Involucrados:**
- `templates/cart.json` (CREAR)
- `sections/main-cart.liquid` (CREAR)
- `sections/cart-upsells.liquid` (CREAR)
- `assets/page-cart.css` (CREAR)
- `assets/component-cart-item.css` (CREAR)

**Dependencias:** TASK-007  
**Tiempo Estimado:** 10 horas  
**Prioridad:** ALTA  
**Prompt ID:** PROMPT-011

### - [ ] **TASK-012**
**ID:** TEMPLATE-004  
**Título:** Crear template search.json con búsqueda inteligente  
**Descripción:** Implementar página de búsqueda con resultados filtrados, búsqueda predictiva y resultados optimizados para suplementos.  
**Archivos Involucrados:**
- `templates/search.json` (CREAR)
- `sections/main-search.liquid` (CREAR)
- `snippets/search-results.liquid` (CREAR)
- `assets/page-search.css` (CREAR)
- `assets/component-search.js` (CREAR)

**Dependencias:** TASK-006  
**Tiempo Estimado:** 8 horas  
**Prioridad:** MEDIA  
**Prompt ID:** PROMPT-012

---

## 📋 FASE 4: SECCIONES ESPECIALIZADAS PARA SUPLEMENTOS (Semanas 4-5)

### - [ ] **TASK-013**
**ID:** SECTION-001  
**Título:** Crear sección "Shop by Goal" para homepage  
**Descripción:** Desarrollar sección visual que permita navegación por objetivos fitness con cards atractivos y conversión optimizada.  
**Archivos Involucrados:**
- `sections/shop-by-goal.liquid` (CREAR)
- `snippets/goal-card.liquid` (CREAR)
- `assets/section-shop-by-goal.css` (CREAR)
- `assets/component-goal-card.css` (CREAR)

**Dependencias:** TASK-003  
**Tiempo Estimado:** 6 horas  
**Prioridad:** ALTA  
**Prompt ID:** PROMPT-013

### - [ ] **TASK-014**
**ID:** SECTION-002  
**Título:** Crear sección Product Bundles con packs estratégicos  
**Descripción:** Implementar sección de packs y combos con descuentos, información de sinergia y add-all-to-cart functionality.  
**Archivos Involucrados:**
- `sections/product-bundles.liquid` (CREAR)
- `snippets/bundle-card.liquid` (CREAR)
- `assets/section-product-bundles.css` (CREAR)
- `assets/component-bundle-card.css` (CREAR)
- `assets/component-bundle-card.js` (CREAR)

**Dependencias:** TASK-006  
**Tiempo Estimado:** 10 horas  
**Prioridad:** ALTA  
**Prompt ID:** PROMPT-014

### - [ ] **TASK-015**
**ID:** SECTION-003  
**Título:** Crear sección Fitness Testimonials con transformaciones  
**Descripción:** Desarrollar sección de testimonios específicamente diseñada para mostrar transformaciones y resultados fitness.  
**Archivos Involucrados:**
- `sections/fitness-testimonials.liquid` (CREAR)
- `snippets/transformation-card.liquid` (CREAR)
- `assets/section-fitness-testimonials.css` (CREAR)
- `assets/component-transformation-card.css` (CREAR)

**Dependencias:** TASK-003  
**Tiempo Estimado:** 8 horas  
**Prioridad:** MEDIA  
**Prompt ID:** PROMPT-015

### - [ ] **TASK-016**
**ID:** SECTION-004  
**Título:** Crear sección Product Comparison  
**Descripción:** Implementar funcionalidad de comparación lado a lado de hasta 3 productos con tabla detallada.  
**Archivos Involucrados:**
- `sections/product-comparison.liquid` (CREAR)
- `snippets/comparison-table.liquid` (CREAR)
- `assets/section-product-comparison.css` (CREAR)
- `assets/component-comparison-table.css` (CREAR)
- `assets/component-comparison.js` (CREAR)

**Dependencias:** TASK-008  
**Tiempo Estimado:** 12 horas  
**Prioridad:** MEDIA  
**Prompt ID:** PROMPT-016

---

## 📋 FASE 5: CONTENIDO EDUCATIVO Y PÁGINAS ESPECIALES (Semanas 5-6)

### - [ ] **TASK-017**
**ID:** CONTENT-001  
**Título:** Crear template page.guide-supplements.json para contenido educativo  
**Descripción:** Desarrollar template especializado para guías y contenido educativo con navegación interna y call-to-actions estratégicos.  
**Archivos Involucrados:**
- `templates/page.guide-supplements.json` (CREAR)
- `sections/guide-content.liquid` (CREAR)
- `sections/guide-navigation.liquid` (CREAR)
- `sections/guide-related-products.liquid` (CREAR)
- `assets/page-guide.css` (CREAR)

**Dependencias:** TASK-006  
**Tiempo Estimado:** 8 horas  
**Prioridad:** MEDIA  
**Prompt ID:** PROMPT-017

### - [ ] **TASK-018**
**ID:** CONTENT-002  
**Título:** Implementar sistema de filtros avanzados específicos  
**Descripción:** Expandir filtros con opciones específicas: ingrediente activo, momento de consumo, nivel de experiencia, restricciones dietéticas.  
**Archivos Involucrados:**
- `sections/collection-filters.liquid` (EXPANDIR)
- `snippets/advanced-filters.liquid` (CREAR)
- `assets/component-advanced-filters.css` (CREAR)
- `assets/component-advanced-filters.js` (CREAR)

**Dependencias:** TASK-010  
**Tiempo Estimado:** 10 horas  
**Prioridad:** MEDIA  
**Prompt ID:** PROMPT-018

### - [ ] **TASK-019**
**ID:** CONTENT-003  
**Título:** Crear páginas de categorías especializadas  
**Descripción:** Desarrollar páginas landing para categorías principales con contenido educativo integrado.  
**Archivos Involucrados:**
- `templates/page.protein-guide.json` (CREAR)
- `templates/page.pre-workout-guide.json` (CREAR)
- `templates/page.creatine-guide.json` (CREAR)
- `sections/category-hero.liquid` (CREAR)
- `sections/category-education.liquid` (CREAR)

**Dependencias:** TASK-017  
**Tiempo Estimado:** 12 horas  
**Prioridad:** BAJA  
**Prompt ID:** PROMPT-019

---

## 📋 FASE 6: OPTIMIZACIÓN AVANZADA Y UX (Semanas 6-7)

### - [ ] **TASK-020**
**ID:** UX-001  
**Título:** Implementar micro-interacciones y animaciones  
**Descripción:** Añadir micro-interacciones que mejoren la experiencia de usuario sin comprometer performance.  
**Archivos Involucrados:**
- `assets/utils-animations.css` (CREAR)
- `assets/micro-interactions.js` (CREAR)
- Todos los componentes (AÑADIR ANIMACIONES)

**Dependencias:** TASK-005  
**Tiempo Estimado:** 8 horas  
**Prioridad:** MEDIA  
**Prompt ID:** PROMPT-020

### - [ ] **TASK-021**
**ID:** UX-002  
**Título:** Optimizar mobile experience y touch interactions  
**Descripción:** Perfeccionar la experiencia móvil con touch gestures, bottom navigation y mobile-specific optimizations.  
**Archivos Involucrados:**
- `assets/mobile-optimizations.css` (CREAR)
- `assets/touch-interactions.js` (CREAR)
- `snippets/mobile-bottom-nav.liquid` (CREAR)

**Dependencias:** TASK-003  
**Tiempo Estimado:** 10 horas  
**Prioridad:** ALTA  
**Prompt ID:** PROMPT-021

### - [ ] **TASK-022**
**ID:** UX-003  
**Título:** Implementar quick add to cart y quick view  
**Descripción:** Añadir funcionalidad de quick add y quick view para mejorar la experiencia de compra.  
**Archivos Involucrados:**
- `snippets/quick-view-modal.liquid` (CREAR)
- `assets/component-quick-view.css` (CREAR)
- `assets/component-quick-view.js` (CREAR)
- `snippets/product-card.liquid` (MODIFICAR)

**Dependencias:** TASK-006, TASK-009  
**Tiempo Estimado:** 12 horas  
**Prioridad:** MEDIA  
**Prompt ID:** PROMPT-022

---

## 📋 FASE 7: SEO, PERFORMANCE Y TÉCNICO (Semanas 7-8)

### - [ ] **TASK-023**
**ID:** SEO-001  
**Título:** Implementar SEO técnico completo y schema markup  
**Descripción:** Configurar SEO técnico avanzado con schema markup específico para e-commerce de suplementos.  
**Archivos Involucrados:**
- `snippets/seo-schema.liquid` (CREAR)
- `snippets/breadcrumbs.liquid` (CREAR)
- `layout/theme.liquid` (MODIFICAR)
- Todos los templates (AÑADIR SEO)

**Dependencias:** TASK-009, TASK-010  
**Tiempo Estimado:** 8 horas  
**Prioridad:** ALTA  
**Prompt ID:** PROMPT-023

### - [ ] **TASK-024**
**ID:** PERFORMANCE-002  
**Título:** Optimización completa de performance y Core Web Vitals  
**Descripción:** Implementar todas las optimizaciones de performance para alcanzar score >95 en PageSpeed.  
**Archivos Involucrados:**
- Todos los archivos CSS (MINIFICAR)
- Todos los archivos JS (OPTIMIZAR)
- `layout/theme.liquid` (AÑADIR OPTIMIZACIONES)
- `snippets/critical-css.liquid` (CREAR)

**Dependencias:** TASK-005  
**Tiempo Estimado:** 12 horas  
**Prioridad:** CRÍTICA  
**Prompt ID:** PROMPT-024

### - [ ] **TASK-025**
**ID:** ACCESSIBILITY-001  
**Título:** Audit completo de accesibilidad WCAG 2.1 AA  
**Descripción:** Realizar testing exhaustivo y corrección de todos los problemas de accesibilidad.  
**Archivos Involucrados:**
- Todos los archivos (AUDIT Y CORRECCIÓN)
- `snippets/accessibility-helpers.liquid` (CREAR)
- `assets/accessibility-improvements.css` (CREAR)

**Dependencias:** Todas las tareas previas  
**Tiempo Estimado:** 10 horas  
**Prioridad:** CRÍTICA  
**Prompt ID:** PROMPT-025

---

## 📋 FASE 8: TESTING, DOCUMENTACIÓN Y LAUNCH (Semana 8)

### - [ ] **TASK-026**
**ID:** TESTING-001  
**Título:** Testing completo cross-browser y dispositivos  
**Descripción:** Realizar testing exhaustivo en todos los browsers y dispositivos objetivo.  
**Archivos Involucrados:**
- Crear checklist de testing
- Documentar bugs encontrados
- Priorizar y corregir issues críticos

**Dependencias:** Todas las tareas previas  
**Tiempo Estimado:** 12 horas  
**Prioridad:** CRÍTICA  
**Prompt ID:** PROMPT-026

### - [ ] **TASK-027**
**ID:** DOCUMENTATION-001  
**Título:** Crear documentación completa para cliente  
**Descripción:** Desarrollar documentación completa de uso, customización y mejores prácticas.  
**Archivos Involucrados:**
- `THEME_GUIDE.md` (CREAR)
- `CUSTOMIZATION_GUIDE.md` (CREAR)
- `CONTENT_BEST_PRACTICES.md` (CREAR)
- `MAINTENANCE_GUIDE.md` (CREAR)

**Dependencias:** TASK-026  
**Tiempo Estimado:** 8 horas  
**Prioridad:** ALTA  
**Prompt ID:** PROMPT-027

### - [ ] **TASK-028**
**ID:** LAUNCH-001  
**Título:** Preparación final y launch checklist  
**Descripción:** Ejecutar checklist final de launch y preparar tema para producción.  
**Archivos Involucrados:**
- `config/settings_data.json` (CONFIGURAR)
- `config/settings_schema.json` (FINALIZAR)
- Crear backup del tema actual
- Ejecutar checklist de launch

**Dependencias:** TASK-027  
**Tiempo Estimado:** 6 horas  
**Prioridad:** CRÍTICA  
**Prompt ID:** PROMPT-028

---

## 📊 RESUMEN EJECUTIVO

### Métricas del Proyecto
- **Total de Tareas:** 28
- **Tiempo Total Estimado:** 260 horas (8.5 semanas a 30h/semana)
- **Archivos a Crear:** 85+
- **Archivos a Modificar:** 15+

### Distribución por Fase
| Fase | Tareas | Horas | % del Proyecto |
|------|---------|-------|----------------|
| 1. Corrección Crítica | 5 | 40h | 15% |
| 2. Componentes Base | 3 | 30h | 12% |
| 3. Templates Principales | 4 | 48h | 18% |
| 4. Secciones Especializadas | 4 | 36h | 14% |
| 5. Contenido Educativo | 3 | 30h | 12% |
| 6. Optimización UX | 3 | 30h | 12% |
| 7. SEO y Performance | 3 | 30h | 12% |
| 8. Testing y Launch | 3 | 26h | 10% |

### Objetivos de Performance
- **PageSpeed Score:** >95
- **Accessibility Score:** >98
- **SEO Score:** >95
- **Best Practices Score:** >95

### Dependencias Críticas
Las siguientes tareas son blockers para múltiples otras tareas:
- **TASK-001** (Cleanup): Bloquea todo el desarrollo
- **TASK-002** (CSS Modular): Bloquea todo el CSS
- **TASK-006** (Product Card): Bloquea todos los templates
- **TASK-007** (Cart Drawer): Bloquea experiencia de compra

### Risk Mitigation
- **Risk 1:** Retrasos en refactorización CSS → Buffer de 20% en estimaciones
- **Risk 2:** Bugs en AJAX cart → Testing temprano y exhaustivo
- **Risk 3:** Performance issues → Monitoring continuo durante desarrollo