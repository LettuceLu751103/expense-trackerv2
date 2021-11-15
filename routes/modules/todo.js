const express = require('express')

const router = express.Router()

const List = require('../../models/list')
const Categorys = require('../../models/category')
const list = require('../../models/list')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, date, categoryName, amount } = req.body
  console.log(req.user.id)
  const userId = req.user._id
  console.log(req.user._id)
  console.log(categoryName)
  Categorys.findOne({ name: categoryName })
    .then(category => {
      console.log(category)
      const categoryId = category._id
      console.log(categoryId)
      return List.create({
        name: name,
        date: date,
        amount: amount,
        userId: userId,
        categoryId: categoryId
      }).then(() => {
        res.redirect('/')
      }).catch(err => {
        console.log(err)
      })
    })
    .catch(err => { console.log(err) })

})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  List.findOne({ _id, userId })
    .populate({ path: 'categoryId', select: 'name' })
    .lean()
    .then(list => {
      res.render('edit', { list })
    })
    .catch(error => {
      console.log(error)
    })

})

router.put('/:id', (req, res) => {
  // console.log('進到修改資料區')
  const _id = req.params.id
  const userId = req.user._id
  const { name, date, categoryName, amount } = req.body
  // console.log(`name: ${name}, date: ${date}, type: ${type}, amount: ${amount}`)
  Categorys.findOne({ name: categoryName })
    .lean()
    .then(data => {

      List.findOne({ _id, userId })
        .then(originData => {
          originData.name = name,
            originData.date = date,
            originData.categoryId = data._id,
            originData.amount = amount,
            originData.userId = userId
          return originData.save()
        })
        .then(() => {
          res.redirect('/')
        })
        .catch(error => {
          console.log(error)
        })
    })
    .catch(error => {
      console.log(error)
    })


})


router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  List.findOne({ _id, userId })
    .then(removeData => {
      removeData.remove()
      console.log('刪除資料')
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })
})

router.get('/searchItem', (req, res) => {
  const categoryName = req.query.categoryName
  const userId = req.user._id
  let searchItem = { name: categoryName }
  if (categoryName === '全部') {
    searchItem = {}
    return List.find({ userId })
      .populate({ path: 'categoryId', select: 'css' })
      .lean()
      .sort('asc')
      .then(resData => {
        let totalAmount = 0
        resData.forEach(list => {
          totalAmount += Number(list.amount)
        })
        res.json({ resData, totalAmount })
      })
      .catch(error => {
        console.log(error)
      })
  }
  return Categorys.findOne(searchItem)
    .lean()
    .then(data => {
      const categoryId = data._id
      list.find({ userId, categoryId })
        .populate({ path: 'categoryId', select: 'css' })
        .lean()
        .then(resData => {
          let totalAmount = 0
          resData.forEach(list => {
            totalAmount += Number(list.amount)
          })
          res.json({ resData, totalAmount })
        })
        .catch(error => {
          console.log(error)
        })

    })
    .catch(error => {
      console.log(error)
    })


})



module.exports = router