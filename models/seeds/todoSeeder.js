const db = require('../../config/mongoose')
const list = require('../list')
const User = require('../user')
const bcrypt = require('bcryptjs')
const category = require('../category')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}


const fakeDatas = [{
  name: '房租',
  date: '2021-10-24',
  amount: '45000',
  type: "1",
},
{
  name: '買 pizza x3',
  date: '2021-10-10',
  amount: '2000',
  type: "4",
},
{
  name: '搭公車',
  date: '2021-10-25',
  amount: '35',
  type: "2",
},
{
  name: '喬伊開公司登記費用',
  date: '2021-10-27',
  amount: '700',
  type: "5",
},
{
  name: '買蒜頭鹽酥雞',
  date: '2021-10-26',
  amount: '360',
  type: "4",
}]


db.once('open', () => {

  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      Promise.all(fakeDatas)
        .then(fakeData => {
          fakeData.map(async singleData => {
            const categoryId = await category.findOne({ type: singleData.type })
            const record = {
              userId,
              categoryId: categoryId._id,
              name: singleData.name,
              date: singleData.date,
              amount: singleData.amount
            }
            console.log(record)
            await list.create(record)
            console.log('record seeder done!')
            process.exit()
          })

        })
        .catch(err => { console.log(err) })


    })
    .catch(error => {
      console.log(error)
    })



})


