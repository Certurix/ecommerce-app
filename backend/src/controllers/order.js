const sequelize = require('../config/db');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;

  try {
    const order = await Order.findOne({
      where: { id, user_id },
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createOrder = async (req, res) => {
  const { user_id, items, shipping_address } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const total = items.reduce((sum, item) => sum + item.prix * item.quantity, 0);

    const order = await Order.create({
      user_id,
      statut: 'En attente',
      total,
      adresse: shipping_address,
    }, { transaction });

    const orderItems = items.map(item => ({
      commande_id: order.id,
      produit_id: item.product_id,
      quantite: item.quantity,
      prix_unitaire: item.prix,
    }));

    await OrderItem.bulkCreate(orderItems, { transaction });

    for (const item of items) {
      const product = await Product.findByPk(item.product_id, { transaction });
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.nom}`);
      }
      product.stock -= item.quantity;
      await product.save({ transaction });
    }

    await transaction.commit();
    res.status(201).json(order);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  const { user_id } = req.query;

  try {
    const orders = await Order.findAll({
      where: { user_id },
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
      ],
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};