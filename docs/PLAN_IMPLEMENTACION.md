# LareiraConf'26 - Plan de Implementación

## 📋 **Plan Detallado de Implementación con Seguimiento de Progreso**

**Objetivo:** MVP con 5 secciones validando cada animación paso a paso
**Orden de Prioridad:** Parallax → Inicio → Descripción → Sorteos → Portadores → Equipo

---


## **FASE 0: Migración de la Landing Legacy** 🔜 POR EMPEZAR
*Objetivo: Archivar la web actual para dar paso a la nueva implementación.*

### 0.1 Mover código existente
- [ ] **Paso 0.1.1:** Mover el contenido de `src/pages/index.astro` a una nueva página `src/pages/landing-2026.astro`.
- [ ] **Paso 0.1.2:** Limpiar `src/pages/index.astro` para que sea la base de la nueva web de 2026.
- [ ] **Paso 0.1.3:** Asegurarse de que las rutas y assets de la versión legacy sigan funcionando correctamente.

---

## **FASE 1: Sistema de Parallax y Scroll Horizontal** 🔜 POR EMPEZAR
*Objetivo: Implementar la mecánica de scroll principal y el efecto parallax para la nueva web.*

### 1.1 Estructura del scroll horizontal
- [ ] **Paso 1.1.1:** Crear un layout principal o componente en React que gestione el scroll horizontal.
- [ ] **Paso 1.1.2:** Configurar GSAP para mapear el scroll vertical del usuario a un movimiento horizontal del contenido.

### 1.2 Demo de Parallax
- [ ] **Paso 1.2.1:** Crear un componente de capa parallax (`<ParallaxLayer>`).
- [ ] **Paso 1.2.2:** Implementar 3 capas con diferentes velocidades:
    - Capa de fondo (movimiento lento).
    - Capa de contenido (velocidad normal).
    - Capa de detalles (movimiento rápido).
- [ ] **Paso 1.2.3:** Crear una página de demo para probar y ajustar el efecto.

---

## **FASE 2: Sección de Inicio** 🔜 POR EMPEZAR
*Objetivo: Crear la primera sección visible de la nueva web.*

### 2.1 Componente de Inicio
- [ ] **Paso 2.1.1:** Crear el componente de React `<HomeSection>`.
- [ ] **Paso 2.1.2:** Añadir el contenido principal: título, fecha, lugar.
- [ ] **Paso 2.1.3:** Integrar la sección en el layout de scroll horizontal.

---

## **FASE 3: Sección de Tickets** 🔜 POR EMPEZAR
*Objetivo: Añadir la sección para la venta de entradas.*

### 3.1 Componente de Tickets
- [ ] **Paso 3.1.1:** Crear el componente de React `<TicketsSection>`.
- [ ] **Paso 3.1.2:** Diseñar el layout para mostrar los diferentes tipos de tickets.
- [ ] **Paso 3.1.3:** Integrar la sección en el layout de scroll horizontal después de la sección de inicio.

---

---- Siguiente version 


## **FASE 3: Sección Descripción**
*Objetivo: Validar reveals de texto y continuidad visual*

### 3.1 Layout de contenido
- [] **Paso 3.1.1:** Crear componente `<DescriptionSection>`
- [] **Paso 3.1.2:** Layout de texto responsive con buena tipografía
- [] **Paso 3.1.3:** Integrar contenido del markdown existente
- [] **Paso 3.1.4:** Posicionar como segunda sección en Rail

### 3.2 Animaciones de entrada
- [] **Paso 3.2.1:** Crear hook `useRevealAnimation`
- [] **Paso 3.2.2:** Reveal de título (slide-in desde abajo)
- [] **Paso 3.2.3:** Reveal de párrafos (fade-in escalonado)
- [] **Paso 3.2.4:** Validar timing y easing

### 3.3 Fondo decorativo
- [] **Paso 3.3.1:** Formas geométricas simples para simular ambiente
- [] **Paso 3.3.2:** Integrar con sistema parallax
- [] **Paso 3.3.3:** Probar continuidad visual con sección anterior

---

## **FASE 4: Página de Sorteos Independiente** ✅ HECHO
*Objetivo: Funcionalidad completa de sorteos con animaciones*

### 4.1 Estructura y routing
- [X] **Paso 4.1.1:** Configurar ruta `/sorteo`
- [X] **Paso 4.1.2:** Crear componente `<RafflePage>`
- [X] **Paso 4.1.3:** Sistema de configuración por evento (JSON)
- [X] **Paso 4.1.4:** Redirección si evento no existe

