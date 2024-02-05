import express from "express"
import {CreateOrder} from '../Controllers/order.js'



export const orderRoute = express.Router()
orderRoute.post('/add' ,CreateOrder)
