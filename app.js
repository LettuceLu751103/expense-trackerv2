const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const app = express()
const routes = require('./routes')

mongoose.connect('mongodb://localhost/expense-tracker')

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const methodOverride = require('method-override')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 將 request 導進 routes
app.use(routes)

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



app.listen(3000, () => {
  console.log('This is http server running on http://localhost:3000')
})