const router = require('express').Router()
const firebase = require('firebase')
const db = firebase.database()
module.exports = router

router.get('/:username', async (req, res, next) => {
  try {
    const wishlist = await db
      .ref(`/wishlist/${req.params.username}`)
      .once('value')
    res.json(wishlist)
  } catch (err) {
    next(err)
  }
})

router.post('/:username', async (req, res, next) => {
  const item = req.body.item
  const url = req.body.url
  const instructs = req.body.instructs
  const username = req.params.username
  try {
    await db
      .ref(`/wishlist/${username}`)
      .push({item, url, instructions: instructs})
      .then(function() {
        return db.ref(`/wishlist/${username}`).once('value')
      })
      .then(async function(snapshot) {
        //right now is taking a snapshot of all items at username
        const newItem = await snapshot.val()
        res.json(newItem)
      })
  } catch (err) {
    next(err)
  }
})

router.put('/:username/:id', async (req, res, next) => {
  const item = req.body.item
  const url = req.body.url
  const instructs = req.body.instructs

  const id = req.params.id
  const username = req.params.username
  const ref = db.ref(`/wishlist/${username}`)
  try {
    ref.child(id).update({item, url, instructions: instructs})
    const updatedItem = await ref.once('value')
    res.json(updatedItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/:username/:id', async (req, res, next) => {
  const id = req.params.id
  const username = req.params.username
  const ref = db.ref(`/wishlist/${username}/${id}`)
  try {
    const removedItem = await ref.once('value')
    await ref.remove()
    res.json(removedItem)
  } catch (err) {
    next(err)
  }
})
