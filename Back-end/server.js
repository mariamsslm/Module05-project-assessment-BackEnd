import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"
import   { userRoute  }from './Routes/userRoute.js'
import { productRoute } from './Routes/productRoute.js'
import { orderRoute } from "./Routes/orderRoute.js"
dotenv.config()


const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus :200
}))

app.use('/user' , userRoute )
app.use('/product' , productRoute)
app.use('/order' , orderRoute)



async function startServer() {
    mongoose.connection.once("open", () => {
      console.log("mongo is ready");
    });
  
    mongoose.connection.on("error", (err) => {
      console.error(err);
    });
    await mongoose.connect(process.env.MONGO_URL);
  
    app.listen(process.env.PORT, () => {
      console.log("listening on port: " + process.env.PORT);
    });
  }
  
  startServer();