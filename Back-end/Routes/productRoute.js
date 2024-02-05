import express from "express"
import { CreateProduct, updateProduct , getById ,getAllProdocts ,deleteProduct } from "../Controllers/product.js"






export const productRoute = express.Router()
productRoute.post("/add" , CreateProduct)
productRoute.get('/getall' , getAllProdocts)
productRoute.get('/get/:id' , getById)
productRoute.put('/edit/:id' , updateProduct)
productRoute.delete('/delete/:id' , deleteProduct)
