const express = require('express')

const app = express()
const routes = require('./routes')
const db = require('./config/mongoose')


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





app.listen(3000, () => {
  console.log('This is http server running on http://localhost:3000')
})