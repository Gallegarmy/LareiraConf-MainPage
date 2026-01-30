# Sección de Patrocinadores 2026

## Descripción

Esta es la nueva sección de patrocinadores para LareiraConf 2026, con un diseño temático que incluye avatares de personajes y carteles con logos.

## Estructura de archivos

- `SponsorCard2026.astro` - Componente individual para cada patrocinador
- `Sponsors2026.astro` - Sección completa con la distribución de patrocinadores
- `Sponsors2026.scss` - Estilos SCSS para los componentes

## Niveles de patrocinio

### Gran Maestro (1)
- Posición: Centro, destacado
- Tamaño: 150x150px avatar, cartel 320x280px
- Características: Animación de brillo, mayor prominencia

### Maestro Artesano (8)
- Posición: Alrededor del Gran Maestro
- Tamaño: 100x100px avatar, cartel 220x200px
- Distribución: Grid adaptable

### Oficial Artesano (2)
- Posición: Esquinas
- Tamaño: 70x70px avatar, cartel 160x140px
- Más discreto

## Uso del componente

### Ejemplo básico con placeholders (actual)

```astro
import Sponsors2026 from "@components/Sponsors/Sponsors2026.astro";

<Sponsors2026 />
```

### Ejemplo con datos reales

```astro
---
import Sponsors2026 from "@components/Sponsors/Sponsors2026.astro";
import LogoEmpresa from "@img/sponsors/empresa-logo.svg";
import AvatarEmpresa from "@img/sponsors/empresa-avatar.webp";
---

<!-- Editar el array de patrocinadores en Sponsors2026.astro -->
```

## Añadir un patrocinador real

1. Añade el logo a `/public/archived-editions/2026/sponsors/`
2. Añade el avatar (opcional) al mismo directorio
3. Edita `Sponsors2026.astro` y actualiza los arrays:

```typescript
const granMaestro = {
  name: "Nombre Empresa",
  tier: "gran-maestro" as const,
  logo: LogoEmpresa, // Importar arriba
  avatar: AvatarEmpresa, // Opcional
  web: "https://empresa.com",
  description: "Descripción breve",
};
```

## Estilos y personalización

Los estilos están en `Sponsors2026.scss` con:
- Efectos de hover y animaciones
- Responsive design
- Efecto de cinta adhesiva en los carteles
- Animación de brillo para el Gran Maestro
- Fondo de ambiente con gradientes de fuego

## Navegación

El header ya incluye el enlace a la sección:
- Icono: Shopping (🛍️)
- Enlace: `#sponsors`
- Se añade automáticamente al scroll

## TODO

- [ ] Añadir imágenes reales de patrocinadores
- [ ] Ajustar animaciones GSAP si es necesario
- [ ] Añadir interacciones avanzadas con scroll
- [ ] Optimizar imágenes para performance
