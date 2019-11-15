const router = require('express').Router()
const firebase = require('firebase')
const db = firebase.database()
module.exports = router

const createList = async (type, username, body) => {
  const ref = db.ref(`/${type}/${username}`)
  return ref.push(body).then(function() {
    return db.ref(`/${type}/${username}`).once('value')
  })
}

const updateList = (type, username, id, body) => {
  const ref = db.ref(`/${type}/${username}`)
  ref.child(id).update(body)
}

router.post('/:username', async (req, res, next) => {
  const item = req.body.item
  const url = req.body.url
  const instructions = req.body.instructions
  const body = {item, url, instructions}
  const username = req.params.username
  try {
    createList('secretWishlist', username, body)
    createList('wishlist', username, body).then(async function(snapshot) {
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
  const body = {item, url, instructions: instructions}

  const id = req.params.id
  const username = req.params.username

  try {
    updateList('wishlist', username, id, body)
    updateList('secretWishlist', username, id, body)
    const updatedWishlist = await db
      .ref(`/wishlist/${username}/${id}`)
      .once('value')
    res.json(updatedWishlist)
  } catch (err) {
    next(err)
  }
})
