const express = require('express');
const isSignIn = require('../middlewares/sign');
const isAdmin = require('../middlewares/admin');
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

//for admin
router.post('/create-product', isSignIn, isAdmin, createProduct)
router.put('/update-product/:pid', isSignIn, isAdmin, updateProduct)
router.delete('/delete-product/:pid', isSignIn, isAdmin, deleteProduct)

//for anyone
router.get('/all-products', getAllProducts)
module.exports = router