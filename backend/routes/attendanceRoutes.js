const express = require('express')
const router = express.Router()
const { getMyAttendances, getAttendanceList, createAttendances, updateAttendances, deleteAttendances, clockOutAttendances }  = require('../controllers/attendanceController')
const { protect } = require('../middleware/authMiddleware')

router.get('/myattendance', protect, getMyAttendances)
router.get('/list', getAttendanceList)
router.post('/create', protect, createAttendances)
router.post('/clockin', protect, createAttendances)
router.put('/clockout', protect, clockOutAttendances)
router.put('/:id', protect, updateAttendances)
router.delete('/:id', protect, deleteAttendances)

module.exports = router