const express = require('express')

// controller functions
const {signupUser, loginUser} = require('../controllers/userController')

const router = express.Router()

// log in route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

module.exports = router