const express = require('express');
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const performanceController = require('../controllers/performancecontroller');

router.route('/')
    .post('/', performanceController.createPerformance)

    .delete('/:id', performanceController.deletePerformance)

    .get('/', performanceController.getAllPerformance)

    .get('/:id', performanceController.getPerformanceById)

    .patch('/', performanceController.updatePerformance);

module.exports = router;