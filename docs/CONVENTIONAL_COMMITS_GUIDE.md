# Guía de Conventional Commits - LaReiraConf

## Estructura Completa de Conventional Commits

### Formato:
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Tipos principales:

- **`feat:`** - Nueva funcionalidad
- **`fix:`** - Corrección de bugs
- **`docs:`** - Solo cambios en documentación
- **`style:`** - Cambios que no afectan el significado del código (espacios, formato, etc.)
- **`refactor:`** - Cambio de código que no es ni fix ni feature
- **`test:`** - Agregar o corregir tests
- **`chore:`** - Cambios en build, dependencias, etc.

### Ejemplos para LareiraConf:

```bash
# Funcionalidades
git commit -m "feat: add speaker registration form"
git commit -m "feat(agenda): implement schedule timeline component"

# Correcciones
git commit -m "fix: resolve mobile navigation menu issue"
git commit -m "fix(fonts): correct font loading path"

# Documentación
git commit -m "docs: add component usage examples"
git commit -m "docs(fonts): create font configuration guide"

# Estilos
git commit -m "style: format CSS with consistent indentation"
git commit -m "style(header): improve responsive layout"

# Refactoring
git commit -m "refactor: extract reusable button component"
git commit -m "refactor(utils): simplify date formatting functions"

# Tests
git commit -m "test: add unit tests for speaker component"
git commit -m "test(api): add integration tests for registration"

# Tareas de mantenimiento
git commit -m "chore: update dependencies to latest versions"
git commit -m "chore(build): configure webpack for production"
```

## Commits BREAKING CHANGES

Para cambios que rompen compatibilidad:

```bash
git commit -m "feat!: change API response format

BREAKING CHANGE: The API now returns data in a different structure"

# O con scope
git commit -m "feat(api)!: redesign authentication flow"
```

## Scopes Sugeridos para LaReiraConf

- `(header)` - Componentes del header
- `(footer)` - Componentes del footer
- `(speakers)` - Sección de speakers
- `(agenda)` - Sección de agenda
- `(sponsors)` - Sección de sponsors
- `(fonts)` - Configuración de fuentes
- `(styles)` - Sistema de estilos
- `(api)` - Integraciones API
- `(build)` - Configuración de build
- `(deps)` - Dependencias
