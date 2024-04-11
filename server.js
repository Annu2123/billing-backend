require('dotenv').config()
const express=require('express')
const cors=require('cors')
const {checkSchema}=require("express-validator")
const port=process.env
const app=express()
app.use(cors())
app.use(express.json())
const configDb=require('./config/db')
configDb()
const productCntrl=require('./app/controllers/product-controller')
const customerCntrl=require('./app/controllers/customer-controller')
const invoiceCntrl=require('./app/controllers/invoice-controller')

const productValidationSchema=require('./app/validations/product-validation') 

app.post('/api/products',checkSchema(productValidationSchema),productCntrl.create)
app.get('/api/products',productCntrl.list)
app.put('/api/products/:id',productCntrl.update)
app.delete('/api/products/:id',productCntrl.remove)
app.post('/api/customer',customerCntrl.register)
app.delete('/api/customer/:id',customerCntrl.remove)
app.get('/api/customer',customerCntrl.list)
app.put('/api/customer/:id',customerCntrl.update)
app.get('/api/customer/:id',customerCntrl.show)

//api for invoice
app.post('/api/invoice',invoiceCntrl.creates)
app.get('/api/invoice',invoiceCntrl.list)
app.listen(port,()=>{
    console.log("server is running in port " + port)
})