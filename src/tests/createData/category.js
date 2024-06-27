const Category = require("../../models/Category")


const category = async() => {
   const body = {
    name: 'Professional sound'
    }

    await Category.create(body)

}

module.exports = category