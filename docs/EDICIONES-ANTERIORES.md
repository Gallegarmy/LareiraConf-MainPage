# Sistema de Ediciones Anteriores - LareiraConf

## Descripción

Este sistema permite mantener un archivo histórico de todas las ediciones de LareiraConf, preservando el diseño, contenido e imágenes de cada año.

## Estructura del Sistema

```
src/
├── pages/
│   ├── index.astro                    # Página principal (edición actual)
│   ├── nueva-edicion.astro            # Plantilla para próximas ediciones
│   └── past-editions/
│       ├── index.astro                # Lista de todas las ediciones anteriores
│       └── 2025/
│           └── index.astro            # Edición archivada de 2025

public/
└── archived-editions/
    └── 2025/                          # Assets específicos de la edición 2025
```

## Cómo Archivar una Nueva Edición

### 1. Preparar la nueva edición a archivar

Antes de archivar una edición, asegúrate de que:
- Todos los assets (imágenes, documentos) estén en su lugar
- La página funciona correctamente
- Todo el contenido está actualizado

### 2. Crear la carpeta de la nueva edición

```bash
# Ejemplo para archivar la edición 2026
mkdir -p src/pages/past-editions/2026
mkdir -p public/archived-editions/2026
```

### 3. Copiar la página principal

```bash
# Copiar el contenido actual a la nueva edición archivada
cp src/pages/index.astro src/pages/past-editions/2026/index.astro
```

### 4. Modificar la página archivada

Edita `src/pages/past-editions/2026/index.astro`:

1. **Actualizar el título**:
   ```astro
   <Layout title="Lareira Conf 2026 - Edición Archivada">
   ```

2. **Agregar el banner de edición archivada** al inicio del contenido:
   ```astro
   <!-- Banner de edición archivada -->
   <div class="archive-banner border-b-8 border-black p-4 text-center mb-6">
     <h3 class="text-xl font-bold mb-2">📚 Edición Archivada - 2026</h3>
     <p class="mb-3">Esta es la versión archivada de LareiraConf 2026</p>
     <div class="flex justify-center gap-4 flex-wrap">
       <a href="/past-editions/" class="btn-3d">← Ver todas las ediciones</a>
       <a href="/" class="btn-3d main-btn">🏠 Ir a la edición actual</a>
     </div>
   </div>
   ```

3. **Agregar estilos para el banner**:
   ```astro
   <style>
     .archive-banner {
       background-color: #ffd700;
       color: #000;
       position: sticky;
       top: 88px;
       z-index: 9;
     }
   </style>
   ```

### 5. Actualizar la lista de ediciones

Edita `src/pages/past-editions/index.astro` y agrega la nueva edición al array:

```javascript
const editions = [
  // Nueva edición (se muestra primero)
  {
    year: "2026",
    title: "LareiraConf 2026",
    description: "Descripción de la edición 2026",
    date: "DD.MM.26",
    location: "A Coruña",
    href: "/past-editions/2026/",
    thumbnail: "/images/2026-thumbnail.jpg"
  },
  // Ediciones anteriores...
  {
    year: "2025",
    title: "LareiraConf 2025",
    description: "El encuentro tech que enciende ideas y conecta comunidades",
    date: "22.03.25",
    location: "A Coruña",
    href: "/past-editions/2025/",
    thumbnail: "/images/1500x500.jpg"
  }
];
```

### 6. Copiar assets específicos (si es necesario)

Si hay assets específicos de la edición, cópialos:

```bash
# Ejemplo: copiar imágenes específicas de la edición
cp -r public/images/speakers-2026 public/archived-editions/2026/
cp -r public/images/sponsors-2026 public/archived-editions/2026/
```

### 7. Actualizar la página principal

Modifica `src/pages/index.astro` con el contenido de la nueva edición o usa la plantilla `nueva-edicion.astro` como base.

## Navegación

El sistema incluye navegación automática:

- **Header**: Enlace "Ediciones anteriores" en el menú principal
- **Páginas archivadas**: Banner superior con enlaces de navegación
- **Lista de ediciones**: Vista de todas las ediciones con enlaces directos

## Mantenimiento

### Verificar enlaces

Después de archivar una edición, verifica:
- [ ] La nueva edición archivada se muestra correctamente
- [ ] El banner de navegación funciona
- [ ] Los enlaces en la lista de ediciones son correctos
- [ ] Las imágenes y assets se cargan correctamente

### SEO y metadatos

Cada edición archivada mantiene sus metadatos originales, lo que ayuda con:
- Conservación del SEO histórico
- Indexación en motores de búsqueda
- Enlaces entrantes existentes

## Ejemplo Completo: Archivar Edición 2026

```bash
# 1. Crear directorios
mkdir -p src/pages/past-editions/2026
mkdir -p public/archived-editions/2026

# 2. Copiar página principal
cp src/pages/index.astro src/pages/past-editions/2026/index.astro

# 3. Editar la página archivada (agregar banner, actualizar título)
# 4. Actualizar lista de ediciones
# 5. Copiar assets si es necesario
# 6. Actualizar página principal para nueva edición

# 7. Probar que todo funciona
npm run dev
```

## Notas Importantes

- **Preservación**: Cada edición mantiene su diseño, contenido y funcionalidad original
- **Assets**: Las imágenes y archivos se conservan en sus ubicaciones originales
- **Navegación**: Sistema coherente entre todas las ediciones
- **SEO**: Los metadatos se preservan para mantener el valor SEO
- **Responsive**: El diseño se mantiene responsivo en todas las ediciones

## Futuras Mejoras

Posibles mejoras al sistema:
- [ ] Generación automática de thumbnails
- [ ] Sistema de tags por edición
- [ ] Búsqueda entre ediciones
- [ ] Estadísticas de cada edición
- [ ] Timeline visual de todas las ediciones
