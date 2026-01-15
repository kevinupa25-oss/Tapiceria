// server.js
const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Conectar a MongoDB local
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tapiceria', {
}).then(() => {
  console.log('Conectado a MongoDB DB:', mongoose.connection.name);
})
  .catch(err => console.error('Error de conexión:', err));

// Modelo de Producto
const productSchema = new mongoose.Schema({
  name: String,
  gama: String,
  image: String,
});
const Product = mongoose.model('Product', productSchema);

// Rutas
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'Error en base de datos' });
  }
});

app.post('/api/products', async (req, res) => {
  console.log('POST /api/products recibido:', req.body.name);
  try {
    let imageUrl = req.body.image; // Data URL desde frontend
    // Temporal: no subir a Cloudinary
    // const result = await cloudinary.uploader.upload(imageUrl, {
    //   folder: 'tapiceria',
    // });
    // imageUrl = result.secure_url;

    const product = new Product({
      name: req.body.name,
      image: imageUrl,
      gama: req.body.gama,
    });
    await product.save();
    console.log('Producto guardado:', product);
    res.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error al subir producto' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    let imageUrl = req.body.image;
    // Temporal: no subir
    // if (imageUrl.startsWith('data:')) {
    //   const result = await cloudinary.uploader.upload(imageUrl, {
    //     folder: 'tapiceria',
    //   });
    //   imageUrl = result.secure_url;
    // }

    const product = await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      image: imageUrl,
      gama: req.body.gama,
    }, { new: true });
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));