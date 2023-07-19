const express = require('express');
const router = express.Router();
const {join} = require('path');
const { handleRefreshToken } = require('../controllers/refreshTokenController');

router.get('/', handleRefreshToken);

module.exports = router;