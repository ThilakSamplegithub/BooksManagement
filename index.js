const express=require("express")
const {connection}=require("./config/db")
require('dotenv').config()
const {userRouter}=require("./Routes/user.routes")
const { booksRouter } = require("./Routes/books.routes")
const { authMiddleware } = require("./Middlewares/auth.middleware")
const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("welcome")
})
app.use("/users",userRouter)
app.use(authMiddleware)
app.use("/books",booksRouter)
app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("port",process.env.PORT,"is running")
    }catch(err){
  console.log(err.message)
    }
})