# Frontend - Tapicería

Frontend de la aplicación de gestión de productos de tapicería.

## Tecnologías

- React 18
- TypeScript
- Vite
- TailwindCSS
- Radix UI Components
- Lucide Icons

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
- Copiar `.env.example` a `.env`
- Configurar la URL del backend (por defecto: http://localhost:5000/api)

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

4. Construir para producción:
```bash
npm run build
```

## Estructura

```
frontend/
├── src/
│   ├── components/     # Componentes React
│   ├── services/       # Servicios API
│   ├── assets/         # Imágenes y recursos
│   ├── styles/         # Estilos globales
│   └── App.tsx         # Componente principal
├── index.html
├── vite.config.ts
└── package.json
```

## Características

- Panel de administración para gestión de productos
- Visualización de productos por categorías
- Sistema de autenticación
- Carrito de compras
- Diseño responsivo
- Integración con backend API


# Solución de Problemas - Frontend

## ✅ Problemas Corregidos

### 1. Error de Tailwind CSS
**Error**: `@layer base is used but no matching @tailwind base directive is present`

**Solución**: Agregar las directivas de Tailwind al inicio de `index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 2. Error de Imports con Versiones
**Error**: `Failed to resolve import "sonner@2.0.3"`

**Solución**: Los imports deben usar nombres sin versiones:
```typescript
// ❌ Incorrecto
import { toast } from 'sonner@2.0.3';
import { Slot } from '@radix-ui/react-slot@1.1.2';

// ✅ Correcto
import { toast } from 'sonner';
import { Slot } from '@radix-ui/react-slot';
```

### 3. Dependencias No Instaladas
**Error**: `Could not be resolved: Are they installed?`

**Solución**: Instalar dependencias:
```bash
cd frontend
npm install
```

## 🚀 Cómo Iniciar el Proyecto

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configurar .env con tus credenciales
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔧 Comandos Útiles

### Limpiar caché de npm
```bash
npm cache clean --force
```

### Reinstalar dependencias
```bash
rm -rf node_modules package-lock.json
npm install
```

### Ver errores de TypeScript
```bash
npx tsc --noEmit
```

## ⚠️ Problemas Comunes

### Puerto ocupado
Si el puerto 3000 está ocupado, Vite usará automáticamente 3001, 3002, etc.

### Advertencia de PostCSS
La advertencia de PostCSS es menor y no afecta el funcionamiento.

### Errores de permisos en Windows
Al eliminar node_modules, cierra VS Code y editores que puedan estar bloqueando archivos.

## 📝 Checklist de Verificación

- [ ] MongoDB está corriendo
- [ ] Backend está corriendo en puerto 5000
- [ ] Frontend está corriendo en puerto 3000 o 3001
- [ ] Variables de entorno configuradas (.env)
- [ ] Dependencias instaladas (node_modules existe)

## 🌐 URLs del Proyecto

- **Backend API**: http://localhost:5000/api
- **Frontend**: http://localhost:3000 (o 3001)

## 🐛 Debugging

### Ver logs del backend
El backend muestra logs en la consola donde se ejecuta `npm run dev`

### Ver errores del frontend
Abre DevTools del navegador (F12) y revisa la consola

### Verificar conexión a MongoDB
```bash
# En una terminal separada
mongosh
show dbs
use tapiceria
db.products.find()
```
