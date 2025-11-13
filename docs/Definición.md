---

project: LareiraConf'26
spec_version: 0.1.0
author: Andrea + ChatGPT
date: 2025-10-10
format: markdown
build_target: "React + SCSS (GitHub Pages)"
i18n: [es, gl]
content_source: markdown_files
------------------------------

# LareiraConf'26 — Especificación de la web (v0.1)

> **Objetivo**: Documento de definición para alimentar un MCP que genere el código de la web. Incluye estructura, contenidos, copy guía, animaciones, interacciones, y convenciones de archivos.

## 1) Stack, entrega e internacionalización

* **Framework**: React 18 con TypeScript (sin SSR).
* **Estilos**: SCSS modular (estructura 7-1, ver §8).
* **Animaciones**: CSS + utilidades pequeñas en JS (IntersectionObserver + `requestAnimationFrame`). Se permite framer-motion como opcional (flag).
* **Contenido**: Secciones en Markdown plano (sin frontmatter). Datos (speakers, guilds…) en Markdown con frontmatter YAML.
* Idiomas **ES** y **GL** (carpetas `content/es` y `content/gl`).
* **Hosting**: GitHub Pages (SPA con `hashRouter` o `basename` + 404.html fallback).
* **Accesibilidad**: Contenido AA; elementos puramente decorativos pueden no ser anunciados (role="presentation" / `aria-hidden="true"`).

## 2) Estética y tono

* **Tema**: Retro **oscuro** (dark-only), acentos **naranja** (#FF6A00), partículas de fuego y antorchas.
* **Tipografías**: Display retro (e.g. "Press Start 2P") + cuerpo legible (Inter/SF). Cargar con `font-display: swap`.
* **Mascota (Lumi)**: voz cercana y un punto macarra; mezcla castellano con guiños en gallego. Narrativa: miedo a que “a lareira” se apague y esperanza de reavivarla.
* **Slogan provisional**: “Únete á aventura e recupera a chama / Únete a la aventura y recupera la llama”.

## 3) Navegación y flujo (scroll horizontal)
- **Visión**: experiencia side-scroller con **parallax**. No hay salto automático entre secciones; el usuario controla la progresión continua.

### 3.1 Modelo de desplazamiento
- **Desktop/Tablet (≥768px)**: landing en **scroll horizontal continuo**.
  - Contenedor `#rail` con secciones de ancho `100vw` (o múltiplos) en fila.
  - **Mapeo de scroll**: rueda vertical ⇒ `scrollLeft` con suavizado (inercia leve) **sin** snapping obligatorio.
  - **Snapping**: desactivado (`scroll-snap-type: none`). Opción `proximity` accesible desde ajustes.
  - **Teclado**: ← → desplazan ±80vw con easing; mantener pulsado aplica auto-repeat con desaceleración al soltar.
  - **Minimapa**: HUD superior con el “nivel” y checkpoints (secciones). Clic salta a anclas con scroll animado.
- **Móvil (<768px)**: scroll **vertical** con micro-parallax interno. Botones “Anterior/Siguiente” fijados en el borde inferior.
- **Foco/Accesibilidad**: cada sección es un `region` con `aria-label`. Atajo `?` abre ayuda de atajos.

### 3.2 Capas Parallax
- **Escena global**: exterior nocturno con cielo estrellado; “O Apagón” (ente) insinúa su presencia en la lejanía.
- **Capas y velocidades** (de fondo a frente; `x` = scroll):
  1) `bg-sky`: cielo nocturno con estrellas y luna tenue → `translateX(-0.20*x)`
  2) `bg-clouds`: nubes altas muy sutiles → `translateX(-0.30*x)` + opacidad baja
  3) `bg-mountains-forest`: siluetas de montes y pinos → `translateX(-0.45*x)`
  4) `bg-entity`: **“O Apagón”** como sombra lejana; solo aparece en ciertas secciones (eyes-glow intermitente) → `translateX(-0.35*x)`
  5) `mid-torches-decor`: antorchas, faroles, postes → `translateX(-0.75*x)` (flicker)
  6) `content`: UI principal / bloques por sección → `translateX(-1.00*x)`
  7) `runner`: **Lumi** avanzando a la derecha → `translateX( 1.10*x)`
- **Notas**:
  - El ente solo se renderiza en `inicio`, `premios` y transiciones; activar/desactivar por sección.
  - `prefers-reduced-motion`: fijar capas 1–3 (sin parallax), mantener contenido estático.


### 3.3 Entradas por sección (content reveals)
- Timelines declarativas:
  - `enter`: fade-in + slide-in de titulares, brasas y antorchas.
  - `exit`: revertir/pausar.
- Declaradas en frontmatter (`anim.enter`, `anim.exit`).

### 3.4 Personaje (Runner: Lumi)
- Sprite 4–6 frames (idle/walk/run).
- Estados:
  - `idle`: sin input → mirar alrededor.
  - `walk` / `run`: según velocidad scroll.
  - `celebrate`: al alcanzar checkpoints.
- Pequeño “rebote” al final de sección, sin bloquear scroll.
- Botón HUD para ocultar personaje y SFX.

### 3.5 Minimapa/HUD
- Barra superior con:
  - Rail de progreso (width = suma de secciones).
  - **Checkpoints**: 🔥 inicio, 📚 portadores, 🛠️ patrocinandores (forxa), 🛡️ **gremios**, 👥 equipo, 🧭 agenda, 🎁 premios, 🎫 entradas.
  - Indicador (mini Lumi) que avanza según progreso.
  - Click = scroll animado con easing cubic-bezier(0.22,1,0.36,1).
- Muestra “Nivel de chispa” y toggle “Reducir movimiento”.

