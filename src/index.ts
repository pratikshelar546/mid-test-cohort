import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.listen(PORT,()=>{
    console.info("server is running on ",PORT)
})