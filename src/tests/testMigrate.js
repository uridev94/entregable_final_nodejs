const sequelize = require("../utils/connection");
const category = require("./createData/category");
const user = require("./createData/user");
require('../models')

const testMigrate = async()=>{

    try{
        await sequelize.sync({force:true})
        console.log('DB reset ✅');
        await user()
        await category()
        process.exit()
    }catch(error){
        console.error(error);
    }
}


testMigrate()