# Instrucciones para GitHub Copilot - LareiraConf Main Page

Este documento proporciona una guía para los agentes de IA que trabajan en el código base de la página principal de LareiraConf.

## Arquitectura y Estructura del Proyecto

Este es un proyecto de [Astro](https://astro.build/) que integra diferentes tecnologías según la edición de la conferencia.

- **Edición 2025 (Legacy)**: Utiliza componentes nativos de Astro (`.astro`) con **Tailwind CSS** para el estilizado. Los archivos se encuentran en directorios con el sufijo `-2025` (p. ej., `src/components-2025`, `src/pages/2025`).
- **Nueva Versión (2026 y futuras)**: La nueva implementación se basará en **React + TypeScript** para los componentes, **SCSS** para los estilos y **GSAP** para las animaciones. Esta será la arquitectura principal para las nuevas características.

La estructura del proyecto está organizada para soportar múltiples ediciones:

- **Páginas**: El contenido se encuentra en `src/pages`. La página de inicio principal es `src/pages/index.astro`. Cada edición tiene su propio subdirectorio (p. ej., `src/pages/2025`).
- **Componentes**:
  - Componentes de Astro para la edición 2025: `src/components-2025`.
  - Componentes de React para la nueva versión: `src/components`.
- **Estilos**:
  - Estilos de Tailwind/CSS para la edición 2025: `src/styles-2025`.
  - Estilos SCSS para la nueva versión: `src/styles`.
- **Recursos Públicos**: Las imágenes y otros recursos estáticos se encuentran en `public`, con subdirectorios por edición como `public/archived-editions/2025`.

## Flujo de Trabajo de Desarrollo

1.  **Instalación**: Clona el repositorio e instala las dependencias usando `npm install`.
2.  **Desarrollo**: Inicia el servidor de desarrollo local con `npm start`. El sitio estará disponible en `http://localhost:4321`.
3.  **Commits**: Sigue la guía de [Commits Convencionales](https://www.conventionalcommits.org/). Esto es importante para mantener un historial de cambios limpio y legible.
    - Usa prefijos como `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`.
    - Ejemplo: `feat(speakers): add new speaker component`

## Convenciones y Patrones Específicos del Proyecto

- **Componentes de React (Nueva Versión)**: Serán la base para las nuevas funcionalidades. Se utilizarán para todo, desde secciones de página completas hasta pequeños elementos de la interfaz de usuario, aprovechando TypeScript para un tipado fuerte.
- **Animaciones con GSAP**: Las animaciones complejas y controladas por scroll se implementarán con la librería GSAP.
- **Estilos con SCSS**: Para la nueva versión, se utilizará SCSS para un estilizado más modular y potente.
- **Componentes de Astro (Legacy)**: Para la edición 2025, los componentes son la unidad fundamental de construcción.
- **Tailwind CSS (Legacy)**: Para la edición 2025, se utilizan las clases de utilidad de Tailwind CSS para estilizar los componentes.
- **Estructura Multi-Edición**: Al añadir o modificar contenido, es crucial colocar los archivos en los directorios correspondientes a la edición correcta para mantener el código base organizado.

## Dependencias Externas Clave

- **Astro**: El framework principal para construir el sitio.
- **React**: Librería para construir componentes en la nueva versión.
- **TypeScript**: Para el tipado estático en los componentes de React.
- **GSAP**: Para las animaciones avanzadas.
- **Tailwind CSS**: Para el estilizado en la edición 2025.
- **SCSS**: Para el estilizado en la nueva versión.
- **Prettier**: Para el formateo de código. Asegúrate de que tu editor esté configurado para formatear al guardar para mantener la consistencia del código.

## Puntos de Integración

- El contenido de los ponentes, patrocinadores y equipo a menudo se gestiona a través de archivos de datos (p. ej., JSON o directamente en los componentes de Astro). Al actualizar esta información, localiza el componente o archivo de datos apropiado.
- El sitio puede integrarse con servicios de terceros para la venta de entradas o la transmisión en vivo. Estas integraciones generalmente se encapsulan dentro de sus propios componentes de Astro.
