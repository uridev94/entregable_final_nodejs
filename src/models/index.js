const User = require('./User')
const Category = require('./Category')
const Product = require('./Product')
const Cart = require('./Cart')

//Product -> CategoryId
Product.belongsTo(Category)
Category.hasMany(Product)

// Cart -> userId
Cart.belongsTo(User)
User.hasMany(Cart)

// Cart -> productId
Cart.belongsTo(Product)
Product.hasMany(Cart)