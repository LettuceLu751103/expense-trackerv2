const express = require('express')

const router = express.Router()

const home = require('./modules/home')
const todo = require('./modules/todo')


router.use('/todo', todo)
router.use('/', home)



module.exports = router