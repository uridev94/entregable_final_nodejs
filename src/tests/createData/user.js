const User = require("../../models/User")


const user = async() => {
   const body = {
    firstName: "Pepito",
    lastName: "Pepin",
    email: "pepepin@gmail.com",
    password: "pepito123",
    phone: "333444556677"
    }

    await User.create(body)

}

module.exports = user

