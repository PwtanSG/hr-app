const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, listUsers, createUser} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.get('/list', listUsers)
// router.post('/register', registerUser)
router.post('/create', createUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router