const {Router}=require("express")
const booksRouter=Router()
const {booksModel}=require("../Models/books.model")
booksRouter.post("/add",async(req,res)=>{
try{
    console.log(req.body)
  const book=await booksModel.create(req.body)
  console.log(book)
  res.status(200).send({msg:"Book added","addedBook":book})
}catch(err){
    res.status(400).send({error:err.message})
}
})
booksRouter.get("/",async(req,res)=>{
    try{
        const books=await booksModel.find()
        console.log(books)
        res.status(200).send({books})
    }catch(err){
        res.status(400).send({error:err.message})
    }
})
booksRouter.patch("/update/:id",async(req,res)=>{
try{
const {id}=req.params
console.log(id)
const book=await booksModel.updateOne({_id:id},{$set:req.body})
console.log(book,"updated isn't it")
res.status(200).send({msg:"Book has been updated"})
}catch(err){
    res.status(400).send({error:err.message})
}
})
booksRouter.delete("/delete/:id",async(req,res)=>{
    try{
    const {id}=req.params
    console.log(id)
    const book=await booksModel.deleteOne({_id:id})
    console.log(book,"updated isn't it")
    res.status(200).send({msg:"Book has been deleted"})
    }catch(err){
        res.status(400).send({error:err.message})
    }
    })
module.exports={booksRouter}