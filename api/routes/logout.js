const express = require('express');
const router = express.Router();
const {join} = require('path');
const logoutController = require('../controllers/logoutController');

router.get('/', logoutController.handleLogout);

module.exports = router;