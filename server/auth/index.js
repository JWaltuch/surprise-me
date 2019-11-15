const router = require('express').Router()
const firebase = require('firebase')
module.exports = router

const db = firebase.database()

router.post('/login', async (req, res, next) => {
  const email = req.body.email
  let password = req.body.password

  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode === 'auth/wrong-password') {
          console.log('Wrong password.')
        } else {
          console.log(errorMessage)
        }
      })
    res.send(firebase.auth().currentUser)
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const username = req.body.username
    const email = req.body.email
    let password = req.body.password

    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode === 'auth/weak-password') {
          res.send('The password is too weak')
        } else {
          res.send(errorMessage)
        }
      })
    await firebase.auth().currentUser.updateProfile({displayName: username})
    res.send(firebase.auth().currentUser)
  } catch (err) {
    next(err)
  }
})

router.post('/logout', async (req, res) => {
  await firebase
    .auth()
    .signOut()
    .then(function() {
      req.session.destroy()
      res.redirect('/')
    })
    .catch(function(error) {
      console.log(error)
    })
})

router.get('/me', async (req, res) => {
  let user = await firebase.auth().currentUser
  res.json(user)
})

router.use('/google', require('./google'))
