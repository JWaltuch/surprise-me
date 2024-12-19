import {Router as router} from 'express';
import {db} from '../firebase';
import {ref, get, set, update, remove} from 'firebase/database';
export default router;

router.get('/:username', async (req, res, next) => {
  try {
    const promisesRef = ref(db, `/promises/${req.params.username}`);
    // Fetch the data once using the get() method
    const snapshot = await get(promisesRef);
    // Check if data exists and retrieve the value
    let promises = null;
    if (snapshot.exists()) {
      promises = snapshot.val();
    } else {
      console.log('No data available');
    }
    res.json(promises);
  } catch (err) {
    next(err);
  }
});

router.get('/:username/:id', async (req, res, next) => {
  try {
    const itemRef = await ref(
      db,
      `/promises/${req.params.username}/${req.params.id}`,
    );
    // Fetch the data once using the get() method
    const snapshot = await get(itemRef);
    // Check if data exists and retrieve the value
    let item = null;
    if (snapshot.exists()) {
      item = snapshot.val();
    } else {
      console.log('No data available');
    }
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
  const giftReceiver = req.params.username;

  // Reference for the promise data
  const promisesRef = ref(db, `/promises/${username}/${id}`);

  // Reference for the wishlist of the gift receiver
  const wishlistRef = ref(db, `/wishlist/${giftReceiver}`);

  // The data you want to set for the promise
  const body = {item, url, instructions, promised: true, for: giftReceiver};

  try {
    // Set the promise data for the given user and id
    await set(promisesRef, body);

    // Update the specific item in the gift receiver's wishlist to mark it as promised
    await update(ref(db, `/wishlist/${giftReceiver}/${id}`), {
      promised: true,
    });

    // Fetch the updated wishlist for the gift receiver
    const snapshot = await get(wishlistRef);

    if (snapshot.exists()) {
      const updatedWishlist = snapshot.val();
      res.json(updatedWishlist);
    } else {
      res.status(404).json({message: 'Wishlist not found'});
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:username/:giftReceiver/:id', async (req, res, next) => {
  const id = req.params.id;
  const username = req.params.username;
  const giftReceiver = req.params.giftReceiver;
  // Create references for the promises and wishlist
  const promisesRef = ref(db, `/promises/${username}/${id}`);
  const wishlistItemRef = ref(db, `/wishlist/${giftReceiver}/${id}`);

  try {
    // Update the 'promised' field to false for the specific item in the wishlist
    await update(wishlistItemRef, {promised: false});

    // Get the current data for the promise (before removing it)
    const snapshot = await get(promisesRef);

    let removedItem = null;
    if (snapshot.exists()) {
      removedItem = snapshot.val();
    }

    // Remove the promise from the database
    await remove(promisesRef);

    // Respond with the removed item (if any)
    res.json(removedItem);
  } catch (err) {
    next(err);
  }
});
