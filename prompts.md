# Recoversups.pe - Prompts para Claude Code

## Contexto Base del Proyecto
```markdown
Eres Claude Code trabajando en Recoversups.pe, una tienda de suplementos premium en Perú:
- Plataforma: Shopify 2.0 con templates JSON
- Enfoque: Rendimiento y experiencia de usuario
- Estándares: Cumplimiento WCAG 2.1 AA
- Metodología: Mobile-first, desarrollo basado en componentes
- Stack: Liquid, CSS moderno, JavaScript ES6+, SCSS
```

## Instrucciones de Uso
1. Copia el prompt completo de la tarea que quieres ejecutar
2. Pégalo en Claude Code
3. Claude Code analizará el contexto y ejecutará la tarea automáticamente

---

# EPIC 1: FOUNDATION & DESIGN SYSTEM

## Task 1.1.1: Design Tokens Setup

```markdown
Eres Claude Code implementando el sistema de design tokens para Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium en Perú)
- Plataforma: Shopify 2.0
- Prioridad: Crítica
- Estimación: 4 horas
- Rol: Design Systems Engineer

**Tu tarea:**
Implementar un sistema completo de design tokens como base del design system.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la implementación
2. **Leer design.md** para entender las guías visuales
3. **Crear sistema de tokens** con prefijo --rs- que incluya:
   - Colores (primario, secundario, acentos, semánticos)
   - Tipografía (escala, familias, pesos)
   - Espaciado y sistema de grid
   - Breakpoints responsive
   - Capas z-index
   - Transiciones y animaciones

**Subtareas a completar:**
- Implementar variables CSS de design.md
- Crear mixins para tipografía
- Configurar breakpoints responsive
- Implementar color scheme (light/dark)

**Criterios de éxito:**
- Sistema de tokens completo y escalable
- Soporte para modo oscuro
- Documentación clara de uso
- Optimización de rendimiento

**Testing requerido:**
- Visual regression testing
- Validación de tokens
- Pruebas de cambio de tema
- Revisión de documentación

**Archivos a crear/editar:**
- tokens.scss
- Documentación de tokens
- Ejemplos de uso

¡Comienza usando TodoWrite para planificar y luego implementa sistemáticamente!
```

## Task 1.1.2: Core Components Library

```markdown
Eres Claude Code creando la librería de componentes base para Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Crítica
- Estimación: 8 horas
- Dependencias: Task 1.1.1 (Design Tokens)
- Rol: UI Component Developer

**Tu tarea:**
Crear la librería de componentes fundamentales siguiendo el design system.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar el desarrollo
2. **Verificar tokens** de la tarea anterior estén listos
3. **Desarrollar componentes** base:
   - Sistema de botones (Primary, Secondary, Ghost)
   - Controles de formulario y validación
   - Cards y contenedores
   - Componentes de tipografía

**Subtareas a completar:**
- Buttons system (Primary, Secondary, Ghost)
- Form controls y validación
- Cards y contenedores
- Typography system

**Criterios de éxito:**
- Librería de componentes completa
- Documentación lista
- Tests visuales pasando
- Cumplimiento de accesibilidad WCAG 2.1

**Testing requerido:**
- Component visual testing
- Validación A11y
- Pruebas de rendimiento
- Tests cross-browser

**Archivos a crear:**
- components/ directory structure
- Archivos individuales de componentes
- Documentación de componentes
- Ejemplos de uso

¡Usa TodoWrite para organizar y luego implementa cada componente sistemáticamente!
```

## Task 1.2.1: Theme Architecture

