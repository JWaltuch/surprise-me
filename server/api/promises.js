const router = require('express').Router()
const firebase = require('firebase')
const db = firebase.database()
module.exports = router

router.get('/:username', async (req, res, next) => {
  try {
    const promises = await db
      .ref(`/promises/${req.params.username}`)
      .once('value')
    res.json(promises)
  } catch (err) {
    next(err)
  }
})

router.get('/:username/:id', async (req, res, next) => {
  try {
    const item = await db
      .ref(`/promises/${req.params.username}/${req.params.id}`)
      .once('value')
    res.json(item)
  } catch (err) {
    next(err)
  }
})

router.post('/:username/:id', async (req, res, next) => {
  const item = req.body.item
  const url = req.body.url
  const instructions = req.body.instructions
  const username = req.body.username
  const body = {item, url, instructions, purchased: true}
  const promisesRef = db.ref(`/promises/${username}`)

  const id = req.params.id
  const giftReceiver = req.params.username
  const wishlistRef = db.ref(`/wishlist/${giftReceiver}`)

  try {
    await promisesRef
      .set({id: body})
      .then(function() {
        return promisesRef.once('value')
      })
      .then(async function(snapshot) {
        //right now is taking a snapshot of all items at username
        const newPromises = await snapshot.val()
      })
    wishlistRef.child(id).update({purchased: true})
    const updatedWishlist = await db
      .ref(`/wishlist/${giftReceiver}`)
      .once('value')
    res.json(updatedWishlist)
  } catch (err) {
    next(err)
  }
})

router.delete('/:username/:id', async (req, res, next) => {
  const id = req.params.id
  const username = req.params.username
  const ref = db.ref(`/promises/${username}/${id}`)
  try {
    const removedItem = await ref.once('value')
    await ref.remove()
    res.json(removedItem)
  } catch (err) {
    next(err)
  }
})
