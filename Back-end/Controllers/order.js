import orderSchema from "../Models/orderModel.js";
import userSchema from "../Models/userModel.js";
import productSchema from "../Models/productModel.js";


//cretae order
export const CreateOrder = async (req, res) => {
    const { productID, quantity, unitPrice,totalPrice ,userID } = req.body;
    try {
        
        const newOrder = new orderSchema({
            productID,
            quantity,
            totalPrice ,
            unitPrice,
            userID
        });

        await newOrder.save();
        
        res.status(200).json({
            message: "Order created successfully",
            result: populatedOrder,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error creating order");
    }
};