```markdown
Eres Claude Code implementando la arquitectura base del tema para Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Crítica
- Estimación: 6 horas
- Dependencias: Tasks 1.1.1 y 1.1.2
- Rol: Theme Architect

**Tu tarea:**
Implementar la arquitectura base del tema optimizada para rendimiento.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la arquitectura
2. **Verificar dependencias** (tokens y componentes)
3. **Optimizar theme.liquid** y estructura base
4. **Implementar sistema responsive** y grid
5. **Configurar Critical CSS** y estrategia de carga

**Subtareas a completar:**
- theme.liquid optimización
- Layout base responsive
- Grid system implementation
- Critical CSS setup

**Criterios de éxito:**
- Arquitectura optimizada y escalable
- Métricas de rendimiento cumplidas
- Layout responsive funcionando
- Critical CSS implementado

**Testing requerido:**
- Layout responsiveness
- Performance testing
- Validación de tiempo de carga
- Testing móvil

**Archivos a crear/editar:**
- theme.liquid
- Sistema de layout base
- Configuración de Critical CSS
- Documentación de rendimiento

¡Enfócate en rendimiento y experiencia de usuario desde el inicio!
```

## Task 1.2.2: Development Environment

```markdown
Eres Claude Code configurando el entorno de desarrollo para Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Crítica
- Estimación: 4 horas
- Rol: DevOps Engineer

**Tu tarea:**
Configurar un entorno de desarrollo completo y workflow eficiente.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la configuración
2. **Instalar y configurar** Shopify CLI
3. **Configurar Git workflow** y mejores prácticas
4. **Configurar VS Code** con extensiones necesarias
5. **Integrar Theme check** para validación

**Subtareas a completar:**
- Shopify CLI setup
- Git workflow configuration
- VS Code settings
- Theme check integration

**Criterios de éxito:**
- Workflow de desarrollo funcionando
- Proceso de build configurado
- Theme check pasando
- Herramientas integradas

**Testing requerido:**
- Development workflow
- Proceso de build
- Validación de tema
- Funcionalidad de herramientas

**Archivos a crear/editar:**
- Configuración de desarrollo
- Documentación de setup
- Guía de workflow

¡Establece bases sólidas para desarrollo eficiente!
```

## 🧹 EPIC 1 - Cleanup & Review

```markdown
Eres Claude Code realizando limpieza y revisión completa del EPIC 1: Foundation & Design System.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe
- EPIC completado: Foundation & Design System
- Objetivo: Limpieza, optimización y validación final

**Tu tarea:**
Realizar una revisión completa y limpieza del EPIC 1 para asegurar calidad y consistencia.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la revisión
2. **Auditar archivos** creados en el EPIC 1:
   - Design tokens (tokens.scss)
   - Componentes base
   - Arquitectura del tema
   - Configuración de desarrollo

**Tareas de limpieza:**
- Eliminar código duplicado o innecesario
- Verificar consistencia en naming conventions
- Optimizar imports y dependencias
- Revisar documentación completa
- Validar cumplimiento de estándares
- Verificar que no hay conflictos entre archivos

**Verificaciones finales:**
- ✅ Design tokens funcionando correctamente
- ✅ Componentes base implementados
- ✅ Theme architecture optimizada
- ✅ Development environment configurado
- ✅ No hay duplicidades de código
- ✅ Naming conventions consistentes
- ✅ Documentación completa
- ✅ Performance optimizado

**Testing final:**
- Build completo sin errores
- Theme check pasando
- Performance metrics aceptables
- Accesibilidad validada

**Archivos a revisar:**
- Todos los archivos creados en EPIC 1
- Configuraciones y documentación
- Estructura de directorios

¡Asegúrate de que el foundation esté sólido antes de continuar!
```

---

# EPIC 2: CORE COMPONENTS

## Task 2.1.1: Header Base

```markdown
Eres Claude Code implementando el sistema de header para Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Crítica
- Estimación: 8 horas
- Dependencias: EPIC 1 completado
- Rol: Frontend Developer

**Tu tarea:**
Implementar el header principal con navegación completa y funcionalidad avanzada.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la implementación
2. **Revisar design system** del EPIC 1
3. **Implementar header responsive** con:
   - Logo y navegación principal
   - Menú responsive
   - Sticky behavior
   - Animations & transitions

**Subtareas a completar:**
- Logo y navegación principal
- Menú responsive
- Sticky behavior
- Animations & transitions

**Criterios de éxito:**
- Header responsive funcionando
- Performance optimizado
- Accesibilidad compliant
- Animaciones suaves

**Testing requerido:**
- Cross-browser testing
- Responsive en todos los dispositivos
- Performance metrics
- Validación A11y

**Archivos a crear/editar:**
- header.liquid
- header.scss
- header.js
- Documentación del componente

¡Prioriza UX y rendimiento en móviles!
```

