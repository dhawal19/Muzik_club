const express = require('express');
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const slotController = require('../controllers/slotcontroller');

router.post('/', slotController.createSlot);

router.delete('/:id', slotController.deleteSlot);

router.get('/', slotController.getAllSlot);

router.get('/:userId', slotController.getSlotsByUserId);

router.patch('/', slotController.updateSlot);

module.exports = router;