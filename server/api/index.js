import {Router} from 'express';
import usersRouter from './users.js';
import wishlistRouter from './wishlist.js';
import promisesRouter from './promises.js';

const router = Router();

router.use('/users', usersRouter);
router.use('/wishlist', wishlistRouter);
router.use('/promises', promisesRouter);

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

export default router;