## Task 2.1.2: Search Integration

```markdown
Eres Claude Code implementando el sistema de búsqueda para Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Alta
- Estimación: 6 horas
- Dependencias: Task 2.1.1 (Header Base)
- Rol: Frontend Developer

**Tu tarea:**
Implementar búsqueda predictiva integrada en el header.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la implementación
2. **Integrar con header** existente
3. **Implementar búsqueda predictiva** con:
   - Búsqueda predictiva
   - Filtros rápidos por categoría
   - Results layout optimizado
   - Keyboard navigation

**Subtareas a completar:**
- Búsqueda predictiva
- Filtros rápidos por categoría
- Results layout optimizado
- Keyboard navigation

**Criterios de éxito:**
- Búsqueda rápida y precisa
- UX intuitiva
- Performance optimizado
- Navegación por teclado

**Testing requerido:**
- Search functionality
- Performance de búsqueda
- UX testing
- Accesibilidad

**Archivos a crear/editar:**
- search.liquid
- search.scss
- search.js
- Integración con header

¡Enfócate en velocidad y precisión de resultados!
```

## Task 2.1.3: Cart Component

```markdown
Eres Claude Code implementando el sistema de carrito para Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Crítica
- Estimación: 10 horas
- Dependencias: Header system
- Rol: Frontend Developer

**Tu tarea:**
Implementar carrito drawer con funcionalidad avanzada y actualizaciones en tiempo real.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la implementación
2. **Crear cart drawer** con animaciones
3. **Implementar funcionalidad avanzada**:
   - Cart drawer implementation
   - Real-time updates con fetch API
   - Add to cart animations
   - Cart count badge

**Subtareas a completar:**
- Cart drawer implementation
- Real-time updates con fetch API
- Add to cart animations
- Cart count badge

**Criterios de éxito:**
- Drawer funcionando smoothly
- Updates en tiempo real
- Animaciones fluidas
- Sincronización perfecta

**Testing requerido:**
- Cart interactions
- API calls testing
- Animation performance
- Cross-device testing

**Archivos a crear/editar:**
- cart-drawer.liquid
- cart.scss
- cart.js
- API integration

¡Prioriza la experiencia fluida y feedback visual!
```

## Task 2.2.1: Product Card

```markdown
Eres Claude Code implementando las tarjetas de producto para Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Crítica
- Estimación: 8 horas
- Dependencias: Design system
- Rol: Frontend Developer

**Tu tarea:**
Crear tarjetas de producto optimizadas con funcionalidad avanzada.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la implementación
2. **Usar CSS Grid** para layout base
3. **Implementar funcionalidad**:
   - Diseño base con CSS Grid
   - Quick view modal
   - Hover effects
   - Loading states

**Subtareas a completar:**
- Diseño base con CSS Grid
- Quick view modal
- Hover effects
- Loading states

**Criterios de éxito:**
- Display limpio y atractivo
- Quick actions funcionando
- Imágenes optimizadas
- Interacciones smooth

**Testing requerido:**
- Visual regression
- Interaction testing
- Performance check
- Mobile optimization

**Archivos a crear/editar:**
- product-card.liquid
- product-card.scss
- product-card.js
- Modal components

¡Enfócate en conversión y experiencia visual!
```

## 🧹 EPIC 2 - Cleanup & Review

