const jwt=require("jsonwebtoken")
const authMiddleware=(req,res,next)=>{
    try{
     const token=req.headers.authorization
     jwt.verify(token,"masai",(err,decoded)=>{
        if(err){
            res.status(200).send({msg:"you are not authorized"})
        }else{
            console.log(decoded)
            next()
        }
     })
    }catch(err){
        res.status.send({error:err})
    }
}
module.exports={authMiddleware}