const { connectDB, Product } = require('../../api/_db');

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    await connectDB();
    const { id } = req.query;

    let imageUrl = req.body.image;

    const product = await Product.findByIdAndUpdate(id, {
      name: req.body.name,
      image: imageUrl,
      gama: req.body.gama,
    }, { new: true });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
}