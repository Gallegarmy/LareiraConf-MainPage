# Agent Guidelines - LareiraConf'26

> **Propósito**: Documento de reglas y aprendizajes para el agente de desarrollo de LareiraConf'26. Contiene las mejores prácticas, patrones de trabajo y referencias a documentación clave que deben ser consultadas al iniciar nuevas tareas.

## 📋 Documentación de Referencia

**SIEMPRE revisar estos documentos al comenzar una nueva tarea:**

1. **`docs/Definición.md`** - Especificación completa del proyecto, arquitectura, diseño y funcionalidades
2. **`docs/CODING_CONVENTIONS.md`** - Convenciones de código TypeScript/React y estructura de archivos
3. **`docs/CONVENTIONAL_COMMITS_GUIDE.md`** - Formato estándar para commits y mensajes
4. **`docs/PLAN_IMPLEMENTACION.md`** - Estado actual del proyecto y próximos pasos

## 🎯 Principios Fundamentales

### 1. Siempre leer la especificación primero
- Consultar `docs/Definición.md` para entender el contexto antes de implementar
- Respetar la estética retro pixelada y el tema narrativo de la "Lareira"
- Mantener coherencia con el stack: React + TypeScript + SCSS

### 2. Enfoque iterativo y debugging sistemático
- Implementar paso a paso, probando cada cambio
- Usar logs y debugging cuando las animaciones no funcionen
- No asumir que algo funciona sin confirmación del usuario

### 3. Commits organizados y descriptivos
- Seguir Conventional Commits según `docs/CONVENTIONAL_COMMITS_GUIDE.md`
- Dividir cambios grandes en commits lógicos separados
- Usar scopes apropiados para el proyecto (header, speakers, sponsors, etc.)

## 🛠️ Rules Aprendidas Durante el Desarrollo

### Solución de Problemas de Componentes

#### **Cuando un componente no aparece:**
1. **Verificar z-index**: asegurar que esté por encima de otros elementos
2. **Verificar position**: componentes animados necesitan `position: fixed` o `absolute`
3. **Simplificar el trigger**: usar elementos más generales como `body`
4. **Añadir logs**: confirmar que useEffect se ejecuta y las animaciones se crean

#### **Cuando el scroll no funciona:**
- Probar diferentes tipos de scroll (vertical que controla horizontal vs horizontal puro)
- Verificar que los estilos CSS no bloqueen el scroll (`overflow: hidden` vs `overflow-x: auto`)
- Testar en dispositivo real, no solo en navegador automatizado

### Commits y Versionado

#### **Estructura de Commits Exitosa:**
1. **COMMIT 1**: Dependencias (package.json, package-lock.json)
2. **COMMIT 2**: Componentes nuevos (archivos .tsx y .scss juntos)
3. **COMMIT 3**: Componentes adicionales por funcionalidad
4. **COMMIT 4**: Modificaciones a archivos existentes (App.tsx, estilos)
5. **COMMIT 5**: Documentación (README, planes, guías)

#### **Mensajes de Commit Efectivos:**
```bash
# ✅ Buenos ejemplos
feat: add GSAP dependencies for scroll animations
feat: add GSAP scroll components
feat: add HomeSection component
refactor: integrate GSAP components into main app
docs: update implementation plan

# ❌ Evitar
fix: stuff
update: components
chore: changes
```

## 🎨 Convenciones de Diseño y UX

