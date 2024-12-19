import {Router as router} from 'express';
import {db} from '../firebase.js';
import {ref, get} from 'firebase/database';

router.get('/', async (req, res, next) => {
  try {
    const wishlistRef = ref(db, '/wishlist');
    // Fetch the data once using the get() method
    const snapshot = await get(wishlistRef);
    // Check if data exists and retrieve the value
    let users = null;
    if (snapshot.exists()) {
      users = snapshot.val();
    } else {
      console.log('No data available');
    }
    res.json(users);
  } catch (err) {
    next(err);
  }
});

export default router;
