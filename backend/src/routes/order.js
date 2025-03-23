const express = require('express');
const { getOrderById, createOrder, getOrdersByUserId } = require('../controllers/order');

const router = express.Router();

router.get('/:id', getOrderById);
router.post('/', createOrder);
router.get('/', getOrdersByUserId);

module.exports = router;