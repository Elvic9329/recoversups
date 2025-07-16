# RecoverSups Development Workflow

## 🚀 Guía Completa de Desarrollo

### Configuración del Entorno

El entorno de desarrollo está completamente configurado con las siguientes herramientas:

- **Shopify CLI**: Para desarrollo y deploy de temas
- **VS Code**: Con extensiones y configuración optimizada
- **Theme Check**: Validación automática de código
- **Live Reload**: Recarga automática durante desarrollo
- **Linting**: ESLint, Stylelint y Prettier configurados

---

## 📋 Comandos Principales

### 🔧 Desarrollo

```bash
# Iniciar entorno de desarrollo completo
npm run dev

# Iniciar servidor de desarrollo personalizado
node scripts/dev-server.js

# Servir tema con live reload
npm run theme:serve

# Compilar SASS y observar cambios
npm run sass:watch
```

### 🏗️ Build y Deploy

```bash
# Build completo del tema
npm run build

# Deploy a Shopify
npm run theme:push

# Pull del tema desde Shopify
npm run theme:pull
```

### 🔍 Validación y Testing

```bash
# Ejecutar todas las validaciones
npm test

# Theme Check
npm run theme:check

# Lint JavaScript
npm run lint:js

# Lint CSS/SCSS
npm run lint:css

# Formatear código
npm run format
```

---

## 📁 Estructura del Proyecto

```
recoversups/
├── .vscode/                 # Configuración de VS Code
│   ├── settings.json        # Settings del workspace
│   ├── extensions.json      # Extensiones recomendadas
│   ├── tasks.json          # Tareas automatizadas
│   └── launch.json         # Configuración de debugging
├── scripts/
│   └── dev-server.js       # Servidor de desarrollo personalizado
├── assets/                 # Archivos estáticos
│   ├── theme.css           # CSS principal
│   ├── global.js           # JavaScript principal
│   └── *.scss              # Archivos SASS
├── config/                 # Configuración del tema
├── layout/                 # Templates de layout
├── locales/                # Archivos de idiomas
├── sections/               # Secciones del tema
├── snippets/               # Snippets reutilizables
├── templates/              # Templates de páginas
├── .theme-check.yml        # Configuración de Theme Check
├── .eslintrc.js           # Configuración de ESLint
├── .prettierrc            # Configuración de Prettier
├── .stylelintrc.js        # Configuración de Stylelint
└── package.json           # Dependencias y scripts
```

---

## 🔄 Workflow de Desarrollo

### 1. Configuración Inicial

```bash
# Instalar dependencias
npm install

# Configurar Shopify CLI (si no está hecho)
shopify theme init

# Pull del tema actual
npm run theme:pull
```

### 2. Desarrollo Diario

```bash
# Iniciar entorno de desarrollo
npm run dev

# O usar el servidor personalizado
node scripts/dev-server.js
```

**Esto iniciará:**
- Servidor de Shopify con live reload
- Compilación automática de SASS
- Observación de cambios en archivos
- Validación automática con Theme Check

### 3. Desarrollo de Características

1. **Crear rama de feature**
```bash
git checkout -b feature/nueva-funcionalidad
```

2. **Desarrollar con live reload**
```bash
npm run dev
```

3. **Validar código**
```bash
npm test
```

4. **Commit y push**
```bash
git add .
git commit -m "feat: nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

### 4. Testing y Validación

```bash
# Ejecutar validaciones completas
npm test

# Revisar específicamente Theme Check
npm run theme:check

# Auto-corregir issues cuando sea posible
npm run theme:check:fix
```

### 5. Deploy

```bash
# Build de producción
npm run build

# Deploy a Shopify
npm run theme:push

