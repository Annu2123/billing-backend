const Customer=require('../models/customer-model')
const customerCntrl={}
customerCntrl.register=async(req,res)=>{
    const body=req.body
    try{
        const customer=await Customer.create(body)
        res.status(200).json(customer)
    }catch(err){
        res.status(400).json({error:"internal server error"})
    }
}
customerCntrl.list=async(req,res)=>{
    try{
    const customer=await Customer.find()
    res.json(customer)
    }catch(err){
        res.json({error:"internal server error"})
    }
}
customerCntrl.remove=async(req,res)=>{
    const id=req.params.id
    try{
        const customer=await Customer.findByIdAndDelete(id,{new:true})  
        res.json(customer)
    }catch(err){
        res.json({error:"internal server error"})
    }
}
customerCntrl.update=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    try{
        const customer=await Customer.findByIdAndUpdate(id,body,{new:true})
        res.json(customer)
    }catch(err){
        res.json({error:"internal server error"})
    }
}
customerCntrl.show = async (req, res) => {
    const id = req.params.id 
    try {
        const customer = await Customer.findById(id).populate('purchaseHistory.invoice')
        res.json(customer) 
    } catch(err) {

    }
}
module.exports=customerCntrl