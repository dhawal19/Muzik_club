const express = require('express');
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const userInfoController = require('../controllers/userinfocontroller');

router.post( '/', userInfoController.createUserInfo);

router.delete('/:id', userInfoController.deleteUserInfo)

router.get('/', userInfoController.getAllUserInfo);

router.get('/:email', userInfoController.getUserInfoByEmail);

router.patch('/', userInfoController.updateUserInfo);

module.exports = router;