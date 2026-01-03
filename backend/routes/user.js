const express = require('express')

//controller function
const { loginUser, signupUser } = require('../controllers/userController') // import the controller
const router = express.Router()

//login route
router.post('/login', loginUser) //use the login controller

//sign up route
router.post('/signup', signupUser)

module.exports = router