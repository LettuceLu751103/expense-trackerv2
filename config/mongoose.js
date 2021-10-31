const mongoose = require('mongoose') // 載入 mongoose

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const MONGODB_URL = process.env.MONGODB_URI
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })




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

module.exports = db
