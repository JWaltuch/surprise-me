const firebase = require('firebase')

if (process.env.NODE_ENV !== 'production') require('../secrets')

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'surpriseme-ce130.firebaseapp.com',
  databaseURL: process.env.DATABASE_URL,
  projectId: 'surpriseme-ce130',
  storageBucket: 'surpriseme-ce130.appspot.com',
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: 'G-S6C7MLVB57'
}
firebase.initializeApp(config)

module.exports = firebase
