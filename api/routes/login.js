const express = require('express');
const router = express.Router();
const {join} = require('path');
const authController = require('../controllers/authController.js');

router.post('/', authController.handleLogin);

module.exports = router;