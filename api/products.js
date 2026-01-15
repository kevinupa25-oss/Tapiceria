const { connectDB, Product } = require('../api/_db');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    await connectDB();
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'Error en base de datos' });
  }
}