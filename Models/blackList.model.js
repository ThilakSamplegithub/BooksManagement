const mongoose=require("mongoose")
const logSchema=mongoose.Schema({
    blackList:{type:[String],default:[]}
},{versionKey:false})
 const blackListModel=mongoose.model("blackListing",logSchema)
 module.exports={blackListModel}