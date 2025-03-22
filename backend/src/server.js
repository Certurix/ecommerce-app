const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const sequelize = require('./config/db');

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});