```markdown
Eres Claude Code realizando limpieza y revisión completa del EPIC 2: Core Components.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe
- EPIC completado: Core Components
- Objetivo: Limpieza, optimización y validación final

**Tu tarea:**
Realizar una revisión completa y limpieza del EPIC 2 para asegurar integración perfecta.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la revisión
2. **Auditar componentes** creados:
   - Header system completo
   - Search integration
   - Cart component
   - Product cards

**Tareas de limpieza:**
- Verificar integración entre componentes
- Eliminar código duplicado
- Optimizar assets y performance
- Revisar responsive behavior
- Validar interacciones entre componentes
- Verificar consistency en UX

**Verificaciones finales:**
- ✅ Header funcionando perfectamente
- ✅ Search integrado correctamente
- ✅ Cart operations fluidas
- ✅ Product cards optimizadas
- ✅ Integración entre componentes
- ✅ Performance optimizado
- ✅ UX consistente
- ✅ Responsive en todos los breakpoints

**Testing integration:**
- Flujo completo de navegación
- Add to cart desde product cards
- Search y navegación integrados
- Mobile experience completa

**Archivos a revisar:**
- Todos los componentes del EPIC 2
- Integraciones y dependencias
- Archivos de assets compartidos

¡Asegúrate de que los components trabajen juntos perfectamente!
```

---

# EPIC 3: HOME PAGE

## Task 3.1.1: Hero Carousel

```markdown
Eres Claude Code implementando el hero carousel para la homepage de Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Alta
- Estimación: 8 horas
- Dependencias: Core components
- Rol: Frontend Developer

**Tu tarea:**
Crear un hero carousel optimizado para performance y engagement.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la implementación
2. **Integrar con design system** existente
3. **Implementar carousel avanzado**:
   - Slider implementation
   - Content management
   - Responsive images
   - Performance optimization

**Subtareas a completar:**
- Slider implementation
- Content management
- Responsive images
- Performance optimization

**Criterios de éxito:**
- Carousel fluido y atractivo
- Content fácil de gestionar
- Imágenes responsive optimizadas
- Performance metrics excelentes

**Testing requerido:**
- Performance metrics
- Touch gestures en móvil
- Auto-play functionality
- Content management testing

**Archivos a crear/editar:**
- hero-carousel.liquid
- carousel.scss
- carousel.js
- Content management schema

¡Enfócate en first impression y Core Web Vitals!
```

## Task 3.2.1: Product Showcase

```markdown
Eres Claude Code implementando el showcase de productos destacados para Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Alta
- Estimación: 10 horas
- Dependencias: Product cards, Core components
- Rol: Frontend Developer

**Tu tarea:**
Crear sistema de showcase con filtrado y funcionalidad avanzada.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la implementación
2. **Reutilizar product cards** del EPIC 2
3. **Implementar showcase avanzado**:
   - Featured grid layout
   - Category filters
   - Sort functionality
   - Load more/pagination

**Subtareas a completar:**
- Featured grid layout
- Category filters
- Sort functionality
- Load more/pagination

**Criterios de éxito:**
- Grid responsive y atractivo
- Filtros funcionando perfectamente
- Sort rápido y preciso
- Load more smooth

**Testing requerido:**
- Grid functionality
- Filter performance
- Sort accuracy
- Pagination testing

**Archivos a crear/editar:**
- product-showcase.liquid
- showcase.scss
- showcase.js
- Filter integration

¡Maximiza la visibilidad y discoverability de productos!
```

## Task 3.3.1: Collection Banners

```markdown
Eres Claude Code implementando el sistema de banners de colecciones para Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Media
- Estimación: 6 horas
- Dependencias: Design system
- Rol: Frontend Developer

**Tu tarea:**
Crear sistema de banners atractivo para destacar colecciones.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la implementación
2. **Seguir design system** establecido
3. **Implementar banner system**:
   - Banner grid implementation
   - Custom labels & badges
   - Hover animations
   - Mobile optimization

**Subtareas a completar:**
- Banner grid implementation
- Custom labels & badges
- Hover animations
- Mobile optimization

**Criterios de éxito:**
- Banners visualmente atractivos
- Labels y badges dinámicos
- Animations fluidas
- Optimización móvil perfecta

**Testing requerido:**
- Visual testing
- Animation performance
- Mobile responsiveness
- Content management

**Archivos a crear/editar:**
- collection-banners.liquid
- banners.scss
- banners.js
- Content schema

¡Crea experiencia visual impactante para las colecciones!
```

## 🧹 EPIC 3 - Cleanup & Review

