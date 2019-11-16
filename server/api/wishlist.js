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

router.get('/:username/:id', async (req, res, next) => {
  try {
    const item = await db
      .ref(`/wishlist/${req.params.username}/${req.params.id}`)
      .once('value')
    res.json(item)
  } catch (err) {
    next(err)
  }
})

router.post('/:username', async (req, res, next) => {
  const item = req.body.item
  const url = req.body.url
  const instructions = req.body.instructions
  const body = {item, url, instructions, promised: false}
  const username = req.params.username
  const ref = db.ref(`/wishlist/${username}`)
  try {
    await ref
      .push(body)
      .then(function() {
        return db.ref(`/wishlist/${username}`).once('value')
      })
      .then(async function(snapshot) {
        //right now is taking a snapshot of all items at username
        const newWishList = await snapshot.val()
        res.json(newWishList)
      })
  } catch (err) {
    next(err)
  }
})

router.put('/:username/:id', async (req, res, next) => {
  const item = req.body.item
  const url = req.body.url
  const instructions = req.body.instructions
  const body = {item, url, instructions, promised: false}

  const id = req.params.id
  const username = req.params.username
  const ref = db.ref(`/wishlist/${username}`)

  try {
    ref.child(id).update(body)
    const updatedWishlist = await db.ref(`/wishlist/${username}`).once('value')
    res.json(updatedWishlist)
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
