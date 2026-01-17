const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

// GET - Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// GET - Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// POST - Crear nuevo producto
router.post('/', async (req, res) => {
  try {
    let imageUrl = req.body.image;
    
    // Por ahora, guardar la imagen como data URL directamente sin subir a Cloudinary
    // Si la imagen es un data URL, subirla a Cloudinary
    // if (imageUrl && imageUrl.startsWith('data:')) {
    //   const result = await cloudinary.uploader.upload(imageUrl, {
    //     folder: 'tapiceria',
    //   });
    //   imageUrl = result.secure_url;
    // }

    const product = new Product({
      name: req.body.name,
      image: imageUrl,
      gama: req.body.gama,
    });
    
    await product.save();
    console.log('Producto creado:', product.name);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// PUT - Actualizar producto
router.put('/:id', async (req, res) => {
  try {
    let imageUrl = req.body.image;
    
    // Por ahora, guardar la imagen como data URL directamente sin subir a Cloudinary
    // Si la imagen es un data URL, subirla a Cloudinary
    // if (imageUrl && imageUrl.startsWith('data:')) {
    //   const result = await cloudinary.uploader.upload(imageUrl, {
    //     folder: 'tapiceria',
    //   });
    //   imageUrl = result.secure_url;
    // }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        image: imageUrl,
        gama: req.body.gama,
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    console.log('Producto actualizado:', product.name);
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// DELETE - Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    console.log('Producto eliminado:', product.name);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;
