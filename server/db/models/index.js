const User = require('./user')
const Wishlist = require('./wishlist')
const SecretWishlist = require('./secretWishlist')

Wishlist.belongsTo(User)
User.hasOne(Wishlist)

SecretWishlist.belongsTo(User)
User.hasOne(SecretWishlist)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Wishlist,
  SecretWishlist
}
