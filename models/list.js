const mongoose = require('mongoose')
const Schema = mongoose.Schema
const listSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  date: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  type: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  amount: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
})
module.exports = mongoose.model('List', listSchema)