### 3.6 Pseudocódigo
```ts
let target = rail.scrollLeft;
let current = rail.scrollLeft;
const ease = 0.1;

function onWheel(e){
  target += e.deltaY * 0.9;
  target = clamp(target, 0, rail.scrollWidth - viewportWidth);
}

function onKey(e){
  if(e.key==='ArrowRight') target += viewportWidth * 0.8;
  if(e.key==='ArrowLeft') target -= viewportWidth * 0.8;
}

function loop(){
  current += (target - current) * ease;
  applyParallax(current);
  requestAnimationFrame(loop);
}

function applyParallax(x){
  layer.bgStars.style.transform = `translate3d(${-0.25*x}px,0,0)`;
  layer.bgMounts.style.transform = `translate3d(${-0.5*x}px,0,0)`;
  layer.midDecor.style.transform = `translate3d(${-0.8*x}px,0,0)`;
  layer.content.style.transform = `translate3d(${-1.0*x}px,0,0)`;
  lumi.style.transform = `translate3d(${1.1*x}px,0,0)`;
}
requestAnimationFrame(loop);
```

## 4) Arquitectura de contenidos (Markdown)

* Directorios:

  * `content/es/*.md` y `content/gl/*.md`
  * Un archivo por sección + fragmentos reutilizables.
* Frontmatter común:

  ```yaml
  ---
  id: "inicio"
  title: "LareiraConf'26"
  order: 1
  visible: true
  excerpt: "Únete a la aventura y recupera la llama"
  media:
    type: "pixel-illustration" # | image | video | none
    src: "/assets/hero/lumi-hero.webp"
  ---
  ```
* Campos específicos por sección ver §5.

## 5) Secciones y requisitos

Orden (desktop): **Inicio → Descripción → Portadores → Patrocinandores → Comunidades (Gremios) → Equipo → Agenda → Premios → Entradas**


### 5.1 Inicio

* **Contenido**: título `LareiraConf'26`, **fecha** (21.05.26), **lugar** (Rectorado UDC, A Coruña), slogan provisional, CTA.
* **CTAs**: “Comprar entradas” (link configurable), “Descubre a aventura”.
* **Efectos**: partículas de brasa.
* **Frontmatter extra**:

  ```yaml
  ctas:
    - label: "Comprar entradas"
      href: "/#entradas"
    - label: "Descubre a aventura"
      href: "/#descripcion"
  ```

### 5.2 Descripción del evento

 ```yaml
id: descripcion
title: "Aventura e comunidade"
order: 2
visible: true
media:
  type: "pixel-illustration"
 ```

### ¿Qué es LareiraConf?

LareiraConf es un punto de encuentro para quienes viven la tecnología con pasión.  
Un lugar donde desarrolladores, estudiantes y profesionales de distintas comunidades se reúnen para aprender, compartir experiencias y encender nuevas chispas de inspiración.

Este año, la hoguera vuelve a arder… pero con un giro inesperado.

### La edición 2026

En esta aventura, la conferencia se transforma en un **juego de rol (RPG)** en el que tú eres parte de la historia.  
A lo largo del día, las charlas, los espacios y las actividades estarán entrelazados por una narrativa común que te invita a participar, conectar y explorar.

Cada asistente será un aventurero con un rol propio.  
Cada patrocinador, un artesano que forja los recursos necesarios para mantener viva la llama.  
Y los portadores, las voces que traen conocimiento desde otras tierras para compartirlo con la comunidad.

### El formato

Un solo **track principal**, para que todos los Lareireiros vivan la misma historia.  
Charlas inspiradoras, dinámicas, sorteos, retos y alguna que otra sorpresa, todo ambientado en el universo de la Lareira.

Porque aquí no solo se viene a escuchar: se viene a encender la llama, juntos.


### 5.3 Portadores de la llama (ponentes)

- **Escena**: **biblioteca** retro: estanterías altas, escalerillas, pergaminos, brasas en faroles.
- **Layout**: carrusel/shelf horizontal integrado en el rail.
- **Reveals**: títulos emergen como rótulos de estantería; partículas de polvo en luz (motes).
- **Datos**: `content/{lang}/speakers/*.md` (igual que antes).


  ```yaml
  ---
  id: "midudev"
  name: "Miguel Ángel Durán"
  aka: "midudev"
  title: "Creador de contido"
  talk_title: "TBD"
  links:
    - type: youtube
      url: "https://..."
  media: "/assets/speakers/midudev.webp"
  ---
  Bio en markdown...
  ```

### 5.4 Patrocinadores — El campamento de los artesanos

- **Concepto visual:**  
  Un campamento nocturno iluminado por antorchas, donde cada grupo de patrocinadores ocupa su propia carpa según su nivel de artesanía.  
  Los personajes representan el espíritu de cada tier, pero el protagonismo visual recae en los **logos de los patrocinadores**.

- **Tiers (niveles de artesanía):**
  1. **Artesano** → da sus primeros golpes de martillo en la Lareira.  
     - Carpa pequeña, tonos cobre.  
     - 6–10 patrocinadores aprox.  
     - Personajes: aprendices con martillo en idle animado.  
     - Logos medianos en grilla 3×n.  
  2. **Oficial Artesano** → ya domina la forja y colabora activamente.  
     - Carpa mediana, metal oscuro con incandescencias.  
     - 4–6 patrocinadores aprox.  
     - Personajes: artesanos trabajando con una barra incandescente.  
     - Logos medianos-grandes, grilla 2×n.  
  3. **Maestro Artesano** → reconocido por su experiencia y presencia.  
     - Carpa grande, adornos dorados y brasas brillando.  
     - 2–3 patrocinadores aprox.  
     - Personajes: en túnica, sosteniendo herramientas o pergaminos.  
     - Logos grandes, centrados, con acento naranja en hover.  
  4. **Gran Maestro Artesano** → el puesto de honor.  
     - Carpa especial, tonos azulados con fuego mágico.  
     - 1 patrocinador máximo (exclusivo).  
     - Personajes: pareja de maestros con la llama azul; fondo con resplandor.  
     - Logo central, mayor tamaño y con brillo permanente.

- **Distribución:**
  - **Desktop:** disposición horizontal de las carpas (de menor a mayor nivel).  
  - **Móvil:** pila vertical con cada tier colapsable (acordeón).  
  - En el scroll horizontal, Lumi puede caminar entre las carpas como si recorriera el campamento.

