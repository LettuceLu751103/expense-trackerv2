const express = require('express')

const router = express.Router()

const List = require('../../models/list')


router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, date, type, amount } = req.body

  return List.create({
    name: name,
    date: date,
    type: type,
    amount: amount
  }).then(() => {
    res.redirect('/')
  }).catch(err => {
    console.log(err)
  })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  console.log(id)
  List.findById(id)
    .lean()
    .then(list => {
      console.log(list)
      res.render('edit', { list })
    })
    .catch(error => {
      console.log(error)
    })

})

router.put('/:id', (req, res) => {
  // console.log('進到修改資料區')
  const id = req.params.id
  const { name, date, type, amount } = req.body
  // console.log(`name: ${name}, date: ${date}, type: ${type}, amount: ${amount}`)
  List.findById(id)
    .then(originData => {
      originData.name = name,
        originData.date = date,
        originData.type = type,
        originData.amount = amount
      return originData.save()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })

})


router.delete('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  List.findById(id)
    .then(removeData => {
      removeData.remove()
      console.log('刪除資料')
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })
})


module.exports = router