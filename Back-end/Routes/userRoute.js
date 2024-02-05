import express from "express"
import { signup , login , getAll } from '../Controllers/user.js'



export const userRoute = express.Router()
userRoute.post("/signup" , signup)
userRoute.post("/login" , login)
userRoute.get("/get" , getAll)

