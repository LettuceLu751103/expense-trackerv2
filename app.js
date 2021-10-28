const express = require('express')

const app = express()
const routes = require('./routes')
const db = require('./config/mongoose')
const session = require('express-session')
const usePassport = require('./config/passport')

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const methodOverride = require('method-override')
const flash = require('connect-flash')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: "ThisIsMySecret",
  resave: false,
  saveUninitialized: true
}))

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

usePassport(app)
app.use(flash())  // 掛載套件
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

// 將 request 導進 routes
app.use(routes)





app.listen(3000, () => {
  console.log('This is http server running on http://localhost:3000')
})