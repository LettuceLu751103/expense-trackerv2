const express = require('express')

const router = express.Router()

const List = require('../../models/list')

router.get('/', (req, res) => {
  console.log(req.user._id)
  const userId = req.user._id
  List.find({ userId })
    .lean()
    .sort('asc')
    .then(lists => {
      // console.log(lists)
      let totalAmount = 0
      lists.forEach(list => {
        totalAmount += Number(list.amount)
      })
      res.render('index', { lists, totalAmount })
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router