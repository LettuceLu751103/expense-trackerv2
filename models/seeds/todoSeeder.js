const db = require('../../config/mongoose')
const list = require('../list')
const User = require('../user')
const Category = require('../category')
const bcrypt = require('bcryptjs')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

listData = {
  name: '房租',
  date: '2021-10-24',
  type: "1",
  amount: '45000',
}

const fakeData = [{
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

      fakeData.forEach(data => {
        console.log('=== in ===')
        console.log(data.type)
        console.log('=== out ===')
        const type = data.type
        Category.findOne({ type })
          .lean()
          .then(categoryData => {
            console.log(data)
            console.log(userId)
            console.log(categoryData._id)
            const categoryId = categoryData._id
            list.create({ name: data.name, date: data.date, amount: data.amount, userId, categoryId })
              .then(() => {
                console.log('資料新增成功')
              })
              .catch(error => {
                console.log(error)
              })
          })
          .catch(error => {
            console.log(error)
          })
      })



    })
    .then(() => {
      console.log('done.')

    })
})

// process.exit()