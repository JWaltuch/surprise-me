import {Router as router} from 'express';
import {auth, db} from '../firebase.js';
import {ref, get} from 'firebase/database';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
export default router;

router.post('/login', async (req, res, next) => {
  const email = req.body.email;
  let password = req.body.password;

  try {
    await signInWithEmailAndPassword(auth, email, password)
      .catch(function (error) {
        if (error.code === 'auth/wrong-password') {
          error.message = 'Wrong password.';
          return next(error);
        } else {
          return next(error);
        }
      })
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        res.send(auth.currentUser);
      });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    let existingUser = null;

    //if user is in the db, sets the db item on existingUser,
    //confirming username is taken
    const userTable = ref(db, '/users');
    // await userTable.once('value').then(function (snapshot) {
    //   existingUser = Object.keys(snapshot.val()).includes(username);
    // });
    // Get data once from the users table
    const snapshot = await get(userTable);
    if (snapshot.exists()) {
      // Check if the username exists in the snapshot
      existingUser = Object.keys(snapshot.val()).includes(username);
    }

    if (!username) {
      let error = new Error();
      error.message = 'Username cannot be empty';
      return next(error);
    } else if (existingUser) {
      let error = new Error();
      error.message = 'That username is taken';
      return next(error);
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .catch(function (error) {
          if (error.code === 'auth/weak-password') {
            error.message = 'The password is too weak';
            return next(error);
          } else {
            return next(error);
          }
        })
        .then(async (userCredential) => {
          const user = userCredential.user;
          // when a user is created add them to users table
          let allUsers;
          await userTable.once('value').then(function (snapshot) {
            allUsers = snapshot.val();
          });
          await userTable.set({...allUsers, [username]: username});

          await updateProfile(user, {
            displayName: username,
          });

          res.send(auth.currentUser);
        });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/logout', async (req, res) => {
  await signOut(auth)
    .then(function () {
      res.redirect('/');
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get('/me', async (req, res) => {
  let user = auth.currentUser;
  res.json(user);
});

router.use('/google', require('./google'));
