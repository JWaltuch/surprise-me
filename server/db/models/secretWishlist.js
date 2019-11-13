const Sequelize = require('sequelize')
const db = require('../db')

const SecretWishlist = db.define('secretWishlist', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  link: {
    type: Sequelize.STRING
  },
  instructions: {
    type: Sequelize.TEXT
  }
})

module.exports = SecretWishlist
