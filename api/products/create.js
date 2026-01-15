const { connectDB, Product } = require('../api/_db');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    await connectDB();
    console.log('POST /api/products recibido:', req.body.name);

    let imageUrl = req.body.image; // Data URL desde frontend

    const product = new Product({
      name: req.body.name,
      image: imageUrl,
      gama: req.body.gama,
    });

    await product.save();
    console.log('Producto guardado:', product);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
}