# Guía de Fuentes - LareiraConf

## Ubicación de las Fuentes

Las fuentes están ubicadas en la carpeta `public/fonts/` para optimizar el rendimiento y facilitar su uso.

### Fuentes Disponibles:

1. **Nine By Five** - Fuente display/monospace
   - Archivos: `Nine-By-Five-NBP.ttf.eot`, `Nine-By-Five-NBP.ttf.woff`
   - Variable CSS: `--font-family-display`

2. **Square** - Fuente para headings
   - Archivo: `square.otf`
   - Variable CSS: `--font-family-heading`

## Cómo Usar las Fuentes

### En CSS usando variables:

```css
/* Para títulos principales/display */
.logo {
  font-family: var(--font-family-display);
}

/* Para headings */
h1, h2, h3 {
  font-family: var(--font-family-heading);
}

/* Para texto del cuerpo (fuente del sistema) */
body, p {
  font-family: var(--font-family-body);
}
```

### Directamente por nombre:

```css
.titulo-especial {
  font-family: 'Nine By Five', monospace;
}

.heading-principal {
  font-family: 'Square', sans-serif;
}
```

## Configuración

Las fuentes se configuran automáticamente al importar `src/styles/base.css` en tu componente, que incluye:
- `src/styles/fonts.css` - Definiciones @font-face
- `src/styles/variables.css` - Variables CSS de fuentes

## Notas Técnicas

- Las fuentes usan `font-display: swap` para mejor rendimiento
- Se sirven desde `public/fonts/` como archivos estáticos
- No pasan por el bundler de Webpack para evitar problemas de procesamiento
- URLs accesibles directamente: `/fonts/nombre-archivo.ext`
