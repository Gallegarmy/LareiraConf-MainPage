# Convenciones de Código - LareiraConf'26

## TypeScript y React

### Sintaxis de componentes
```typescript
// ✅ Preferido
const ComponentName = (props: Props): ReactNode => {
  const { prop1, prop2, prop3 } = props;
  // ...
}

// ❌ Evitar
const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // ...
}
```

### Imports
- No importar React en cada componente (se configura automáticamente)
- Usar imports específicos cuando sea necesario
- Destructuring de props en la primera línea del componente

### Interfaces y Types
```typescript
interface ComponentProps {
  title: string;
  isVisible?: boolean;
  onClick: () => void;
}
```

### Estructura de archivos
- Componentes en inglés
- Archivos `.tsx` para componentes
- Archivos `.ts` para utilidades y hooks
- SCSS modular por componente

### Comentarios
- Solo cuando son estrictamente necesarios
- Para explicar animaciones complejas o lógica específica
- Evitar comentarios obvios

## Ejemplos

### Componente básico
```typescript
import { ReactNode } from 'react';
import './Component.scss';

interface ComponentProps {
  children: ReactNode;
  className?: string;
}

const Component = (props: ComponentProps): ReactNode => {
  const { children, className = '' } = props;
  
  return (
    <div className={`component ${className}`}>
      {children}
    </div>
  );
};

export default Component;
```

### Hook personalizado
```typescript
import { useState, useEffect } from 'react';

interface UseScrollProps {
  threshold?: number;
}

const useScroll = (props: UseScrollProps) => {
  const { threshold = 0 } = props;
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    // Lógica del hook
  }, []);
  
  return { scrollY };
};

export default useScroll;
