const { connectDB, Product } = require('../../api/_db');

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    await connectDB();
    const { id } = req.query;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
}