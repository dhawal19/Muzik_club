const express = require('express');
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const attendanceController = require('../controllers/attendancecontroller');

router.route('/')
    .post(attendanceController.createAttendance)

    .delete('/:id', attendanceController.deleteAttendance)

    .get('/', attendanceController.getAllAttendance)

    .get('/:id', attendanceController.getAttendanceById)

    .patch('/', attendanceController.updateAttendance);

module.exports = router;