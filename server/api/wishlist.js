import {Router as router} from 'express';
import {db} from '../firebase.js';
import {ref, get, push, update, remove} from 'firebase/database';

router.get('/:username', async (req, res, next) => {
  try {
    const wishlistRef = ref(db, `/wishlist/${req.params.username}`);
    // Fetch the data once using the get() method
    const snapshot = await get(wishlistRef);
    // Check if data exists and retrieve the value
    let wishlist = null;
    if (snapshot.exists()) {
      wishlist = snapshot.val();
    } else {
      console.log('No data available for the specified user');
    }
    res.json(wishlist);
  } catch (err) {
    next(err);
  }
});

router.get('/:username/:id', async (req, res, next) => {
  try {
    const itemRef = ref(
      db,
      `/wishlist/${req.params.username}/${req.params.id}`
    );
    // Fetch the data once using the get() method
    const snapshot = await get(itemRef);
    // Check if data exists and retrieve the value
    let item = null;
    if (snapshot.exists()) {
      item = snapshot.val();
    } else {
      console.log('No data available for the specified user');
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.post('/:username', async (req, res, next) => {
  const item = req.body.item;
  const url = req.body.url;
  const instructions = req.body.instructions;
  const body = {item, url, instructions, promised: false};
  const username = req.params.username;
  try {
    const wishlistRef = ref(db, `/wishlist/${username}`);
    // Push the 'body' data to a reference
    await push(wishlistRef, body);

    // After pushing data, get the updated snapshot
    const snapshot = await get(ref(db, `/wishlist/${username}`));

    if (snapshot.exists()) {
      // If data exists, retrieve it and send the response
      const newWishlist = snapshot.val();
      res.json(newWishlist);
    } else {
      // If no data exists at that location
      res.status(404).json({message: 'Wishlist not found'});
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:username/:id', async (req, res, next) => {
  const item = req.body.item;
  const url = req.body.url;
  const instructions = req.body.instructions;
  const body = {item, url, instructions, promised: false};

  const id = req.params.id;
  const username = req.params.username;
  const wishlistRef = ref(db, `/wishlist/${username}`);
  // Reference to the specific item in the wishlist by id
  const itemRef = ref(db, `/wishlist/${username}/${id}`);

  try {
    // Update the item in the wishlist (using the itemRef path)
    await update(itemRef, body);

    // Get the updated wishlist for the user
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

router.delete('/:username/:id', async (req, res, next) => {
  const id = req.params.id;
  const username = req.params.username;
  // Reference to the path you want to read from and remove
  const userIdRef = ref(db, `/wishlist/${username}/${id}`);

  try {
    // Get the current value at the reference
    const snapshot = await get(userIdRef);

    // Check if the item exists
    let removedItem = null;
    if (snapshot.exists()) {
      removedItem = snapshot.val();
    }

    // Remove the item from the database
    await remove(userIdRef);

    // If you need to return the removed item or confirm removal, you can send it back
    res.json({removedItem, message: `Item ${id} removed successfully`});
  } catch (err) {
    next(err);
  }
});

export default router;
