const express = require('express');
const isSignIn = require('../middlewares/sign');
const isAdmin = require('../middlewares/admin');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/admin-auth', isSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})
module.exports = router;