```markdown
Eres Claude Code realizando limpieza y revisión completa del EPIC 3: Home Page.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe
- EPIC completado: Home Page
- Objetivo: Homepage perfecta y optimizada

**Tu tarea:**
Revisar y optimizar la homepage completa asegurando experiencia cohesiva.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la revisión
2. **Auditar homepage completa**:
   - Hero carousel
   - Product showcase
   - Collection banners
   - Integración general

**Tareas de limpieza:**
- Verificar flujo completo de homepage
- Optimizar performance general
- Revisar spacing y layout consistency
- Validar responsive behavior
- Optimizar Core Web Vitals
- Verificar content management

**Verificaciones finales:**
- ✅ Hero carousel optimizado
- ✅ Product showcase funcionando
- ✅ Collection banners atractivos
- ✅ Layout cohesivo y consistente
- ✅ Performance excelente
- ✅ Mobile experience perfecta
- ✅ Content management fácil
- ✅ SEO optimizado

**Testing homepage completa:**
- Lighthouse score > 90
- Core Web Vitals optimizados
- User journey fluido
- Content loading optimizado

**Archivos a revisar:**
- Todos los components de homepage
- Layout general y spacing
- Performance optimization

¡Asegúrate de que la homepage cause excelente primera impresión!
```

---

# EPIC 4: PRODUCT EXPERIENCE

## Task 4.1.1: Media Gallery

```markdown
Eres Claude Code implementando la galería de medios para páginas de producto en Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Alta
- Estimación: 10 horas
- Dependencias: Core components
- Rol: Frontend Developer

**Tu tarea:**
Crear galería de medios avanzada con funcionalidad completa para productos.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la implementación
2. **Integrar con product templates** de Shopify 2.0
3. **Implementar galería avanzada**:
   - Image zoom functionality
   - Video integration
   - Mobile swipe gestures
   - Thumbnail navigation

**Subtareas a completar:**
- Image zoom functionality
- Video integration
- Mobile swipe gestures
- Thumbnail navigation

**Criterios de éxito:**
- Galería responsive y fluida
- Zoom smooth y preciso
- Videos integrados correctamente
- Touch gestures naturales

**Testing requerido:**
- Media interactions
- Touch gesture testing
- Performance en móvil
- Video loading optimization

**Archivos a crear/editar:**
- product-gallery.liquid
- gallery.scss
- gallery.js
- Media optimization

¡Enfócate en experiencia táctil y visual premium!
```

## Task 4.1.2: Product Info

```markdown
Eres Claude Code implementando la sección de información de producto para Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Crítica
- Estimación: 12 horas
- Dependencias: Media gallery
- Rol: Frontend Developer

**Tu tarea:**
Crear sección completa de información con funcionalidad específica para suplementos.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la implementación
2. **Enfocarse en suplementos** específicamente
3. **Implementar información completa**:
   - Nutrition facts table
   - Variant selector
   - Quantity picker
   - Subscription options

**Subtareas a completar:**
- Nutrition facts table
- Variant selector
- Quantity picker
- Subscription options

**Criterios de éxito:**
- Información nutricional clara
- Variant selection fluida
- Quantity picker intuitivo
- Subscription options funcionales

**Testing requerido:**
- Add to cart flow
- Variant selection testing
- Subscription functionality
- Nutrition data display

**Archivos a crear/editar:**
- product-info.liquid
- product-info.scss
- product-info.js
- Nutrition schema

¡Prioriza la información que los compradores de suplementos necesitan!
```

## 🧹 EPIC 4 - Cleanup & Review

```markdown
Eres Claude Code realizando limpieza y revisión completa del EPIC 4: Product Experience.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe
- EPIC completado: Product Experience
- Objetivo: Experiencia de producto optimizada

**Tu tarea:**
Revisar y optimizar la experiencia completa de página de producto.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la revisión
2. **Auditar página de producto completa**:
   - Media gallery functionality
   - Product information display
   - Add to cart flow
   - Mobile experience

**Tareas de limpieza:**
- Verificar integración gallery + info
- Optimizar performance de imágenes
- Revisar UX flow completo
- Validar datos de suplementos
- Optimizar conversion rate
- Verificar responsive design

**Verificaciones finales:**
- ✅ Gallery funcionando perfectamente
- ✅ Product info completa y clara
- ✅ Add to cart flow optimizado
- ✅ Mobile experience excelente
- ✅ Performance optimizado
- ✅ Nutrition facts precisos
- ✅ Variant selection fluida
- ✅ Conversion optimized

**Testing experience completa:**
- User journey desde discovery hasta cart
- Performance en mobile
- Nutrition information accuracy
- Subscription flow testing

**Archivos a revisar:**
- Product templates completos
- Media optimization
- Information architecture

¡Asegúrate de que la experiencia de producto maximice conversiones!
```

