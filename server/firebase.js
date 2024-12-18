const URL = require('url'); // Import the URL polyfill
const firebase = require('firebase-admin');

if (process.env.NODE_ENV !== 'production') require('../secrets');

const config = {
  apiKey: 'AIzaSyD5YgeMxjSfBvPPSuQARAPKPZlnwGx9AtU',
  authDomain: 'surpriseme-ce130.firebaseapp.com',
  databaseURL: 'https://surpriseme-ce130.firebaseio.com',
  URL: 'https://surpriseme-ce130.firebaseio.com',
  projectId: 'surpriseme-ce130',
  storageBucket: 'surpriseme-ce130.appspot.com',
  messagingSenderId: '880304328557',
  appId: '1:880304328557:web:748b9cd854a8ad82ff1464',
  measurementId: 'G-S6C7MLVB57',
};
firebase.initializeApp(config);

module.exports = firebase;

// import { URL } from 'url'; // Import the URL polyfill

// const firebase = require('firebase-admin');
// Firebase 11.x (modular way)
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// if (process.env.NODE_ENV !== 'production') {
//   import('../secrets').then(secrets => {
//     // Handle secrets
//   }).catch(err => {
//     console.error("Error loading secrets:", err);
//   });
// }

// const config = {
//   apiKey: 'AIzaSyD5YgeMxjSfBvPPSuQARAPKPZlnwGx9AtU',
//   authDomain: 'surpriseme-ce130.firebaseapp.com',
//   databaseURL: 'https://surpriseme-ce130.firebaseio.com',
//   URL: 'https://surpriseme-ce130.firebaseio.com',
//   projectId: 'surpriseme-ce130',
//   storageBucket: 'surpriseme-ce130.appspot.com',
//   messagingSenderId: '880304328557',
//   appId: '1:880304328557:web:748b9cd854a8ad82ff1464',
//   measurementId: 'G-S6C7MLVB57',
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Access Firebase services
// const auth = getAuth(app);
// const firestore = getFirestore(app);

// module.exports = firebase;
