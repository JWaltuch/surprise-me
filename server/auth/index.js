const router = require('express').Router()
const firebase = require('firebase')
module.exports = router

// const db = firebase.database()

router.post('/login', async (req, res, next) => {
  const email = req.body.email
  let password = req.body.password

  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        if (error.code === 'auth/wrong-password') {
          error.message = 'Wrong password.'
          return next(error)
        } else {
          return next(error)
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
    const password = req.body.password
    let userExists = null

    if (!username) {
      let error = new Error()
      error.message = 'Username cannot be empty'
      return next(error)
    } else if (userExists) {
      let error = new Error()
      error.message = 'That username is taken'
      return next(error)
    } else {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          if (error.code === 'auth/weak-password') {
            error.message = 'The password is too weak'
            return next(error)
          } else {
            return next(error)
          }
        })
      await firebase
        .database()
        .ref(`/wishlist/${username}`)
        .once('value')
        .then(function(snapshot) {
          userExists = snapshot.val()
        })
      await firebase.auth().currentUser.updateProfile({displayName: username})
      res.send(firebase.auth().currentUser)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/logout', async (req, res) => {
  await firebase
    .auth()
    .signOut()
    .then(function() {
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
