const express = require('express');
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const attendanceController = require('../controllers/attendancecontroller');

router.post('/', attendanceController.createAttendance);

router.delete('/:id', attendanceController.deleteAttendance);

router.get('/', attendanceController.getAllAttendance);

router.get('/:id', attendanceController.getAttendanceById);

router.patch('/', attendanceController.updateAttendance);

module.exports = router;