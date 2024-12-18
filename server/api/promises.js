const router = require('express').Router();
const firebase = require('firebase-admin');
const db = firebase.database();
module.exports = router;

router.get('/:username', async (req, res, next) => {
  try {
    const promises = await db
      .ref(`/promises/${req.params.username}`)
      .once('value');
    res.json(promises);
  } catch (err) {
    next(err);
  }
});

router.get('/:username/:id', async (req, res, next) => {
  try {
    const item = await db
      .ref(`/promises/${req.params.username}/${req.params.id}`)
      .once('value');
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.post('/:username/:id', async (req, res, next) => {
  const item = req.body.item;
  const url = req.body.url;
  const instructions = req.body.instructions;
  const username = req.body.username;
  const id = req.params.id;
  const promisesRef = db.ref(`/promises/${username}/${id}`);

  const giftReceiver = req.params.username;
  const wishlistRef = db.ref(`/wishlist/${giftReceiver}`);

  const body = { item, url, instructions, promised: true, for: giftReceiver };

  try {
    await promisesRef.set(body);
    wishlistRef.child(id).update({ promised: true });
    const updatedWishlist = await db
      .ref(`/wishlist/${giftReceiver}`)
      .once('value');
    res.json(updatedWishlist);
  } catch (err) {
    next(err);
  }
});

router.delete('/:username/:giftReceiver/:id', async (req, res, next) => {
  const id = req.params.id;
  const username = req.params.username;
  const promisesRef = db.ref(`/promises/${username}/${id}`);

  const giftReceiver = req.params.giftReceiver;
  const wishlistRef = db.ref(`/wishlist/${giftReceiver}`);

  try {
    wishlistRef.child(id).update({ promised: false });
    const removedItem = await promisesRef.once('value');
    await promisesRef.remove();
    res.json(removedItem);
  } catch (err) {
    next(err);
  }
});
