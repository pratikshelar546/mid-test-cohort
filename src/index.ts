import express from "express";
import cors from "cors";
import { registerRoutes } from './routes/routes';
import { connectMongoDB } from "./config/mongodbConnection";
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
registerRoutes(app);
connectMongoDB();
const PORT = 3000;
app.listen(PORT,()=>{
    console.info("server is running on ",PORT)
})