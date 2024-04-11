const productValidationSchema={
    name:{
        notEmpty:{
            errorMessage:"name is require"
        }
    },
    description:{
        notEmpty:{
            errorMessage:"description is require"
        }
    },
    price:{
        notEmpty:{
            errorMessage:"price is require"
        },
        isFloat:{
            errorMessage:"price should be a number",
             options:{min:1}
        }
    },
    stockLevel:{
        notEmpty:{
            errorMessage:"price is require"
        },
        isInt:{
            errorMessage:"stocklevel should be a number",
            options:{min:1}
        }
    },
    reorderLevel:{
        notEmpty:{
            errorMessage:"price is require"
        },
        isNumeric:{
            errorMessage:"reorderlevel should be a number"
        }
    }
}
module.exports=productValidationSchema