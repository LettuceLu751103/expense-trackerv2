const express = require('express')

const router = express.Router()

const List = require('../../models/list')
const Category = require('../../models/category')



router.get('/', (req, res) => {

  const userId = req.user._id
  console.log(req.user._id)
  List.find({ userId })
    .populate({ path: 'categoryId', select: 'css' })
    .lean()
    .sort('asc')
    .then(lists => {
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