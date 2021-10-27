const express = require('express')

const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {

  const { name, email, password, confirmPassword } = req.body
  console.log(`name : ${name}`)
  console.log(`email : ${email}`)
  console.log(`password : ${password}`)
  console.log(`confirmPassword : ${confirmPassword}`)

  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log(user)
        console.log('email already existed!')
        // res.render('register', { name, email, password, confirmPassword })
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        console.log('data is not exist, prepare to save to db')
        return User.create({
          name: name,
          email: email,
          password: password,
        })
          .then(() => {
            console.log('data already save to db!!!')
            res.redirect('/')
          })
          .catch(error => {
            console.log(error)
          })
      }
    })


})

module.exports = router