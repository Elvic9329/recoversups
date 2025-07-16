# RecoverSups Troubleshooting Guide

## 🚨 Guía de Resolución de Problemas

### Problemas de Configuración del Entorno

---

## 🔧 Shopify CLI

### Problema: `shopify: command not found`

**Síntomas:**
- Error al ejecutar comandos `shopify`
- CLI no reconocido en terminal

**Solución:**
```bash
# Verificar si está instalado
which shopify

# Instalar Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Verificar instalación
shopify version
```

**Alternativa con Ruby:**
```bash
# Si usas Ruby
gem install shopify-cli

# Verificar
shopify version
```

### Problema: `Authentication failed`

**Síntomas:**
- Error de autenticación al hacer `shopify theme serve`
- No puede acceder a la tienda

**Solución:**
```bash
# Logout y login nuevamente
shopify auth logout
shopify auth login

# Verificar conexión
shopify theme list
```

### Problema: `Theme not found`

**Síntomas:**
- Error al servir o hacer push del tema
- Tema no existe en Shopify

**Solución:**
```bash
# Listar temas disponibles
shopify theme list

# Crear nuevo tema de desarrollo
shopify theme init

# O conectar a tema existente
shopify theme pull --theme-id=123456789
```

---

## 🎨 SASS/CSS

### Problema: `sass: command not found`

**Síntomas:**
- Error al compilar SCSS
- Comando sass no reconocido

**Solución:**
```bash
# Instalar Sass globalmente
npm install -g sass

# O instalar localmente
npm install sass --save-dev

# Verificar instalación
sass --version
```

### Problema: SCSS no compila

**Síntomas:**
- Archivos .scss no se convierten a CSS
- Errores de sintaxis en SCSS

**Solución:**
```bash
# Verificar sintaxis
sass assets/theme.scss assets/theme.css --no-source-map

# Compilar con detalles
sass assets/:assets/ --style=expanded --no-source-map --verbose

# Verificar dependencias
npm list sass
```

### Problema: Variables SCSS no reconocidas

**Síntomas:**
- Error: `Undefined variable`
- Variables no disponibles en archivos

**Solución:**
```scss
// Verificar import de tokens
@import 'tokens';

// O usar CSS custom properties
:root {
  --rs-color-primary: #b62921;
}

.component {
  color: var(--rs-color-primary);
}
```

---

## 🔍 Theme Check

### Problema: `theme-check: command not found`

**Síntomas:**
- Comando no disponible
- Validación no funciona

**Solución:**
```bash
# Instalar Theme Check
gem install theme-check

# Verificar instalación
theme-check --version

# Ejecutar validación
theme-check .
```

### Problema: Too many offenses

**Síntomas:**
- Demasiados errores de validación
- Output abrumador

**Solución:**
```bash
# Filtrar solo errores críticos
theme-check . --severity=error

# Auto-corregir issues
theme-check . --auto-correct

# Configurar .theme-check.yml
echo "DeprecatedFilter: disable" >> .theme-check.yml
```

### Problema: Missing required template files

**Síntomas:**
- Error: template files missing
- Tema incompleto

**Solución:**
```bash
# Crear templates básicos
mkdir -p templates config locales

# Crear archivos requeridos
touch templates/404.liquid
touch templates/index.liquid
touch templates/product.liquid
touch templates/collection.liquid
touch templates/page.liquid
touch templates/blog.liquid
touch templates/article.liquid
touch templates/search.liquid
touch templates/cart.liquid
touch templates/list-collections.liquid
touch templates/password.liquid

# Crear configuración básica
echo '{}' > config/settings_schema.json
echo '{}' > locales/en.default.json
```

---

## 📱 Live Reload

### Problema: Live reload no funciona

**Síntomas:**
- Cambios no se reflejan automáticamente
- Página no se recarga

**Solución:**
```bash
# Verificar que el servidor esté corriendo
netstat -tulpn | grep 9292

# Reiniciar servidor
npm run dev

# Verificar configuración de VS Code
# File > Preferences > Settings > Auto Save > afterDelay
```

### Problema: Puerto 9292 en uso

**Síntomas:**
- Error: `Port 9292 already in use`
- No puede iniciar servidor

**Solución:**
```bash
# Encontrar proceso usando el puerto
lsof -ti:9292

# Matar proceso
kill -9 $(lsof -ti:9292)

# O usar puerto diferente
shopify theme serve --port=9293
```

### Problema: CORS errors

**Síntomas:**
- Errores de CORS en console
- Assets no cargan

**Solución:**
```bash
# Usar HTTPS para development
shopify theme serve --https

# O configurar proxy
shopify theme serve --host=0.0.0.0
```

---

## 🔤 JavaScript

### Problema: ESLint errors

**Síntomas:**
- Errores de linting en JavaScript
- Código no pasa validación

**Solución:**
```bash
# Instalar ESLint
npm install eslint --save-dev

# Configurar ESLint
npx eslint --init

# Corregir errores automáticamente
npx eslint assets/*.js --fix
```

### Problema: `RS is not defined`

**Síntomas:**
- Error en console de browser
- Variable global no encontrada

