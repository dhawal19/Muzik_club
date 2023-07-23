const express = require('express');
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const slotController = require('../controllers/slotcontroller');

router.post('/', slotController.createSlot);

router.delete('/:id', slotController.deleteSlot);

router.get('/', slotController.getAllSlot);

router.get('/:id', slotController.getSlotById);

router.patch('/', slotController.updateSlot);

module.exports = router;