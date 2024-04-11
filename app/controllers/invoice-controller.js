const Invoice=require('../models/invoice-model')
const Product=require('../models/product-model')
const Customer=require('../models/customer-model')
const {validationResult} =require('express-validator')
const invoiceCntrl={}
invoiceCntrl.creates=async(req,res)=>{
    // const errors=validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(400).json({errors:errors.array()})
    // }
    try{
        const body=req.body
        const invoiceObj={...body}
        const productIds=invoiceObj.lineItems.map(ele =>ele.product)
        const products=await Product.find().where('_id').in(productIds)
        for(let i=0;i<products.length;i++){
            invoiceObj.lineItems[i].price=products[i].price
        }
        invoiceObj.grossTotal=invoiceObj.lineItems.reduce((acc,cv)=>{
            return acc+cv.price * cv.quantity
        },0)
        const deduction=invoiceObj.grossTotal * invoiceObj.discount /100
        const addition=invoiceObj.grossTotal * invoiceObj.taxes /100

        invoiceObj.netTotal=invoiceObj.grossTotal-deduction + addition
        invoiceObj.outstandingBalance=invoiceObj.netTotal
        const invoice=await Invoice.create(invoiceObj)

        const customer=await Customer.findById(invoice.customer)
        customer.outstandingBalance +=invoice.netTotal
        customer.purchaseHistory.push({invoice:invoice._id})
        await customer.save()//isNew
        res.status(200).json(invoice)

    }catch(err){
        console.log(err)
        res.status(400).json({errors:"internal server error"})
    }
}
invoiceCntrl.list=async(req,res)=>{
    try{
        const invoice=await Invoice.find().populate('customer',['_id','name']).populate
        ('lineItems.product',['id','name'])
        res.json(invoice)
    }catch(err){
        res.send("sfjsfjs")
    }
}
module.exports=invoiceCntrl