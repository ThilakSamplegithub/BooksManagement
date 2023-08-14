const {Router}=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {blackListModel}=require("../Models/blackList.model")
const { userModel } = require("../Models/users.model")
const userRouter=Router()
userRouter.post("/register",async(req,res)=>{
   try{
const {pass,name,email,city,age}=req.body
const user=await userModel.findOne({email})
console.log(user)
if(!user?.email){
    bcrypt.hash(pass,5,async(err,hashed)=>{
        if(err){
            res.send("please register again")
        }else{
            console.log(hashed)
          const newUser= await userModel.create({name,email,pass:hashed,city,age})
          console.log(newUser)
           res.status(200).send({msg:"The new user has been registered",registeredUser:newUser})
        }
     })
}
   }catch(err){
    res.status(400).send({error:err.message})
   }
})
userRouter.post("/login",async(req,res)=>{
try{
  const {email,pass}=req.body
  const user=await userModel.findOne({email})
 if(user?.email){
   bcrypt.compare(pass,user.pass,(err,result)=>{
    if(err){
        res.status(200).send(`wrong password`)
    }else{
        console.log(result)
        const token=jwt.sign({course:"backend"},"masai",{expiresIn:'2m'})
        res.status(200).send({msg:"Login successful!",token})
    }
   })
 }
}catch(err){
    res.status(400).send({error:err.message})
}
})
userRouter.get("/logout",async(req,res)=>{
    try{
           const user=await blackListModel.find()
           console.log(user,"before")
           const token=req.headers.authorization
           if(token){
            user.push(token)
            console.log(user,"after")
            res.status(200).send({msg:"User has been logged out"})
           }
    }catch(err){
        res.send({error:err.message})
    }
})
module.exports={userRouter}