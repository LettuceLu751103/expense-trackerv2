const express = require('express')

const router = express.Router()

const home = require('./modules/home')
const todo = require('./modules/todo')
const user = require('./modules/user')

router.use('/todo', todo)

router.use('/user', user)

router.use('/', home)


module.exports = router