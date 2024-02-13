const express = require('express');
const isSignIn = require('../middlewares/sign');
const isAdmin = require('../middlewares/admin');
const { createCategory, getCateProducts, getAllCategories } = require('../controllers/categoryController');

const router = express.Router()

router.post('/create-category', isSignIn, isAdmin, createCategory);
router.get('/all-categories', getAllCategories);

//get category wise product
router.get('/category-products/:name', getCateProducts)

module.exports = router;