const Sequelize = require('sequelize')
const db = require('../db')

const Wishlist = db.define('wishlist', {
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

module.exports = Wishlist