### Estética Retro Pixelada
- **Colores principales**: fondo oscuro (#0B0B0B), texto blanco (#FFFFFF), acento naranja (#FF6A00)
- **Animaciones**: suaves pero con carácter retro (ease-out-back, bounce effects)
- **Elementos decorativos**: antorchas, brasas, partículas, sprites pixelados
- **Tipografía**: display retro + cuerpo legible

### Principios de Interacción
- **Hover effects**: desplazamiento 1-2px, sombras duras estilo 8-bit
- **Estados de botones**: transiciones de 0.15-0.2s con easing apropiado
- **Accessibility first**: respetar `prefers-reduced-motion`, contrast ratios AA
- **Mobile responsive**: adaptar animaciones para dispositivos táctiles

## 🔄 Workflow de Desarrollo

### Antes de Empezar una Tarea
1. **Leer documentación**: revisar `docs/Definición.md` y documentos relevantes
2. **Entender el contexto**: qué parte de la narrativa de la Lareira se está implementando
3. **Revisar el estado actual**: usar `git status` y `git log --oneline -5`
4. **Confirmar contexto y plan de accion con el usuario**: no hacer autoaprove
5. **Planificar commits**: dividir la tarea en commits lógicos

### Durante el Desarrollo
1. **Implementar paso a paso**: una funcionalidad a la vez
2. **Probar constantemente**: usar navegador y logs para validar
3. **No asumir éxito**: esperar confirmación del usuario antes de continuar
4. **Documentar decisiones**: añadir comentarios en código complejo

### Al Finalizar
1. **Verificar que todo funciona**: tanto en navegador automatizado como según feedback del usuario
2. **Hacer commits organizados**: seguir la estructura de dependencias → componentes → modificaciones → docs
3. **Actualizar documentación**: si se han aprendido nuevos patrones o reglas

## 📚 Patrones de Código Específicos

### Estructura de Componentes
```typescript
import { ReactNode, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Component.scss";

gsap.registerPlugin(ScrollTrigger);

interface ComponentProps {
  // props tipadas
}

const Component = (props: ComponentProps): ReactNode => {
  const { prop1, prop2 } = props;
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // lógica de animación
    return () => {
      // cleanup
    };
  }, []);

  return (
    <div ref={elementRef} className="component">
      {/* JSX */}
    </div>
  );
};

export default Component;
```

### Manejo de Errores y Edge Cases
- **Validar refs**: siempre verificar `if (!elementRef.current) return;`
- **Cleanup apropiado**: matar animaciones y limpiar timers en useEffect return
- **Fallbacks**: tener alternativas cuando las animaciones no se pueden cargar
- **Responsive**: considerar diferentes dispositivos y tamaños de pantalla

### Debugging y Logs
```typescript
// ✅ Logs útiles para debugging
console.log("Initial scrollAmount:", scrollAmount);
console.log("Progress:", self.progress.toFixed(3), "X:", currentX);

// ❌ Logs inútiles
console.log("component loaded");
console.log("working");
```

## 🚨 Red Flags y Señales de Alerta

### Indicadores de Problemas
- **"No veo nada"** → revisar z-index, position, y timing de animaciones
- **"No funciona el scroll"** → probar diferentes configuraciones de ScrollTrigger
- **"Se ve negro"** → probable problema de posicionamiento o timing
- **Pantalla en blanco** → error de sintaxis o dependencias faltantes

### Cuándo Cambiar de Enfoque
- Si después de 3 intentos el enfoque no funciona → cambiar la implementación
- Si el navegador automatizado funciona pero el real no → simplificar la animación
- Si las animaciones son demasiado complejas → dividir en pasos más pequeños

## 🎯 Objetivos de Calidad

### Rendimiento
- **JavaScript bundle**: < 180KB gzip
- **Lazy loading**: para componentes no críticos
- **Animaciones**: mantener 50+ FPS
- **Imágenes**: WebP optimizado

### Accesibilidad
- **Keyboard navigation**: todos los elementos interactivos accesibles
- **Screen readers**: etiquetas apropiadas y aria-labels
- **Contrast**: cumplir AA mínimo
- **Reduced motion**: respetar preferencias del usuario

### Experiencia de Usuario
- **Carga rápida**: LCP < 2.5s
- **Interacciones fluidas**: respuesta < 100ms
- **Mobile first**: optimizar para dispositivos táctiles
- **Fallbacks graceful**: experiencia mínima viable si fallan las animaciones

---

## 🔄 Recordatorios de Proceso

1. **Always read docs first** - La especificación tiene todas las respuestas
2. **Test iteratively** - Una funcionalidad a la vez, con confirmación
3. **Debug systematically** - Logs, simplificación, prueba en dispositivo real
4. **Commit logically** - Dependencias → Componentes → Modificaciones → Docs
5. **Keep the narrative** - Todo debe ser coherente con la temática de la Lareira

---

*Documento actualizado basado en experiencias reales de desarrollo. Mantener actualizado conforme se aprendan nuevos patrones y se resuelvan más problemas.*
