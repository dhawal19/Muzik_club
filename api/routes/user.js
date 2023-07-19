const express = require('express');
const router = express.Router();
const {join} = require('path');
const verifyRoles = require('../middleware/verifyRoles');

router.get('/', verifyRoles(2001), (req, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

module.exports = router;