const express = require('express');
const { getProductById, getLatestProducts, getCategories } = require('../controllers/product');

const router = express.Router();

router.get('/latest', getLatestProducts);
router.get("/categories", getCategories);
router.get('/:id', getProductById);

module.exports = router;