# O deploy a un theme específico
shopify theme push --theme-id=123456789
```

---

## 🛠️ Herramientas y Extensiones

### VS Code Extensions (Auto-instaladas)

**Shopify Development:**
- Shopify Theme Check
- Shopify Liquid
- Liquid Language Support

**CSS/SCSS:**
- Live Sass Compiler
- SCSS IntelliSense
- CSS Class Completion

**JavaScript:**
- ESLint
- Prettier
- TypeScript Support

**Git & Productivity:**
- GitLens
- Git Graph
- Path Intellisense

### Theme Check Integration

- **Auto-validación**: Se ejecuta en cada save
- **Configuración personalizada**: `.theme-check.yml`
- **Integración con VS Code**: Errores mostrados inline
- **Auto-corrección**: Para issues solucionables automáticamente

---

## 📊 Performance Monitoring

### Herramientas Integradas

```bash
# Performance testing
npm run perf:test

# Lighthouse audit
lighthouse https://recoversups.myshopify.com --output=json
```

### Métricas Monitoreadas

- **Core Web Vitals**: FCP, LCP, CLS
- **Bundle Size**: CSS y JavaScript
- **Asset Optimization**: Imágenes y recursos
- **Theme Check Score**: Validación de calidad

---

## 🔧 Debugging

### VS Code Debugging

1. **Configurar breakpoints** en JavaScript
2. **Usar Debug Mode**: F5 o Ctrl+Shift+D
3. **Inspect elements** en Chrome DevTools
4. **Liquid debugging**: Usar `{% comment %}` tags

### Console Commands

```javascript
// Performance testing
RS.performanceTest.run();

// Responsive testing
RSTest.responsive.init();

// Web Vitals report
RS.webVitals.generateReport();
```

---

## 📝 Coding Standards

### JavaScript

```javascript
// Usar ESLint configuration
// Single quotes, semicolons, 2 spaces
const example = 'Hello World';

// Usar arrow functions
const handleClick = () => {
  console.log('Clicked');
};
```

### CSS/SCSS

```scss
// Usar design tokens
.component {
  color: var(--rs-color-primary);
  padding: var(--rs-spacing-md);
  
  &:hover {
    transform: translateY(-2px);
  }
}
```

### Liquid

```liquid
{%- comment -%}
  Use liquid tags for better performance
{%- endcomment -%}

{%- liquid
  assign product_count = collection.products.size
  if product_count > 0
    echo 'Products available'
  endif
-%}
```

---

## 🚨 Troubleshooting

### Problemas Comunes

**1. Shopify CLI no funciona**
```bash
# Verificar instalación
shopify version

# Reinstalar si es necesario
npm install -g @shopify/cli
```

**2. SASS no compila**
```bash
# Verificar sintaxis
npm run sass:build

# Limpiar cache
npm run clean
```

**3. Theme Check falla**
```bash
# Ver errores detallados
npm run theme:check

# Auto-corregir
npm run theme:check:fix
```

**4. Live reload no funciona**
```bash
# Reiniciar servidor
npm run dev

# Verificar puerto
netstat -tulpn | grep 9292
```

### Logs y Debugging

```bash
# Ver logs del servidor
npm run dev -- --verbose

# Theme Check con detalles
theme-check . --verbose

# Shopify CLI debug
shopify theme serve --verbose
```

---

## 📚 Recursos Adicionales

### Documentación

- [Shopify Theme Development](https://shopify.dev/themes)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [Theme Check Rules](https://shopify.dev/tools/theme-check)

### Herramientas

- **Shopify Partners**: Dashboard de desarrollo
- **Theme Inspector**: Chrome extension
- **Liquid Playground**: Online testing
- **Shopify CLI**: Documentación oficial

---

## 📋 Checklist de Desarrollo

### Antes de Commit

- [ ] Código validado con `npm test`
- [ ] Theme Check sin errores críticos
- [ ] Formatting aplicado con Prettier
- [ ] Performance testing ejecutado
- [ ] Responsive testing completado

### Antes de Deploy

- [ ] Build de producción exitoso
- [ ] Testing en ambiente de staging
- [ ] Performance benchmarks verificados
- [ ] Accessibility testing completado
- [ ] Cross-browser testing realizado

### Después de Deploy

- [ ] Monitoreo de Core Web Vitals
- [ ] Verificación de funcionalidad
- [ ] Testing de user flows críticos
- [ ] Monitoreo de errores en producción

---

**Configuración completada por DevOps Team RecoverSups**  
**Fecha**: 2025-01-16  
**Versión**: 1.0.0