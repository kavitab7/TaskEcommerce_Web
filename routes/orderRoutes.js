const express = require('express');
const isSignIn = require('../middlewares/sign');
const isAdmin = require('../middlewares/admin');
const { createOrder, userOrders, allOrders, updateStaus } = require('../controllers/orderController');

const router = express.Router();


router.post('/create-order', isSignIn, createOrder)
router.get('/orders/:uid', isSignIn, userOrders)

//for admin
router.get('/orders', isSignIn, isAdmin, allOrders)
router.put('/update-status/:pid', isSignIn, isAdmin, updateStaus)

module.exports = router