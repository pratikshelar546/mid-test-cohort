import express, { Request, Response } from "express"
import { tokenValidator } from "../../middlerware/tokenValidator";
import { getAllStundents } from "./student.service";
import { validateRole } from "../../middlerware/roleValidator";

const router = express.Router();

router.get("/",tokenValidator,validateRole("teacher"), async ( req:Request, res:Response)=>{
    try {
        const students = await getAllStundents();
        
        return res.status(200).json({
            success:true,
            data:students
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Somrhing went wrong"
        })
    }
})

export default router