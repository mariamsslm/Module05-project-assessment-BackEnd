import mongoose from "mongoose";
const orderModelSchema = new mongoose.Schema(
    {
        productID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,

        },
        quantity:{
            type : String,
            required:true
        },
        unitPrice :{
            type:String,
            required :true
        },
        totalPrice : {
            type:String,
            required: true
        },
        userID : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true

        }

    }
    ,{timestamps:true}
)
const orderSchema = mongoose.model("Order",orderModelSchema)
export default orderSchema