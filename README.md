# E-commerce Dashboard - Sistema de Gestión de Productos

Aplicación web moderna construida con Next.js, TypeScript y Tailwind CSS que consume la [Fake Store API](https://fakestoreapi.com/) para mostrar y gestionar productos de un e-commerce.

## 🚀 Cómo correr el proyecto

### Prerrequisitos

- Node.js >= 20.9.0
- npm, yarn, pnpm o bun

### Instalación y ejecución

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

### Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta ESLint para verificar el código

## 📁 Arquitectura del Proyecto

Este proyecto utiliza una arquitectura basada en **Feature-Sliced Design (FSD)**, adaptada para Next.js con App Router.

### Estructura de carpetas

```
src/
├── app/                    # Next.js App Router (páginas y layouts)
│   ├── layout.tsx         # Layout principal con CartProvider
│   ├── page.tsx           # Página principal (listado de productos)
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx   # Página de detalle del producto
│   └── cart/
│       └── page.tsx        # Página del carrito de compras
├── features/              # Features (lógica de negocio por dominio)
│   ├── products/          # Feature: Gestión de productos
│   │   ├── api/           # Servicios API
│   │   ├── components/    # Componentes específicos del feature
│   │   ├── hooks/         # Custom hooks
│   │   └── types/         # Tipos TypeScript
│   └── cart/              # Feature: Carrito de compras
│       ├── components/
│       ├── context/        # Context API para estado global
│       ├── hooks/
│       └── types/
├── shared/                # Código compartido entre features
│   ├── ui/                # Componentes UI reutilizables
│   ├── hooks/             # Hooks compartidos
│   └── utils/             # Utilidades y helpers
└── __tests__/             # Tests (estructura preparada)
```

## 🏗️ Decisión Técnica: Feature-Sliced Design

### ¿Por qué Feature-Sliced Design?

Se eligió esta arquitectura porque ofrece una **separación clara de responsabilidades** y facilita el mantenimiento y escalabilidad del proyecto.

### ✅ Ventajas para prueba técnica:

- **Rápida de implementar** - No requiere mucha planificación inicial
- **Escalable** - Demuestra pensamiento a largo plazo
- **Clara separación** - Cada feature es autocontenida
- **Fácil de explicar** - Los evaluadores la entienden rápido
- **Modern & trending** - Está ganando popularidad (2023-2025)
- **Testing simple** - Cada feature se testea independientemente

### ❌ Desventajas:

- Puede ser "overkill" para proyectos muy pequeños
- Requiere disciplina para mantener las boundaries

### ⏱️ Tiempo de setup: 10-15 minutos

### Principios de la arquitectura:

1. **Features independientes**: Cada feature (`products`, `cart`) contiene toda su lógica relacionada
2. **Shared reutilizable**: Componentes, hooks y utilidades compartidas viven en `shared/`
3. **Separación de capas**: API, componentes, hooks y tipos están claramente separados
4. **Escalabilidad**: Fácil agregar nuevos features sin afectar los existentes

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **API**: Fake Store API
- **Estado Global**: React Context API
- **Linting**: ESLint

## 📦 Features Implementadas

### 🛍️ Gestión de Productos
- Listado de productos con grid responsive
- Búsqueda de productos (con debounce)
- Filtros por categoría y rango de precios
- Ordenamiento (precio ascendente/descendente, rating)
- Página de detalle del producto

### 🛒 Carrito de Compras
- Agregar productos al carrito
- Actualizar cantidades
- Remover productos
- Resumen de totales
- Persistencia en memoria (Context API)

### 🎨 UI/UX
- Diseño responsive
- Componentes reutilizables (Button, Card, Loading)
- Estados de carga y error
- Navegación intuitiva

## 🔧 Configuración

### Next.js Image Optimization

El proyecto está configurado para permitir imágenes desde `fakestoreapi.com`:

```typescript
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'fakestoreapi.com',
      pathname: '/img/**',
    },
  ],
}
```

## 📝 Próximas mejoras

- [ ] Persistencia del carrito en localStorage
- [ ] Tests unitarios y de integración
- [ ] Optimización de imágenes con placeholder
- [ ] Paginación de productos
- [ ] Manejo de errores más robusto
- [ ] Animaciones y transiciones

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [Fake Store API](https://fakestoreapi.com/)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 Licencia

Este proyecto es una demostración técnica.
