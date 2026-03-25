const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const sequelize = require('./config/db');

// Import models
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');
const Product = require('./models/Product');
const User = require('./models/User');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Define associations
Order.hasMany(OrderItem, { foreignKey: 'commande_id' });
OrderItem.belongsTo(Order, { foreignKey: 'commande_id' });
OrderItem.belongsTo(Product, { foreignKey: 'produit_id' });

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', FRONTEND_URL);
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-user-id');

  next();
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Handle React Router - send all non-API requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});