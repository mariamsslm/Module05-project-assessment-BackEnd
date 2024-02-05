import mongoose from "mongoose";
const productModelSchema = new  mongoose.Schema(
    {
        imageURL :{
            type : String,
            required : true
        },
        title:{
            type : String,
            required : true
        },
        price :{
            type : Number,
            required :true
        },
        description :{
            type : String,
            required : true
        }
    },
    {timestamps : true}
)

const productSchema = mongoose.model("Product" , productModelSchema)
export default productSchema