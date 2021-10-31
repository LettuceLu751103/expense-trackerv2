const db = require('../../config/mongoose')
const category = require('../category')

const fakeData = [{
  name: '家居物業',
  css: '<i class="fas fa-home"></i>',
  type: '1'
},
{
  name: '交通出行',
  css: '<i class="fas fa-shuttle-van"></i>',
  type: '2'
},
{
  name: '休閒娛樂',
  css: '<i class="fas fa-grin-beam"></i>',
  type: '3'
},
{
  name: '餐飲食品',
  css: '<i class="fas fa-utensils"></i>',
  type: '4'
},
{
  name: '其他',
  css: '<i class="fas fa-pen"></i>',
  type: '5'
}]


db.once('open', () => {

  return Promise.all(fakeData)
    .then(data => {
      console.log(data)
      return category.create(data)
        .then(() => {
          console.log('data 寫入成功')
        })
        .catch(err => { console.log(err) })
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => {
      console.log(err)
    })

})