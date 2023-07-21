const express = require('express');
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const userInfoController = require('../controllers/userinfocontroller');

router.route('/')
    .post('/', userInfoController.createUserInfo)

    .delete('/:id', userInfoController.deleteUserInfo)

    .get('/', userInfoController.getAllUserInfo)

    .get('/:id', userInfoController.getUserInfoById)

    .patch('/', userInfoController.updateUserInfo);

module.exports = router;