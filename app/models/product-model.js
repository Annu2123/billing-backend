const {Schema,model}=require("mongoose")
const productSchema= new Schema({
    name:String,
    description:String,
    price:Number,
    stockLevel:Number,
    reorderLevel:Number
},{timestamps:true})
const Product=model("Product",productSchema)
module.exports=Product