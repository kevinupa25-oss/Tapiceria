const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const productRoutes = require('./routes/products');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Conectar a la base de datos
connectDB();

// Rutas
app.get('/api', (req, res) => {
  res.json({ message: 'API de Tapicería funcionando correctamente' });
});

app.use('/api/products', productRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en puerto ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}/api`);
});