---

# EPIC 5: SUPPLEMENT FEATURES

## Task 5.1.1: Dosage Calculator

```markdown
Eres Claude Code implementando la calculadora de dosificación para Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Alta
- Estimación: 8 horas
- Dependencias: Product experience
- Rol: Frontend Developer

**Tu tarea:**
Crear calculadora inteligente de dosificación específica para suplementos.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la implementación
2. **Investigar dosificaciones** comunes de suplementos
3. **Implementar calculadora avanzada**:
   - Calculator interface
   - Formula implementation
   - Results display
   - Save preferences

**Subtareas a completar:**
- Calculator interface
- Formula implementation
- Results display
- Save preferences

**Criterios de éxito:**
- Calculadora precisa y confiable
- Interface intuitiva
- Resultados claros
- Preferencias guardadas

**Testing requerido:**
- Calculator accuracy
- Formula validation
- User interface testing
- Preference storage

**Archivos a crear/editar:**
- dosage-calculator.liquid
- calculator.scss
- calculator.js
- Formula algorithms

¡Enfócate en precisión y confiabilidad de las fórmulas!
```

## Task 5.1.2: Ingredient Database

```markdown
Eres Claude Code implementando la base de datos de ingredientes para Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Alta
- Estimación: 10 horas
- Dependencias: Product system
- Rol: Frontend Developer

**Tu tarea:**
Crear base de datos navegable de ingredientes con información detallada.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la implementación
2. **Crear estructura de datos** para ingredientes
3. **Implementar database navegable**:
   - Ingredient cards
   - Search & filter
   - Benefits display
   - Cross-reference system

**Subtareas a completar:**
- Ingredient cards
- Search & filter
- Benefits display
- Cross-reference system

**Criterios de éxito:**
- Database completa y precisa
- Search rápido y eficiente
- Benefits claramente mostrados
- Cross-references útiles

**Testing requerido:**
- Database functionality
- Search performance
- Information accuracy
- Navigation testing

**Archivos a crear/editar:**
- ingredient-database.liquid
- ingredients.scss
- ingredients.js
- Data structure

¡Crea recurso educativo valioso para clientes!
```

## 🧹 EPIC 5 - Cleanup & Review

```markdown
Eres Claude Code realizando limpieza y revisión completa del EPIC 5: Supplement Features.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe
- EPIC completado: Supplement Features
- Objetivo: Features especializados optimizados

**Tu tarea:**
Revisar y optimizar las características especializadas para suplementos.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la revisión
2. **Auditar features especializados**:
   - Dosage calculator functionality
   - Ingredient database
   - Integration con products
   - Educational value

**Tareas de limpieza:**
- Verificar accuracy de calculadora
- Validar database de ingredientes
- Optimizar performance de features
- Revisar educational content
- Verificar integration con productos
- Optimizar UX de tools

**Verificaciones finales:**
- ✅ Calculadora funcionando correctamente
- ✅ Database de ingredientes completa
- ✅ Integration con productos
- ✅ Educational value claro
- ✅ Performance optimizado
- ✅ UX intuitiva
- ✅ Data accuracy verificada
- ✅ Mobile optimization

**Testing specialized features:**
- Calculator accuracy testing
- Database search performance
- Educational content validation
- Integration testing

**Archivos a revisar:**
- Supplement-specific features
- Educational components
- Data accuracy validation

¡Asegúrate de que las features agreguen valor real a los clientes!
```

---

# EPIC 6: CART & CHECKOUT

