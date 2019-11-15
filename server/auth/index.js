const router = require('express').Router()
const firebase = require('firebase')
// const crypto = require('crypto')
module.exports = router

// const db = firebase.firestore()
const db = firebase.database()

// const generateSalt = () => {
//   return crypto.randomBytes(16).toString('base64')
// }

// const encryptPassword = (plainText, salt) => {
//   return crypto
//     .createHash('RSA-SHA256')
//     .update(plainText)
//     .update(salt)
//     .digest('hex')
// }

router.post('/login', async (req, res, next) => {
  const username = req.body.username
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
    console.log('log in', firebase.auth().currentUser)

    // await db
    //   .ref(`/users/${username}`)
    //   .once('value')
    //   .then(async function(snapshot) {
    //     const data = await snapshot.val()
    //     password = encryptPassword(password, data.salt)
    //     if (data.username !== username || data.password !== password) {
    //       console.log('No such user found:', email)
    //       res.status(401).send('Wrong username and/or password')
    //     } else if (data.password !== password) {
    //       console.log('Incorrect password for user:', email)
    //       res.status(401).send('Wrong username and/or password')
    //     } else {
    //       req.login(data, err => (err ? next(err) : res.json(data)))
    //     }
    //   })
    res.send('logged in')
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
    console.log(firebase.auth().currentUser)

    // const salt = generateSalt()
    // password = encryptPassword(password, salt)

    // await db
    //   .ref(`/users/${username}`)
    //   .set({username, email, password, salt})
    //   .then(function() {
    //     return db.ref(`/users/${username}`).once('value')
    //   })
    //   .then(async function(snapshot) {
    //     const newUser = await snapshot.val()
    //     req.login(newUser, err => (err ? next(err) : res.json(newUser)))
    //   })
    res.send('signed up')
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
  console.log('logout', firebase.auth().currentUser)
  // req.logout()
  // req.session.destroy()
  // res.redirect('/')
})

router.get('/me', async (req, res) => {
  let user = await firebase.auth().currentUser
  res.json(user)
})

router.use('/google', require('./google'))
