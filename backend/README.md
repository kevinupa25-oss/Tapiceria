# Backend - Tapicería API

Backend del sistema de gestión de productos de tapicería.

## Tecnologías

- Node.js + Express
- MongoDB con Mongoose
- Cloudinary (gestión de imágenes)

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
- Copiar `.env.example` a `.env`
- Configurar las credenciales de MongoDB y Cloudinary

3. Iniciar el servidor:
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Endpoints API

### Productos

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto
- `POST /api/products` - Crear producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

## Estructura

```
backend/
├── src/
│   ├── config/        # Configuraciones (DB, Cloudinary)
│   ├── models/        # Modelos de MongoDB
│   ├── routes/        # Rutas de la API
│   └── server.js      # Punto de entrada
├── .env.example
└── package.json
```
