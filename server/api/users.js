const router = require('express').Router()
const firebase = require('firebase')
const db = firebase.database()
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    await db
      .ref(`/users`)
      .once('value')
      .then(async function(snapshot) {
        const users = await snapshot.val()
        res.json(users)
      })
  } catch (err) {
    next(err)
  }
})
