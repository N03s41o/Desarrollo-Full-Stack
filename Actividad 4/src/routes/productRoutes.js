const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', productController.getProducts);
router.post('/', authMiddleware, productController.createProduct); // Ruta protegida

module.exports = router;