- **Logos (protagonistas):**
  - Presentados en **blanco y negro por defecto**, y al hacer hover:  
    - se iluminan en naranja (#FF6A00)  
    - emiten una chispa o destello que asciende suavemente  
  - Cada logo encapsulado en `<SponsorLogo tier=\"...\">`.

- **Interacciones y animaciones:**
  - Al entrar en la sección: las antorchas de cada carpa se encienden de izquierda a derecha.  
  - El fuego del centro del campamento se aviva ligeramente al pasar el cursor sobre un logo.  
  - Los personajes tienen animaciones idle suaves, nunca más llamativas que los logos.  
  - Al pasar el cursor por el nombre del tier, aparece un **tooltip** con su descripción:
    - *“Da sus primeros golpes de martillo en la Lareira.”*  
    - *“Presencia destacada en el evento y la comunicación.”*  
    - *“El único capaz de brandear la LareiraConf.”*

- **CTA final:**  
  🔗 *“Descarga el dossier de patrocinio”*  
  🔗 *“Conviértete en artesano de la llama”*

- **Datos de contenido (markdown):**
  ```md
  ## Patrocinadores

  ### Gran Maestro Artesano
  [Logo exclusivo]

  ### Maestro Artesano
  [LogoA] [LogoB]

  ### Oficial Artesano
  [LogoC] [LogoD] [LogoE]

  ### Artesano
  [LogoF] [LogoG] [LogoH] [LogoI]
  ```

* Notas de implementación:
  - Assets de personajes en /assets/sponsors/tiers/{tier}-{char}.webp.
  - Sprites en 4–6 frames, animación a 12fps máximo.
  - Cada carpa es un <TierTent> con props {tier, logos[], characters[]}.
  - Fondo y luz de cada carpa controlados por variables SCSS ($tier-color, $glow-strength).
  - Las carpas crecen en tamaño y ornamentación de izquierda a derecha.
  - Los personajes aparecen en primer plano pero más pequeños que los logos.
  - Las antorchas delimitan visualmente cada tier.
  - El fondo tiene movimiento parallax leve (nubes, fuego, sombras).

### 5.5 Comunidades — Los Gremios de la Lareira

- **Concepto visual:**
  Un camino de banderas ondeando al viento, representando a las distintas comunidades tecnológicas que forman parte de la Lareira.  
  Cada bandera luce el emblema o logo de una comunidad, y el conjunto transmite sensación de **diversidad, pertenencia y colaboración**.  
  Al fondo, se perciben siluetas o personajes que evocan grupos de personas charlando, observando o levantando nuevas banderas.

- **Diseño:**
  - Fondo: atardecer pixelado con tonos cálidos (naranja, violeta oscuro, negro).  
  - Primer plano: una hilera de **banners** verticales de tela (2D, pixel art o SVG).  
  - Banderas dispuestas en distintos niveles de profundidad para simular **parallax leve**.  
  - Algunas animaciones de partículas (hojas, brasas pequeñas, viento).  

- **Comportamiento de las banderas:**
  - Por defecto: posición vertical con ligera oscilación (idle loop, 2–3°).  
  - Al pasar el cursor:
    - La bandera **ondea** suavemente (animación de tela o keyframes CSS).  
    - Su emblema **se ilumina** en naranja.  
    - Aparece un pequeño tooltip con el nombre del gremio y un resumen.  
  - Al hacer click: abre la web de la comunidad en una nueva pestaña (`target="_blank"`).  
  - Opción futura: expandir en modal o panel lateral si hay más contenido.

- **Personajes secundarios:**
  - 2–3 **sprites genéricos** de “miembros de comunidades” charlando o saludando.  
  - No representan a nadie real; solo ambientan la escena.  
  - Idle loops lentos (mirar banderas, gesticular, moverse un poco).  
  - Pueden desplazarse mínimamente al hacer scroll horizontal, como si se acercaran a las banderas.

- **Distribución:**
  - **Desktop:** hilera horizontal (una “plaza de comunidades”) que se integra en el scroll horizontal principal.  
  - **Móvil:** grilla vertical con banderas centradas y animación reducida.  
  - **Cantidad variable:** 8–15 banderas según número de comunidades.

- **Estructura de datos (markdown) — alternativa por archivos:**
  `content/es/guilds/python-coruna.md`
  ```
  ---
  id: "python-coruna"
  name: "Python Coruña"
  summary: "Una comunidad abierta para aprender y compartir sobre Python."
  emblem: "/assets/guilds/python.webp"
  url: "https://python.gal"
  ---
  ```
- **Interacciones y animaciones:**
  - Parallax suave: fondo (0.3×), banderas (0.6×), personajes (1×).
  - Idle general: viento ligero sobre todas las telas (keyframes de 3–4s).
  - Hover individual: la bandera se arquea más, sombra proyectada más intensa.
  - Al entrar la sección en viewport: animación secuencial de banderas que “se izan” una a una.
- **Notas de implementación:**
  - Los banners son `<GuildFlag>` con props `{name, logo, url, summary}`.
  - Sprites de personajes genéricos en `/assets/guilds/chars/*.webp`.
  - Las banderas usan `transform: rotateZ()` + `skew()` y un pseudo-elemento para simular el pliegue.
  - Keyframes tipo flagWave (pseudocódigo, no CSS literal en el spec).


Keyframes tipo:
  ```scss
    @keyframes flagWave {
      0%,100% { transform: rotateZ(-2deg) skewY(1deg); }
      50% { transform: rotateZ(2deg) skewY(-1deg); }
    }
  ```

### 5.6 El equipo — Guardianes de la llama

- **Concepto visual:**
  Es de noche en el campamento. 
  Todo está en calma, apenas se distinguen las siluetas de las tiendas y las banderas de **CoruñaWTF** y **Sysarmy Galicia** ondeando suavemente. 
  **Lumi**, levita sobre el suelo, dejando tras de sí un rastro de partículas brillantes. 
  A su paso, su resplandor **revela los rostros del equipo organizador**, uno a uno.

- **Diseño:**
  - Fondo: noche pixelada con matices anaranjados y violetas. 
  - **Lumi** levita y emite un resplandor animado radial (efecto glow con partículas).  
  - Los organizadores aparecen dentro del área iluminada por Lumi, con animaciones sutiles (parpadeo del brillo, reflejos en el suelo).  
  - Las banderas de CoruñaWTF y Sysarmy Galicia están en segundo plano, ondeando con bucle lento.  
  - En móvil, Lumi se mueve verticalmente de forma automática y cada miembro se ilumina al entrar en pantalla.

- **Narrativa principal (texto visible en la web):**
  > Somos un grupo de personas apasionadas por la tecnología, unidas por una misma chispa:  
  > **crear espacios donde las comunidades locales puedan encontrarse, aprender y crecer juntas.**
  > 
  > Así nació LareiraConf: una idea que comenzó en un meetup y que hoy se ha convertido en una evento donde compartir conocimiento y experiencias.
  > 
  > Queremos que este evento siga siendo ese punto de encuentro donde surjan nuevas ideas, amistades y colaboraciones. 
  > 
  > Detrás de cada charla, cada detalle y cada chispa encendida, estamos estos 4 locos que trabajamos con ilusión para mantener viva la llama.


- **Presentación de los miembros:**
  - Cada persona aparece como personaje pixelado en su puesto dentro del campamento.  
  - El nombre y rol se muestran **solo cuando Lumi los ilumina** (dentro del halo de luz).  
  - El enlace de LinkedIn aparece como un pequeño ícono brillante junto al nombre.  
  - Sin paneles ni tarjetas: la información surge orgánicamente con la luz.  

  **Ejemplo de datos (markdown):**
  ```md
  ## El equipo

  - name: "Andrea Magán"
    role: "Frontend Developer — Sngular"
    title: "Presentadora y co-organizadora"
    community: "CoruñaWTF"
    linkedin: "https://linkedin.com/in/..."
    sprite: "/assets/team/andrea.webp"

  - name: "Jesús Pérez Roca"
    role: "Profesor — Beerworking"
    title: "Co-organizador"
    community: "GPUL"
    linkedin: "https://linkedin.com/in/..."
    sprite: "/assets/team/jesus.webp"

  - name: "Jorge Teixeira"
    role: "Tech Advocate — Sysarmy Galicia"
    title: "Co-organizador"
    linkedin: "https://linkedin.com/in/..."
    sprite: "/assets/team/jorge.webp"

- ### Interacciones y animaciones

  - **Lumi:** flota suavemente, con partículas incandescentes (naranjas y blancas).  
  - **Resplandor dinámico:** máscara radial que ilumina progresivamente a cada miembro según la posición de Lumi.  
  - **Efecto de descubrimiento:** cuando un miembro entra en el área iluminada:  
    - aparece su nombre (*fade-in* con brillo).  
    - el logo de su comunidad parpadea ligeramente.  
  - **Banderas:** ondean con animación de 3–4 segundos, sincronizadas con la brisa de brasas.


- ### Distribución

  - **Desktop:** escena panorámica con scroll horizontal. Lumi se mueve al ritmo del scroll.  
  - **Móvil:** versión vertical; Lumi baja flotando y activa la iluminación de cada miembro al pasar.  
  - No hay CTA final — esta escena funciona como cierre emocional del bloque de comunidades.



- ### Notas de implementación

  - **Componentes:**  
    `<TeamScene>` (escena), `<LumiLight>` (fuente de luz y partículas),  
    `<TeamMember>` (miembro), `<Flag>` (banderas).  
  - **Luz:**  
    ```css
    mix-blend-mode: screen;
    filter: blur(16px);


### 5.7 Agenda (oculto)

* **Modo**: inicial **TBD**; si hay slots, grilla por tramos horarios con pistas.
* **Interacción**: hover muestra detalles/ponente.
* **Datos**: `content/{lang}/agenda.md` (tabla markdown) o por sesiones `content/{lang}/agenda/*.md`.

### 5.8 Premios (oculto)

* **Descripción** de sorteos/dinámicas.
* **Interacción**: contador de “nivel de chispa” sube al ir visitando secciones clave.

### 5.9 Entradas (oculto)

* **Bloque** con precio/beneficios y botón principal.
* **Nota**: link configurable a la plataforma de ticketing (por definir).

### Header / Footer

* **Header**: logo izquierda, menú de secciones (anclas al rail), botón "Comprar entradas" fijo.
* **Footer**: Contacto y redes (Instagram, LinkedIn, YouTube, Telegram), enlace a Código de conducta, ©.

## 6) Animaciones y microinteracciones
### 6.1 Sistema de partículas (brasas)
- JS canvas (desktop) con 30 fps, degrade a CSS en móvil.

### 6.2 Antorchas y brillo
- Spritesheet o CSS keyframes con ruido perlin opcional.

### 6.3 Barra “Nivel de chispa”
- Progreso (0–5) ligado a secciones y checkpoints del runner.

### 6.4 Reveals por sección

Cada sección de la LareiraConf tiene su propia **timeline de aparición** (reveal) coordinada con el desplazamiento horizontal.  
El objetivo es mantener una sensación de descubrimiento constante, como avanzar por distintas escenas dentro del mismo mundo.

**Lógica general:**
- Se activa cuando la sección entra en el 30–40% del viewport (via `IntersectionObserver`).  
- Las animaciones son suaves, con *easing cubic-bezier(0.22, 1, 0.36, 1)*.  
- Cada sección define su propio set de elementos animables en una clave `anim.enter` dentro del contenido o componente.

**Tipos de animaciones base:**

| Elemento | Animación | Duración | Delay | Efectos complementarios |
|-----------|------------|-----------|--------|--------------------------|
| **Títulos (h1/h2)** | `slide-in` desde 40px abajo → posición final | 0.6s | 0s | Opacidad de 0→1 |
| **Subtítulos / bloques secundarios** | `fade-in` | 0.5s | 0.2s | Aceleración suave |
| **Párrafos** | `fade-in + slight rise (translateY(-10px))` | 0.8s | 0.1s–0.3s escalonado | Aparece línea a línea |
| **Iconos / decorativos** | `bounce-in` vertical corto (10px) | 0.5s | 0.2s | *ease-out-back* |
| **Ilustraciones / sprites** | `scale-up` (0.95 → 1) + fade | 0.8s | 0.1s | Glow leve al final |
| **Botones / CTAs** | `fade + upward pop` | 0.5s | 0.4s | Suavizado con *overshoot* |

**Ejemplo de declaración (pseudocódigo):**
```yaml
anim:
  enter:
    - target: h2
      type: slide-in
      delay: 0
    - target: p
      type: fade-in
      stagger: 0.1
    - target: .cta
      type: pop
      delay: 0.3
  exit:
    - target: section
      type: fade-out
  ```

**Detalles adicionales:**

  - Cada reveal se dispara solo una vez, salvo que se use data-replay="true".
  - Si prefers-reduced-motion está activado, sustituir por aparición instantánea (opacity: 1; transform: none).
  - Coordinación opcional con efectos de sonido o partículas (por ejemplo, una chispa que aparece al revelar el título).

### 6.5 Hovers y SFX

**Objetivo:** mantener la sensación retro y viva del diseño, sin sobrecargar la experiencia.  
Todos los hovers se sienten “táctiles” y pixelados, evocando una interfaz clásica de videojuego o software noventero.

---

#### 🕹️ Botones
- Desplazamiento de 1–2 px hacia arriba al hover (transform: translateY(-2px)).
- Sombra dura estilo 8-bit (box-shadow: 0 4px 0 #000).
- Transición de 0.15–0.2 s con easing tipo ease-out-back (transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1)).
- En estado activo (mousedown) se invierte la sombra, como si se pulsara (transform: translateY(1px); box-shadow: 0 1px 0 #000 inset).
- Cursor personalizado tipo pixel pointer o animado.

---

#### 🔗 Enlaces
- Subrayado animado: línea pixelada que se extiende de izquierda a derecha.  
- Color pasa de blanco a naranja (#FF6A00).  
- Pequeña vibración de 1 px en hover prolongado (animación con keyframes cortos).

---

#### 🖼️ Iconos e ilustraciones
- En hover: aumento de brillo y ligera escala (filter: brightness(1.2); transform: scale(1.05)).  
- En elementos con borde pixelado: añadir parpadeo del borde o resplandor corto (50–80 ms).

---

#### 💻 Ejemplo de comportamiento global (SCSS)
- Selector base: button, a → transición: all 0.2s cubic-bezier(0.25, 1, 0.5, 1).  
- En :hover → translateY(-2px); box-shadow: 0 4px 0 #000; color: #FF6A00.  
- En :active → translateY(1px); box-shadow: 0 1px 0 #000 inset.

---

#### ♿ Accesibilidad
- Todos los efectos visuales deben tener equivalentes táctiles y de foco (focus visible y outline de alto contraste).  


## 7) Integraciones

### 7.1 Ruta oculta “Sorteos”

**Path:** `/sorteos?evento={id}` (no visible en la navegación; acceso por QR en las cerillas).

---

#### 🔥 Concepto narrativo

Esta página representa el **altar de las cerillas**: un lugar donde las chispas de distintas comunidades se reúnen para mantener viva la Lareira.  
Cada persona que participa **enciende una cerilla**, dejando su luz en el conjunto.  
El objetivo: llenar la escena de pequeñas llamas, una por cada participante.

---

#### 🕯️ Diseño visual

- Fondo oscuro, texturizado, con una hilera de **cerillas apagadas** (5–8 visibles en pantalla).  
- A medida que se envían participaciones, las cerillas se **encienden una a una** con animación de fuego y partículas.  
- El número de cerillas encendidas crece según el total de inscritos del sorteo actual.  
- Las cerillas encendidas muestran **el nombre de pila** o alias de quien la encendió, sobre la llama.  
- En móvil, disposición vertical con scroll suave; en desktop, escena panorámica horizontal.

---

#### 🧩 Personalización por evento

El parámetro `?evento=` determina:
- Texto principal (título y subtítulo).
- Logo o emblema de la comunidad.
- Fecha de resolución del sorteo.
- Hoja de cálculo destino.
- Lista de cerillas encendidas (feed público del Excel/Sheets).

**Ejemplo de uso:**
- `/sorteos?evento=datolada`
- `/sorteos?evento=vigotech`
- `/sorteos?evento=corunawtf`

Si el parámetro `evento` no existe o no coincide con una comunidad registrada → redirigir automáticamente a la **home**.

---

#### 🧾 Contenido y estructura

**Encabezado dinámico:**
- Logo de la comunidad (`/assets/sorteos/{evento}.webp`)
- Título: “Engade a túa chispa” / “Añade tu chispa”
- Subtexto: “Participa no sorteo de {{evento.nombre}} e axuda a reavivar a Lareira.”

**Panel informativo (a la derecha o inferior):**
- Fecha de resolución → `O sorteo resolverase o {{fecha_resolucion}}`
- Texto legal corto y enlace a bases

---

#### 🧮 Comportamiento dinámico

1. Al cargar, se obtiene el parámetro `evento` y se lee la configuración (`/content/sorteos/{evento}.json`).
2. Se muestra la escena con las cerillas apagadas.
3. El cliente solicita el **feed público del Excel/Sheets** (modo lectura JSON).
   - Se usa `fetch('https://sheets.googleapis.com/...')` o `?output=json`.
   - Se obtienen los nombres ya registrados → cada uno enciende una cerilla con su nombre.
4. El usuario introduce su nombre y email.
5. Al enviar:
   - Se valida email (único por evento en la hoja).
   - Si es nuevo → se guarda y se **enciende una nueva cerilla** con su nombre (animación + chispa).
   - Si ya existe → se muestra mensaje: “Xa participaches neste sorteo!”.
6. Éxito → Lumi aparece sobre la nueva cerilla, gira una vuelta y lanza partículas de fuego.
7. Mensaje de confirmación:
   > “Túa cerilla xa está acesa. Grazas por manter viva a chama da comunidade {{evento.nombre}}.”

---

#### ⚙️ Integración con Sheets

**Estructura recomendada:**
- Un documento único con una hoja por sorteo (`Datolada`, `VigoTech`, `CoruñaWTF`, etc.)
- Columnas:
  | timestamp | nombre | email | evento |
  |------------|---------|--------|---------|

**API:**
- **POST** → añade nueva fila.  
- **GET (público)** → lectura como feed JSON (nombres parciales, email ofuscado).

Ejemplo feed lectura (Google Sheets publicado):
```
https://docs.google.com/spreadsheets/d/{ID}/gviz/tq?tqx=out:json&tq=select%20A,B
```

La app puede leerlo y renderizar los nombres de los últimos participantes.  
*(No requiere backend si se usa hoja pública de solo lectura).*

**Validación de email existente:**
- En el cliente: al enviar, se consulta el feed actual y compara con los emails registrados.  
- Si ya existe → no se añade fila ni se anima nueva cerilla.

---

#### 🧩 Componentes principales

- **MatchBoxScene** → Renderiza fondo, hilera de cerillas y animaciones.
- **MatchItem** → Cerilla individual (estados: apagada / encendida / recién encendida).
- **FormPanel** → Campos y CTA.
- **LumiHelper** → Sprite animado que flota brevemente al confirmar.
- **CommunityLogo** → Imagen del evento actual.
- **MatchCounter** → Contador total de chispas encendidas.

---

#### 🧱 Campos del formulario
- Nombre  
- Email  
- Checkbox: “He leído y acepto las bases”  
- Campo oculto: `evento`  
- Throttle de 1 envío/minuto por IP.

Sin email de confirmación.  
Validación en cliente: email no repetido en el feed actual + formato correcto.

---

#### 🎨 Estados de UI
- **Idle:** cerillas apagadas, formulario activo.  
- **Hover:** el fuego de una cerilla se enciende ligeramente (preview).  
- **Loading:** Lumi aparece sobre el formulario girando.  
- **Success:** cerilla se enciende, nombre aparece arriba.  
- **Duplicado:** humo gris con texto (ya registrado).  
- **Error:** humo gris con texto explicativo.

---

#### 🗓️ Información del sorteo
Cada evento define:
- `fecha_resolucion` → texto visible (“El sorteo se resolverá el 15 de abril de 2026”).  
- `hoja` → nombre de la pestaña en Sheets.  
- `logo` → ruta del logo local.  
- `mensaje_ok` → texto de éxito personalizado.

Ejemplo de configuración `/content/sorteos/datolada.json`:
```
{
  "id": "datolada",
  "nombre": "Datolada",
  "fecha_resolucion": "15/04/2026",
  "hoja": "Datolada",
  "logo": "/assets/sorteos/datolada.webp",
  "mensaje_ok": "A túa cerilla da Datolada xa está acesa!"
}
```

---

#### 🔒 Privacidad
- Sin almacenamiento de contraseñas ni cookies persistentes.  
- Solo nombre y email, usados exclusivamente para la gestión del sorteo.  
- Enlace a política y bases del sorteo.  
- Eliminar datos bajo solicitud (contacto oficial del evento).

---

#### 🧭 Accesibilidad
- Focus visible, contraste AA, formulario navegable con teclado.  
- Cerillas con nombres accesibles via `aria-label="Cerilla de Andrea, encendida"`.  
- Animaciones reducidas si el usuario lo solicita.

---

#### 💬 Frases clave por evento (ejemplo)
- Datolada → “Encende a faísca da Datolada.”  
- CoruñaWTF → “Reaviva a chama da Coruña.”  
- VigoTech → “A Lareira chega a Vigo — suma a túa chispa.”  
- Default → “Engade a túa chispa e participa no sorteo da LareiraConf.”


### 7.2 Redes

* **Links**: Instagram, LinkedIn, YouTube, Telegram (iconos pixel).

## 8) Estructura SCSS (7-1)

```
src/styles/
  abstracts/   // variables, mixins, functions
  base/        // resets, tipografía, helpers
  components/  // botones, tarjetas, hud
  layout/      // header, footer, grid, rail
  pages/       // secciones específicas
  themes/      // dark-only variables
  vendors/     // libs si aplica
  main.scss
```

* **Variables clave**:

  * `$color-bg: #0B0B0B;`
  * `$color-text: #FFFFFF;`
  * `$color-accent: #FF6A00;`
  * `$border-color: #000;` (para estilo pixel)

## 9) Convenciones de archivos y rutas

* **Assets**:
  - `public/assets/bg/`  → cielo, nubes, montes, ente
  - `public/assets/camp/` → tiendas, forja, estandartes tiers
  - `public/assets/library/` → estanterías, lámparas, pergaminos
  - `public/assets/guilds/` → emblemas y banners de comunidades

* **MD por sección**:

  * `content/es/inicio.md`, `content/gl/inicio.md`
  * `content/es/descripcion.md`, ...
  * `content/{lang}/speakers/*.md`
  * `content/{lang}/sponsors.md`
* **i18n**: selector de idioma en footer (persistencia en `localStorage`).

## 10) Componentes (catálogo mínimo)

- `<Rail>`: contenedor horizontal con inercia (sin snapping), API para saltos.
- `<ParallaxLayer>`: capa `{ factor, z, sticky? }`.
- `<Section>`: `{ id, title, widthUnits, bgDecor, anim }`.
- `<MiniMapHUD>`: progreso, checkpoints, chispa, toggles (SFX, reducir movimiento).
- `<LumiLight>`: fuente de luz y partículas de Lumi (levitando).
- `<TeamScene>` / `<TeamMember>`
- `<GuildFlag>` (banderas de comunidades)
- `<TierTent>` / `<SponsorLogo>` (campamento de artesanos)
- `<MatchBoxScene>` / `<MatchItem>` (sorteos)
- `<Header>` / `<Footer>`
- `<HUDChispa>` / `<Particles>` / `<Torch>`
- `<Button>` (`primary`, `ghost`)
- `<SpeakerCard>` / `<SpeakerModal>`
- `<AgendaGrid>`


## 11) Accesibilidad y rendimiento

* Respetar `prefers-reduced-motion`.
* Imágenes WebP con fallback PNG solo si hay transparencia necesaria.
* Límite JS < 180KB gz.
* Lazy-load de secciones interiores (code-splitting por chucks de rail).

## 12) Copys guía (ES/GL)

**Estructura sugerida de internacionalización:**
- `/content/i18n/es.json`
- `/content/i18n/gl.json`

---

### 🗂️ Archivo `/content/i18n/es.json`
```json
{
  "inicio": {
    "slogan": "Únete a la aventura y recupera la llama",
    "descripcion": "LareiraConf es una conferencia que conecta a la comunidad tecnológica en un entorno de aprendizaje, diversión y colaboración.",
    "ctaEntradas": "Comprar entradas",
    "ctaMasInfo": "Descubre más"
  },
  "descripcion": {
    "titulo": "Aventura y comunidad",
    "intro": "Un punto de encuentro para quienes viven la tecnología con pasión.",
    "formato": "Un solo track donde todos compartimos la misma historia."
  },
  "portadores": {
    "titulo": "Portadores de la llama",
    "descripcion": "Quienes traen el conocimiento desde otras tierras para mantener viva la chispa."
  },
  "patrocinadores": {
    "titulo": "Campamento de artesanos",
    "ctaDossier": "Descarga el dossier de patrocinio",
    "ctaUnete": "Conviértete en artesano de la llama"
  },
  "comunidades": {
    "titulo": "Gremios de la Lareira",
    "cta": "¿Tu comunidad también forma parte de la Lareira? Súmate al gremio."
  },
  "equipo": {
    "titulo": "Guardianes de la llama",
    "texto": "Somos un grupo de personas apasionadas por la tecnología, unidas por el deseo de mantener viva la llama que enciende la comunidad."
  },
  "sorteos": {
    "titulo": "Añade tu chispa",
    "subtitulo": "Participa en el sorteo de {{evento}} y ayuda a reavivar la Lareira.",
    "form": {
      "nombre": "Nombre",
      "email": "Correo electrónico",
      "checkbox": "He leído y acepto las bases",
      "boton": "Participar"
    },
    "estado": {
      "ok": "Tu cerilla ya está encendida. Gracias por mantener viva la llama.",
      "duplicado": "Ya participaste en este sorteo.",
      "error": "Algo no ha ido bien. Inténtalo de nuevo."
    },
    "info": {
      "total": "{{count}} chispas encendidas",
      "fecha": "El sorteo se resolverá el {{fecha}}"
    }
  },
  "footer": {
    "contacto": "Contacto",
    "codigoConducta": "Código de conducta"
  }
}
```
---

### 🗂️ Archivo `/content/i18n/gl.json`
``` JSON
{
  "inicio": {
    "slogan": "Únete á aventura e recupera a chama",
    "descripcion": "A LareiraConf é unha conferencia que conecta á comunidade tecnolóxica nun ambiente de aprendizaxe, diversión e colaboración.",
    "ctaEntradas": "Mercar entradas",
    "ctaMasInfo": "Descubre máis"
  },
  "descripcion": {
    "titulo": "Aventura e comunidade",
    "intro": "Un punto de encontro para quen vive a tecnoloxía con paixón.",
    "formato": "Un único track no que todos compartimos a mesma historia."
  },
  "portadores": {
    "titulo": "Portadores da chama",
    "descripcion": "Quen traen o coñecemento desde outras terras para manter viva a faísca."
  },
  "patrocinadores": {
    "titulo": "Campamento dos artesáns",
    "ctaDossier": "Descarga o dossier de patrocinio",
    "ctaUnete": "Convértete en artesán da chama"
  },
  "comunidades": {
    "titulo": "Gremios da Lareira",
    "cta": "A túa comunidade tamén forma parte da Lareira? Súmate ao gremio."
  },
  "equipo": {
    "titulo": "Gardas da chama",
    "texto": "Somos un grupo de persoas apaixoadas pola tecnoloxía, unidas polo desexo de manter viva a chama que acende a comunidade."
  },
  "sorteos": {
    "titulo": "Engade a túa chispa",
    "subtitulo": "Participa no sorteo de {{evento}} e axuda a reavivar a Lareira.",
    "form": {
      "nombre": "Nome",
      "email": "Correo electrónico",
      "checkbox": "Lin e acepto as bases",
      "boton": "Participar"
    },
    "estado": {
      "ok": "A túa cerilla xa está acesa. Grazas por manter viva a chama.",
      "duplicado": "Xa participaches neste sorteo.",
      "error": "Algo non foi ben. Téntao de novo."
    },
    "info": {
      "total": "{{count}} faíscas acesas",
      "fecha": "O sorteo resolverase o {{fecha}}"
    }
  },
  "footer": {
    "contacto": "Contacto",
    "codigoConducta": "Código de conduta"
  }
}
```

## 13) Pendientes

* SEO/OG (definir más tarde).
* Plataforma de ticketing.
* Dossier de patrocinio (URL definitiva).
* Agenda final.

---

## Apéndice A — Ejemplos de Markdown

**Inicio (`content/es/inicio.md`)**

```md
---
id: inicio
title: "LareiraConf'26"
order: 1
visible: true
date: "TBD"
place: "A Coruña"
cta_primary:
  label: "Comprar entradas"
  href: "#entradas"
media:
  type: pixel-illustration
  src: "/assets/hero/lumi-hero.webp"
---
**Únete a la aventura y recupera la llama**
Pequeña descripción del evento en 2-3 líneas.
```

**Ponente (`content/es/speakers/midudev.md`)**

```md
---
id: midudev
name: "Miguel Ángel Durán"
aka: "midudev"
role: "Creador de contenido"
talk_title: "TBD"
links:
  - type: youtube
    url: "https://youtube.com/@midu"
media: "/assets/speakers/midudev.webp"
---
Bio en 3-5 líneas.
```

**Patrocinio (`content/es/sponsors.md`)**
```md
---
id: sponsors
title: "Patrocinadores"
order: 4
gran_maestro: ["LogoGM"]
maestro: ["LogoM1", "LogoM2"]
oficial: ["LogoO1", "LogoO2", "LogoO3"]
artesano: ["LogoA1", "LogoA2", "LogoA3", "LogoA4"]
dossier_url: "/assets/docs/dossier.pdf"
---
Texto breve explicando niveles e impacto.
```
## Apéndice B — Esquema JSON de Sorteos

Define la estructura estándar de configuración para cada sorteo individual alojado en `/content/sorteos/{id}.json`.

```json
{
  "id": "datolada",
  "nombre": "Datolada",
  "fecha_resolucion": "2026-04-15",
  "hoja": "Datolada",
  "logo": "/assets/sorteos/datolada.webp",
  "mensaje_ok": "A túa cerilla da Datolada xa está acesa!",
  "color_fuego": "#FF6A00",
  "color_texto": "#FFFFFF",
  "url_bases": "/assets/docs/bases-datolada.pdf"
}
```

**Campos:**
- `id`: identificador único (slug).  
- `nombre`: nombre del evento o comunidad.  
- `fecha_resolucion`: fecha visible en pantalla.  
- `hoja`: pestaña correspondiente en el Excel/Sheets.  
- `logo`: ruta local del emblema o logotipo.  
- `mensaje_ok`: texto personalizado tras encender la cerilla.  
- `color_fuego` y `color_texto`: opcionales; personalizan el esquema visual.  
- `url_bases`: documento PDF con las bases legales del sorteo.

---

## Apéndice C — Tokens de animación y estilo

Variables globales para mantener coherencia entre secciones y simplificar los ajustes de diseño y animación.

``` scss
:root {
  /* Timing & Easing */
  --easing-enter: cubic-bezier(0.22, 1, 0.36, 1);
  --easing-exit: cubic-bezier(0.55, 0.06, 0.68, 0.19);
  --dur-short: 0.2s;
  --dur-medium: 0.5s;
  --dur-long: 1s;

  /* Colores de la llama */
  --spark-color: #FF6A00;
  --spark-color-light: #FFA940;
  --spark-color-dark: #FF3C00;

  /* Luz y partículas */
  --glow-strength: 0.6;
  --glow-blur: 16px;

  /* Parallax base */
  --parallax-bg: 0.3;
  --parallax-mid: 0.6;
  --parallax-front: 1.0;
}
```

---

## Apéndice D — Guía de assets

**Convención de nombres:**  
`/assets/{sección}/{nombre}-{variación}.{formato}`  
Formato preferido **WebP**, con fallback `.png` solo si es necesario (transparencias complejas).

**Ejemplos:**
``` bash
/assets/bg/cielo-nocturno.webp  
/assets/camp/carpa-maestro.webp  
/assets/guilds/python-coruna.webp  
/assets/team/andrea.webp  
/assets/sorteos/datolada.webp
```

**Directrices:**
- **Resolución base:** 1x, escalable a 2x si pesa <250KB.  
- **Optimización:** `webp -q 80` o `imagemin-webp`.  
- **Sprites:** máximo 6–8 frames, 12fps, tamaño <512px.  
- **Decorativos:** usar `role="presentation"` o `aria-hidden="true"`.

---

## Apéndice E — Checklist de accesibilidad

Lista práctica para validar la web antes del despliegue.

| Categoría | Requisito | Estado |
|------------|------------|--------|
| **Navegación** | Tabulador recorre todos los elementos interactivos | ☐ |
| **Foco** | Estados `:focus` visibles y con contraste suficiente | ☐ |
| **Contraste** | Texto cumple AA mínimo (4.5:1) | ☐ |
| **Animaciones** | `prefers-reduced-motion` respeta usuario | ☐ |
| **Audio/SFX** | Control global para desactivar sonido | ☐ |
| **Lectura de pantalla** | Secciones con `aria-label` descriptivo | ☐ |
| **HUD/Minimapa** | No bloquea navegación ni lectura | ☐ |
| **Formularios** | Labels asociados y mensajes accesibles | ☐ |
| **Colores** | No dependen solo del color para comunicar | ☐ |
| **Idioma** | HTML lang ajustado según selección ES/GL | ☐ |

---

## Apéndice F — Presupuesto de rendimiento

**Objetivo:** mantener la web ligera y fluida incluso con animaciones y assets pixel art.

| Elemento | Límite | Medida |
|-----------|--------|--------|
| **JavaScript (bundle total)** | < 180 KB gz | ☐ |
| **CSS principal** | < 60 KB gz | ☐ |
| **LCP (Largest Contentful Paint)** | < 2.5 s | ☐ |
| **FPS animaciones** | ≥ 50 FPS media | ☐ |
| **Lazy load** | Activo en secciones interiores | ☐ |
| **Imágenes optimizadas (WebP)** | 100% de las no-SVG | ☐ |
| **Code splitting** | Por sección (Rail chunks) | ☐ |
| **Prefetch i18n** | Archivos ES/GL cargados bajo demanda | ☐ |

**Herramientas recomendadas:**
- Lighthouse / PageSpeed Insights (modo móvil).  
- React Profiler (medir re-render en Rail).  
- TinyPNG / WebP CLI para imágenes.  
- Chrome DevTools → Performance > “Scroll Jank”.

---
