const router = require('express').Router()
const User = require('../db/models/user')
const firebase = require('firebase')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    const referencePath = '/Users/' + username + '/'
    const userReference = firebase.database().ref(referencePath)
    //user is created but how to send a user back?
    const newUser = await userReference.update(
      {Username: username, Email: email, Password: password},
      function(error) {
        if (error) {
          res.send('Data could not be updated.' + error)
        } else {
          console.log(newUser)
          req.login(newUser, err => (err ? next(err) : res.json(newUser)))
        }
      }
    )
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
