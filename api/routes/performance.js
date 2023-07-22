const express = require('express');
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const performanceController = require('../controllers/performancecontroller');

router.post('/', performanceController.createPerformance);

router.delete('/:id', performanceController.deletePerformance);

router.get('/', performanceController.getAllPerformance);

router.get('/:id', performanceController.getPerformanceById);

router.patch('/', performanceController.updatePerformance);

module.exports = router;