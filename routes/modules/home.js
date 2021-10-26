const express = require('express')

const router = express.Router()

const List = require('../../models/list')

router.get('/', (req, res) => {
  let searchItem = req.query || {}
  if (searchItem.type === '0') {
    searchItem = {}
  }
  List.find(searchItem)
    .lean()
    .then(lists => {
      // console.log(lists)
      let totalAmount = 0
      lists.forEach(list => {
        totalAmount += Number(list.amount)
      })
      res.render('index', { lists, totalAmount, searchItem })
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router