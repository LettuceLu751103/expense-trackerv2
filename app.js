const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const app = express()

mongoose.connect('mongodb://localhost/expense-tracker')

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const methodOverride = require('method-override')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const List = require('./models/list')


app.get('/', (req, res) => {
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


app.get('/new', (req, res) => {
  res.render('new')
})

app.post('/new', (req, res) => {
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

app.get('/:id/edit', (req, res) => {
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

app.put('/:id', (req, res) => {
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

app.delete('/:id', (req, res) => {
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




app.listen(3000, () => {
  console.log('This is http server running on http://localhost:3000')
})