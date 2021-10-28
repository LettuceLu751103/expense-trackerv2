const express = require('express')

const router = express.Router()

const home = require('./modules/home')
const todo = require('./modules/todo')
const user = require('./modules/user')
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')



router.use('/todo', authenticator, todo)

router.use('/user', user)

router.use('/auth', auth)

router.use('/', authenticator, home)


module.exports = router