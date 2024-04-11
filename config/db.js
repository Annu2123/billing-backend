const mongoose=require("mongoose")
const configDb=()=>{
    try{
        const db=mongoose.connect('mongodb://127.0.0.1:27017/billing-app')
        console.log("connected to db succesful")
    }catch(err){
        console.log(err)
    }
   
}
module.exports=configDb