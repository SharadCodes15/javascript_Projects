const express  = require('express');
const app = require('../app');
const authController = require('../controllers/auth.controller')
const router = express.Router();

router.post('/register',authController.registerUser)
router.post('/login',authController.loginUser)
router.post('/logout',authController.logoutuser)
// in production token blacklisting is used
module.exports = router