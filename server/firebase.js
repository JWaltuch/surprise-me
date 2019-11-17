const firebase = require('firebase')

if (process.env.NODE_ENV !== 'production') require('../secrets')

var config = {
  apiKey: 'AIzaSyD5YgeMxjSfBvPPSuQARAPKPZlnwGx9AtU',
  authDomain: 'surpriseme-ce130.firebaseapp.com',
  databaseURL: 'https://surpriseme-ce130.firebaseio.com',
  projectId: 'surpriseme-ce130',
  storageBucket: 'surpriseme-ce130.appspot.com',
  messagingSenderId: '880304328557',
  appId: '1:880304328557:web:748b9cd854a8ad82ff1464',
  measurementId: 'G-S6C7MLVB57'
}
firebase.initializeApp(config)

module.exports = firebase
