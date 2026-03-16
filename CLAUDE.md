# CLAUDE.md — LareiraConf'26

Sitio web de la conferencia tecnológica LareiraConf 2026 (A Coruña, España). Estética retro pixelada con tema de "lareira" (hogar de fuego). Scroll horizontal con 9 paneles, bilingüe ES/GL.

## Stack

- **Framework:** Astro 5 (SSR con adaptador Node.js)
- **UI:** React 19 (componentes interactivos), Astro (estructura estática)
- **Estilos:** Tailwind CSS 3 + SCSS/Sass (híbrido)
- **Animaciones:** GSAP 3 + ScrollTrigger
- **i18n:** Sistema propio ES (default) / GL (`/gl/` prefix)
- **Build:** Vite + PostCSS + astro-compress

## Comandos

```bash
npm run dev      # Servidor local con hot reload
npm run build    # Build de producción
npm run preview  # Preview del build
```

## Arquitectura

```
src/
├── components/          # Componentes React/Astro activos (2026)
│   ├── Home/            # Sección hero con parallax y partículas
│   ├── Speakers/        # Galería de ponentes
│   ├── Sponsors/        # Patrocinadores por tiers
│   ├── Team/            # Equipo organizador
│   ├── Tickets/         # Venta de entradas
│   ├── Agenda/          # Programa del evento
│   ├── FAQ/             # Preguntas frecuentes
│   ├── Communities/     # Comunidades colaboradoras
│   └── Others/          # Header, Footer, utilidades
├── components-2025/     # Legado archivado — NO modificar
├── pages/
│   ├── index.astro      # Homepage principal (2026)
│   ├── landing-26.astro # Landing alternativa
│   └── gl/              # Rutas en gallego
├── styles/              # CSS global y por sección
├── i18n/                # es.json, gl.json, agenda configs
├── data/                # tickets.json
├── services/            # googleSheets.ts
└── img/                 # Assets por sección
```

**Scroll:** Vertical del usuario → movimiento horizontal de 9 paneles via GSAP ScrollTrigger. En mobile: scroll vertical directo.

**Componente clave:** `HorizontalScroll` gestiona todos los paneles. Las secciones se pasan como hijos.

## Convenciones de código

```typescript
// ✅ Patrón correcto
import { ReactNode, useRef, useEffect } from "react";
import "@styles/component.css";

interface ComponentProps {
  lang: string;
  title?: string;
}

const Component = (props: ComponentProps): ReactNode => {
  const { lang, title = "" } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // lógica GSAP
    return () => { /* cleanup */ };
  }, []);

  return <div ref={ref}>{/* JSX */}</div>;
};

export default Component;
```

- **No importar React** en cada componente (configurado automáticamente)
- **Interfaces** para todas las props, nunca `React.FC<Props>`
- **Destructuring** de props en la primera línea del componente
- **Cleanup** siempre en el return de useEffect (matar animaciones GSAP)
- **Validar refs**: `if (!ref.current) return;` antes de usarlos

## i18n

```typescript
import { useTranslations, type Locale } from "@/i18n/utils";

const t = useTranslations(lang as Locale);
t("section.key") // acceso por dot notation a es.json / gl.json
```

Cada página Astro recibe `lang` como prop y lo pasa a todos los componentes hijos.

## Estilos

- **Tailwind** para layout, spacing, flexbox, colores utilitarios
- **CSS global** para variables root y efectos complejos
- Cada sección tiene su propio `.css` en `src/styles/`
- **Variables CSS:**
  ```css
  --primary: #1e1e1e
  --secondary: #584e46
  --accent: #e95c3c
  --light-orange: #ff8906
  ```
- **Tailwind custom:**
  - `font-logo` (Square), `font-title` (Nine-By-Five), `font-body`
  - `text-accent` (#e95c3c)
  - `shadow-lg` / `shadow-sm` → sombras duras estilo 8-bit

## Alias de imports

```typescript
@components → src/components/
@styles     → src/styles/
@assets     → src/assets/
@img        → src/img/
@/i18n      → src/i18n/
```

## Commits

Seguir **Conventional Commits** en inglés. Scopes disponibles: `home`, `speakers`, `sponsors`, `team`, `tickets`, `agenda`, `faq`, `communities`, `scroll`, `i18n`, `styles`, `deps`, `docs`.

```bash
feat(speakers): add speaker card hover animation
fix(scroll): correct horizontal panel width calculation
refactor(sponsors): extract tier data to config file
docs: update implementation plan
```

Orden recomendado para PRs grandes: deps → components → styles → integrations → docs.

## Troubleshooting GSAP/animaciones

| Síntoma | Verificar |
|---|---|
| Componente no visible | z-index, `position: fixed/absolute`, timing del trigger |
| Scroll no funciona | `overflow: hidden` vs `overflow-x: auto`, tipo de ScrollTrigger |
| Pantalla negra | Posicionamiento CSS o timing de animación |
| Funciona en navegador pero no en dispositivo | Simplificar la animación |

Si 3 intentos con el mismo enfoque no funcionan → cambiar estrategia.

## Docs de referencia

- `docs/Definición.md` — Spec completa del proyecto y narrativa
- `docs/CODING_CONVENTIONS.md` — Convenciones TypeScript/React
- `docs/CONVENTIONAL_COMMITS_GUIDE.md` — Guía de commits
- `docs/PLAN_IMPLEMENTACION.md` — Estado y roadmap del proyecto
- `docs/I18N.md` — Detalles del sistema de traducción
- `docs/GOOGLE_SHEETS_SETUP.md` — Configuración API Sheets (sorteos)

## Estado actual (rama: feat/add-collabs)

Trabajo activo en sección de colaboradores/patrocinadores. Secciones completadas: Home, Tickets, Speakers, Agenda, Sponsors, Team, Communities, FAQ, Footer.
