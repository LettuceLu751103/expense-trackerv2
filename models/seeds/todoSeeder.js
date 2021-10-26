const db = require('../../config/mongoose')
const list = require('../list')

const fakeData = [{
  name: '房租',
  date: '2021-10-24',
  type: '<i class="fas fa-home"></i>',
  amount: '45000',
},
{
  name: '買 pizza x3',
  date: '2021-10-10',
  type: '<i class="fas fa-utensils"></i>',
  amount: '2000',
},
{
  name: '搭公車',
  date: '2021-10-25',
  type: '<i class="fas fa-shuttle-van"></i>',
  amount: '35',
},
{
  name: '喬伊開公司登記費用',
  date: '2021-10-27',
  type: '<i class="fas fa-pen"></i>',
  amount: '700',
  __v: 0
},
{
  name: '買蒜頭鹽酥雞',
  date: '2021-10-26',
  type: '<i class="fas fa-utensils"></i>',
  amount: '360',
}]


db.once('open', () => {
  fakeData.forEach(data => {
    list.create(data)
      .then(() => {
        console.log('=== prepare add seed to the db ===')
        console.log(`name: ${data.name} `)
        console.log(`type: ${data.type} `)
        console.log(`amount: ${data.amount} `)
        console.log(`date: ${data.date} `)
        console.log('=== already add seed to the db ===')
      })
      .catch(error => {
        console.log(error)
      })
  })

  console.log('done')
})