## Task 6.1.1: Enhanced Cart Features

```markdown
Eres Claude Code implementando características avanzadas del carrito para Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Crítica
- Estimación: 12 horas
- Dependencias: Cart component, Product features
- Rol: Frontend Developer

**Tu tarea:**
Implementar características avanzadas del carrito para maximizar valor de pedido.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la implementación
2. **Extender cart drawer** existente
3. **Implementar features avanzadas**:
   - Cross-sell system
   - Bundle suggestions
   - Quantity updates
   - Shipping calculator

**Subtareas a completar:**
- Cross-sell system
- Bundle suggestions
- Quantity updates
- Shipping calculator

**Criterios de éxito:**
- Cross-sells relevantes y efectivos
- Bundle suggestions inteligentes
- Updates fluidos y rápidos
- Shipping calculator preciso

**Testing requerido:**
- Cart interactions
- Suggestion accuracy
- Update performance
- Calculator validation

**Archivos a crear/editar:**
- enhanced-cart.liquid
- cart-features.scss
- cart-features.js
- Recommendation engine

¡Enfócate en aumentar valor promedio de pedido!
```

## 🧹 EPIC 6 - Cleanup & Review

```markdown
Eres Claude Code realizando limpieza y revisión completa del EPIC 6: Cart & Checkout.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe
- EPIC completado: Cart & Checkout
- Objetivo: Conversion optimization completa

**Tu tarea:**
Revisar y optimizar todo el funnel de checkout para maximizar conversiones.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la revisión
2. **Auditar conversion funnel completo**:
   - Cart functionality avanzada
   - Checkout flow optimization
   - Payment integration
   - Conversion barriers

**Tareas de limpieza:**
- Optimizar conversion rate
- Eliminar friction en checkout
- Verificar payment flows
- Optimizar mobile checkout
- Revisar cart abandonment triggers
- Validar shipping calculations

**Verificaciones finales:**
- ✅ Cart features funcionando
- ✅ Checkout flow optimizado
- ✅ Payment integration correcta
- ✅ Mobile checkout perfecto
- ✅ Conversion rate maximizado
- ✅ Friction eliminado
- ✅ Shipping accurate
- ✅ Cart abandonment minimizado

**Testing conversion complete:**
- End-to-end purchase testing
- Mobile checkout experience
- Payment flow validation
- Cart abandonment analysis

**Archivos a revisar:**
- Complete checkout flow
- Cart optimization
- Payment integration

¡Asegúrate de que el checkout esté perfectamente optimizado!
```

---

# EPIC 7: OPTIMIZATION

## Task 7.1.1: Core Web Vitals

```markdown
Eres Claude Code optimizando Core Web Vitals para Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Alta
- Estimación: 8 horas
- Dependencias: Todos los EPICs anteriores
- Rol: Performance Engineer

**Tu tarea:**
Optimizar métricas de Core Web Vitals para performance excepcional.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la optimización
2. **Auditar performance actual** con Lighthouse
3. **Optimizar métricas específicas**:
   - Image optimization
   - Code splitting
   - Cache strategy
   - Loading optimization

**Subtareas a completar:**
- Image optimization
- Code splitting
- Cache strategy
- Loading optimization

**Criterios de éxito:**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Lighthouse score > 90

**Testing requerido:**
- Lighthouse scores
- Real user metrics
- Mobile performance
- Cross-device testing

**Archivos a optimizar:**
- Image loading strategy
- JavaScript bundles
- CSS optimization
- Cache configuration

¡Enfócate en métricas reales de usuario!
```

## Task 7.2.1: Technical SEO

