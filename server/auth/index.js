const router = require('express').Router()
const firebase = require('firebase')
const crypto = require('crypto')
module.exports = router

// const db = firebase.firestore()
const db = firebase.database()

const generateSalt = () => {
  return crypto.randomBytes(16).toString('base64')
}

const encryptPassword = (plainText, salt) => {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

router.post('/login', async (req, res, next) => {
  const username = req.body.username
  const email = req.body.email
  let password = req.body.password

  try {
    await db
      .ref(`/users/${username}`)
      .once('value')
      .then(async function(snapshot) {
        const data = await snapshot.val()
        password = encryptPassword(password, data.salt)
        if (data.username !== username || data.password !== password) {
          console.log('No such user found:', email)
          res.status(401).send('Wrong username and/or password')
        } else if (data.password !== password) {
          console.log('Incorrect password for user:', email)
          res.status(401).send('Wrong username and/or password')
        } else {
          req.login(data, err => (err ? next(err) : res.json(data)))
        }
      })
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const username = req.body.username
    const email = req.body.email
    let password = req.body.password

    const salt = generateSalt()
    password = encryptPassword(password, salt)

    await db
      .ref(`/users/${username}`)
      .set({username, email, password, salt, id: 1})
      .then(function() {
        return db.ref(`/users/${username}`).once('value')
      })
      .then(async function(snapshot) {
        const newUser = await snapshot.val()
        req.login(newUser, err => (err ? next(err) : res.json(newUser)))
      })
  } catch (err) {
    next(err)
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
