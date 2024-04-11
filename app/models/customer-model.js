const {Schema,model}=require('mongoose')
const customerSchema=new Schema({
    name:String,
    constact:{email:String,mobile:String},
    purchaseHistory:[
        { invoice:{
             type:Schema.Types.ObjectId,
             ref:'Invoice'
        }
}],
    paymentHistory:[Schema.Types.ObjectId]
},{timestamps:true})
const Customer=model("Customer",customerSchema)
module.exports=Customer