const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tapiceria');
    isConnected = true;
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    throw error;
  }
};

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Modelo de Producto
const productSchema = new mongoose.Schema({
  name: String,
  gama: String,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = { connectDB, Product, cloudinary };