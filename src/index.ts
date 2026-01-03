import express from "express";
import cors from "cors";
import { registerRoutes } from './routes/routes';
import dotenv from "dotenv";
import { connectDb } from "./config/mongodbConnection";
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
registerRoutes(app);
connectDb();
const PORT = 3000;
app.listen(PORT,()=>{
    console.info("server is running on ",PORT)
})