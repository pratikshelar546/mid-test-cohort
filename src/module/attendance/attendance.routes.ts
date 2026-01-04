import express, { Request, Response } from "express";
import { tokenValidator } from "../../middlerware/tokenValidator";
import { validateRole } from "../../middlerware/roleValidator";
import { startAttendance } from "./attendance.service";
import { atttendaceStartSchema } from "./attendace.validator";
import { RESPONSE } from "../../commans/response";

const router = express.Router();

router.post("/start",tokenValidator,validateRole("teacher"), async (req:Request,res:Response)=>{
    try {
        const {success,data} = atttendaceStartSchema.safeParse(req.body);
        if(!success){
            throw RESPONSE.INVALID_SCHEMA;
        }

        const attendaceStarted = await startAttendance(data.classId,req.user.id);
        return res.status(200).json({
            success:true,
            data:attendaceStarted
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Somrhing went wrong"
        })
    }
})
export default router