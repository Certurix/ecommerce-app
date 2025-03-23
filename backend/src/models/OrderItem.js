const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');
const Order = require('./Order');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  commande_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'commandes',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  produit_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'produits',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  prix_unitaire: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'details_commande',
  timestamps: false,
});

OrderItem.belongsTo(Product, { foreignKey: 'produit_id' });
OrderItem.belongsTo(Order, { foreignKey: 'commande_id' });

module.exports = OrderItem;