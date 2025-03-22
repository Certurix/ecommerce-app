const sequelize = require('../config/db');
const Product = require('../models/Product');

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLatestProducts = async (req, res) => {
  try {
    const [products] = await sequelize.query(`
      SELECT id, reference, nom, description, prix, stock, categorie_id, image_url
      FROM produits
      ORDER BY id DESC
      LIMIT 4
    `);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await sequelize.query(`
      SELECT id, nom
      FROM categories
    `);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}