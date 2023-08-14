const mongoose=require("mongoose")
require('dotenv').config()
const connection=mongoose.connect(process.env.MONGODB_url)
module.exports={connection}