**Solución:**
```javascript
// Verificar que global.js esté cargado
// En theme.liquid:
<script src="{{ 'global.js' | asset_url }}" defer></script>

// O inicializar RS object
window.RS = window.RS || {};
```

---

## 🌐 VS Code

### Problema: Extensiones no funcionan

**Síntomas:**
- Liquid syntax no reconocida
- Theme Check no activo

**Solución:**
```bash
# Reinstalar extensiones
code --install-extension shopify.liquid
code --install-extension shopify.theme-check-vscode

# Verificar configuración
# Command Palette > Preferences: Open Settings (JSON)
```

### Problema: Intellisense no funciona

**Síntomas:**
- No hay autocomplete para Liquid
- Sugerencias no aparecen

**Solución:**
```json
// En .vscode/settings.json
{
  "liquid.engine": "shopify",
  "liquid.format.enable": true,
  "files.associations": {
    "*.liquid": "liquid"
  }
}
```

---

## 🔄 Git Workflow

### Problema: Git hooks failing

**Síntomas:**
- Commit rechazado por hooks
- Pre-commit checks fallan

**Solución:**
```bash
# Verificar theme check antes de commit
npm run theme:check

# Corregir issues
npm run theme:check:fix

# Bypass hooks (no recomendado)
git commit --no-verify
```

### Problema: Merge conflicts en assets

**Síntomas:**
- Conflictos en archivos CSS/JS
- Merge difícil de resolver

**Solución:**
```bash
# Stash cambios locales
git stash

# Pull cambios remotos
git pull origin main

# Aplicar cambios
git stash pop

# Resolver conflictos manualmente
# Luego rebuild
npm run build
```

---

## 🚀 Performance

### Problema: Slow theme loading

**Síntomas:**
- Tema carga lento
- Poor Core Web Vitals

**Diagnóstico:**
```bash
# Ejecutar performance test
npm run perf:test

# Lighthouse audit
lighthouse https://recoversups.myshopify.com

# Theme Check performance
theme-check . --severity=warning
```

**Solución:**
```javascript
// Verificar lazy loading
RS.lazyLoad.init();

// Performance monitoring
RS.performanceTest.run();
```

### Problema: Large bundle sizes

**Síntomas:**
- CSS/JS files muy grandes
- Slow loading

**Solución:**
```bash
# Analizar bundle size
du -sh assets/*.css assets/*.js

# Minificar CSS
sass assets/theme.scss assets/theme.css --style=compressed

# Optimizar imágenes
# Usar image_url filter con width/height
```

---

## 🔧 Debugging Commands

### Diagnóstico General

```bash
# Verificar todas las herramientas
shopify version
theme-check --version
sass --version
node --version
npm --version

# Status del proyecto
npm run test
git status
```

### Logs y Debugging

```bash
# Logs detallados
npm run dev -- --verbose

# Theme Check con detalles
theme-check . --verbose

# Shopify CLI debug
shopify theme serve --verbose --live-reload
```

### Console Commands (Browser)

```javascript
// Verificar RecoverSups objects
console.log(window.RS);
console.log(window.RSTest);

// Performance debugging
RS.performance.markers;
RS.webVitals.generateReport();

// Responsive testing
RSTest.responsive.init();
```

---

## 📋 Checklist de Diagnóstico

### Antes de Reportar un Bug

- [ ] Verificar que todas las dependencias estén instaladas (`npm install`)
- [ ] Ejecutar `npm test` para verificar estado general
- [ ] Revisar logs en terminal y browser console
- [ ] Verificar que Shopify CLI esté autenticado
- [ ] Probar en modo incógnito del browser
- [ ] Verificar que el tema esté sincronizado (`npm run theme:pull`)

### Información a Incluir en Bug Reports

```markdown
## Bug Report Template

**Descripción:** [Descripción del problema]

**Pasos para reproducir:**
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

**Comportamiento esperado:** [Qué debería pasar]

**Comportamiento actual:** [Qué está pasando]

**Entorno:**
- OS: [macOS/Windows/Linux]
- Node version: [resultado de `node --version`]
- Shopify CLI: [resultado de `shopify version`]
- Theme Check: [resultado de `theme-check --version`]

**Logs:**
```
[Pegar logs relevantes aquí]
```

**Screenshots:** [Si es aplicable]
```

---

## 🆘 Soporte Adicional

### Recursos Oficiales

- [Shopify Dev Docs](https://shopify.dev/themes)
- [Theme Check Documentation](https://shopify.dev/tools/theme-check)
- [Liquid Documentation](https://shopify.github.io/liquid/)

### Comunidad

- [Shopify Community](https://community.shopify.com/)
- [GitHub Issues](https://github.com/Shopify/theme-check/issues)
- [Discord Shopify Dev](https://discord.gg/shopifydev)

### Contacto Interno

- **DevOps Team**: Para issues de configuración
- **Frontend Team**: Para issues de código
- **QA Team**: Para issues de testing

---

**Troubleshooting Guide - RecoverSups DevOps Team**  
**Última actualización**: 2025-01-16  
**Versión**: 1.0.0