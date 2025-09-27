# Documentación del Proyecto LareiraConf

Este documento proporciona una descripción general del proyecto LareiraConf, su estructura y cómo empezar a trabajar con él.

## ¿Qué es LareiraConf?

LareiraConf es un evento de tecnología que se celebra en Galicia. Este repositorio contiene el código fuente de la página web principal del evento.

## Estructura del Proyecto

El proyecto está construido con [Astro](https://astro.build/) y utiliza [Tailwind CSS](https://tailwindcss.com/) para el estilizado.

A continuación se describe la estructura de directorios más relevante:

-   **/public**: Contiene los assets estáticos como imágenes, fuentes y el favicon.
-   **/src**: Contiene el código fuente de la aplicación.
    -   **/src/components**: Contiene los componentes de Astro reutilizables que conforman las diferentes secciones de la página.
    -   **/src/layouts**: Contiene las plantillas de página, como la estructura principal `Layout.astro`.
    -   **/src/pages**: Contiene las páginas del sitio. `index.astro` es la página principal.
    -   **/src/styles**: Contiene los estilos CSS globales.
-   **astro.config.mjs**: El archivo de configuración de Astro.
-   **package.json**: Define los scripts y dependencias del proyecto.
-   **tailwind.config.js**: El archivo de configuración de Tailwind CSS.
-   **tsconfig.json**: El archivo de configuración de TypeScript.

## Cómo Empezar

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```
2.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    Esto iniciará un servidor de desarrollo en `http://localhost:4321`.

3.  **Compilar para producción**:
    ```bash
    npm run build
    ```
    Esto generará una versión estática del sitio en el directorio `dist/`.

## Scripts Disponibles

-   `npm run dev`: Inicia el servidor de desarrollo de Astro.
-   `npm run start`: Alias para `npm run dev`.
-   `npm run build`: Compila el sitio para producción.
-   `npm run preview`: Previsualiza la compilación de producción localmente.
-   `npm run astro`: Accede a la CLI de Astro.
