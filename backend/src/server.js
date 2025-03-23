const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const sequelize = require('./config/db');

// Import models
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');
const Product = require('./models/Product');
const User = require('./models/User');

// Define associations
Order.hasMany(OrderItem, { foreignKey: 'commande_id' });
OrderItem.belongsTo(Order, { foreignKey: 'commande_id' });
OrderItem.belongsTo(Product, { foreignKey: 'produit_id' });

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});