```markdown
Eres Claude Code implementando SEO técnico para Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe (tienda de suplementos premium)
- Plataforma: Shopify 2.0
- Prioridad: Alta
- Estimación: 6 horas
- Dependencias: Site structure completa
- Rol: SEO/Analytics Specialist

**Tu tarea:**
Implementar SEO técnico completo para maximizar visibilidad en buscadores.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar la implementación
2. **Auditar SEO actual** del sitio
3. **Implementar optimizaciones técnicas**:
   - Schema markup
   - Meta optimization
   - Sitemap generation
   - Analytics setup

**Subtareas a completar:**
- Schema markup
- Meta optimization
- Sitemap generation
- Analytics setup

**Criterios de éxito:**
- Schema markup implementado
- Meta tags optimizados
- Sitemap funcionando
- Analytics tracking correctamente

**Testing requerido:**
- SEO validation
- Schema testing
- Analytics verification
- Search console setup

**Archivos a crear/editar:**
- Schema markup templates
- Meta tag optimization
- Analytics integration
- SEO documentation

¡Maximiza la visibilidad orgánica del sitio!
```

## 🧹 EPIC 7 - Final Cleanup & Launch Preparation

```markdown
Eres Claude Code realizando la limpieza final y preparación para lanzamiento de Recoversups.pe.

**Contexto del Proyecto:**
- Proyecto: Recoversups.pe
- EPIC completado: Optimization
- Objetivo: Sitio listo para producción

**Tu tarea:**
Realizar auditoría completa final y preparar el sitio para lanzamiento.

**Instrucciones específicas:**
1. **Usar TodoWrite** para planificar auditoría final
2. **Auditar sitio completo**:
   - Performance optimization
   - SEO implementation
   - Cross-browser compatibility
   - Mobile responsiveness
   - Accessibility compliance

**Tareas de cleanup final:**
- Verificar todos los EPICs completados
- Eliminar código de desarrollo/debug
- Optimizar assets finales
- Verificar all features funcionando
- Validar performance metrics
- Confirmar SEO implementation
- Testing completo cross-browser
- Verificar mobile experience
- Validar accessibility compliance

**Verificaciones de lanzamiento:**
- ✅ Todos los EPICs completados
- ✅ Performance optimizado (Lighthouse > 90)
- ✅ SEO técnico implementado
- ✅ Cross-browser compatible
- ✅ Mobile experience perfecto
- ✅ Accessibility WCAG 2.1 AA
- ✅ All features funcionando
- ✅ No errores en consola
- ✅ Analytics configurado
- ✅ Sitio listo para producción

**Testing de lanzamiento:**
- End-to-end testing completo
- Performance testing en producción
- SEO validation final
- Accessibility final testing
- Cross-device compatibility

**Documentación final:**
- Guía de mantenimiento
- Documentación técnica
- Guía de content management
- Performance monitoring setup

¡Asegúrate de que el sitio esté perfectamente listo para lanzamiento!
```

---

## 📋 Índice de Prompts por Prioridad

### 🔴 Críticas (Ejecutar primero)
- Task 1.1.1: Design Tokens Setup
- Task 1.1.2: Core Components Library  
- Task 1.2.1: Theme Architecture
- Task 1.2.2: Development Environment
- Task 2.1.1: Header Base
- Task 2.1.3: Cart Component
- Task 2.2.1: Product Card
- Task 4.1.2: Product Info
- Task 6.1.1: Enhanced Cart Features

### 🟡 Altas (Ejecutar después)
- Task 2.1.2: Search Integration
- Task 3.1.1: Hero Carousel
- Task 3.2.1: Product Showcase
- Task 4.1.1: Media Gallery
- Task 5.1.1: Dosage Calculator
- Task 5.1.2: Ingredient Database
- Task 7.1.1: Core Web Vitals
- Task 7.2.1: Technical SEO

### 🟢 Medias (Ejecutar al final)
- Task 3.3.1: Collection Banners

### 🧹 Cleanup (Ejecutar al terminar cada EPIC)
- EPIC 1 - Cleanup & Review
- EPIC 2 - Cleanup & Review  
- EPIC 3 - Cleanup & Review
- EPIC 4 - Cleanup & Review
- EPIC 5 - Cleanup & Review
- EPIC 6 - Cleanup & Review
- EPIC 7 - Final Cleanup & Launch Preparation

---

**Total de prompts creados: 24 prompts de tareas + 7 prompts de cleanup = 31 prompts**

¡Cada prompt está optimizado para que Claude Code ejecute automáticamente usando TodoWrite y siguiendo las mejores prácticas de desarrollo!