### 4.2 Escena de cerillas
- [X] **Paso 4.2.1:** Crear componente `<MatchesScene>`
- [X] **Paso 4.2.2:** Layout de cerillas -> pueden ser un svg o con css (tipo antorcha de minecraft)
- [X] **Paso 4.2.3:** Estados: apagada, encendida, recién encendida
- [X] **Paso 4.2.4:** Animación de encendido con CSS

### 4.3 Formulario funcional
- [X] **Paso 4.3.1:** Crear componente `<RaffleForm>`
- [X] **Paso 4.3.2:** Campos básicos (nombre, email, checkbox)
- [X] **Paso 4.3.3:** Validación en cliente
- [X] **Paso 4.3.4:** Estados de loading, success, error

### 4.4 Integración con Sheets
- [X] **Paso 4.4.1:** Configurar Google Sheets API (lectura)
- [X] **Paso 4.4.2:** Función para obtener participantes existentes
- [X] **Paso 4.4.3:** Función para añadir nueva participación
- [X] **Paso 4.4.4:** Sincronizar cerillas con datos reales

---

## **FASE 5: Sección Portadores**
*Objetivo: Cards de speakers con sistema de datos*

### 5.1 Sistema de datos
- [ ] **Paso 5.1.1:** Crear estructura para speakers en markdown
- [ ] **Paso 5.1.2:** Hook `useSpeakers` para cargar datos
- [ ] **Paso 5.1.3:** Placeholders para speakers de ejemplo
- [ ] **Paso 5.1.4:** Sistema de imágenes placeholder

### 5.2 Layout y componentes
- [ ] **Paso 5.2.1:** Crear componente `<SpeakersSection>`
- [ ] **Paso 5.2.2:** Crear componente `<SpeakerCard>` básico
- [ ] **Paso 5.2.3:** Layout tipo biblioteca con estanterías (formas)
- [ ] **Paso 5.2.4:** Carrusel horizontal integrado en Rail

### 5.3 Interacciones
- [ ] **Paso 5.3.1:** Hover effects en cards
- [ ] **Paso 5.3.2:** Modal o panel expandido con bio
- [ ] **Paso 5.3.3:** Animaciones de reveal biblioteca
- [ ] **Paso 5.3.4:** Particulas de "polvo en luz"

---

## **FASE 6: Sección Equipo**
*Objetivo: Escena con Lumi iluminando miembros*

### 6.1 Escena nocturna
- [ ] **Paso 6.1.1:** Crear componente `<TeamSection>`
- [ ] **Paso 6.1.2:** Fondo nocturno con formas simples
- [ ] **Paso 6.1.3:** Posiciones fijas para 4 miembros del equipo
- [ ] **Paso 6.1.4:** Banderas CoruñaWTF y Sysarmy (rectángulos)

### 6.2 Sistema de iluminación
- [ ] **Paso 6.2.1:** Crear componente `<LumiLight>` mejorado
- [ ] **Paso 6.2.2:** Máscara radial que revela contenido
- [ ] **Paso 6.2.3:** Lumi se mueve según scroll horizontal
- [ ] **Paso 6.2.4:** Miembros aparecen al entrar en luz

### 6.3 Datos del equipo
- [ ] **Paso 6.3.1:** Estructura de datos del equipo
- [ ] **Paso 6.3.2:** Componente `<TeamMember>` simple
- [ ] **Paso 6.3.3:** Enlaces a LinkedIn
- [ ] **Paso 6.3.4:** Narrativa de texto integrada

---

## **FASE 7: HUD y Navegación**
*Objetivo: Minimapa y controles globales*

### 7.1 Minimapa básico
- [ ] **Paso 7.1.1:** Crear componente `<MinimapHUD>`
- [ ] **Paso 7.1.2:** Barra de progreso horizontal
- [ ] **Paso 7.1.3:** Checkpoints clickeables por sección
- [ ] **Paso 7.1.4:** Indicador de posición actual

### 7.2 Controles adicionales
- [ ] **Paso 7.2.1:** Toggle para reducir movimiento
- [ ] **Paso 7.2.2:** Contador "Nivel de chispa"
- [ ] **Paso 7.2.3:** Navegación por teclado (← →)
- [ ] **Paso 7.2.4:** Header con logo y CTA principal

---

## **Workflow de Trabajo**

1. **Cada paso se implementa de forma independiente**
2. **Al completar cada paso pido confirmación**
3. **Con la confirmación, hago commit(s) siguiendo Conventional Commits**
4. **Se marca el paso como completado [ ] → [x]**
5. **Se continúa al siguiente paso**

## **Convenciones**

- **Código:** Inglés (componentes, variables, funciones)
- **Commits:** Inglés con Conventional Commits
- **Documentación:** Castellano
- **Comentarios:** Solo si son estrictamente necesarios
