import express, { NextFunction, Request, Response } from "express";
import { tokenValidator } from "../../middlerware/tokenValidator";
import {  addStudentValidator, classValidator } from "./class.validator";
import { RESPONSE } from "../../commans/response";
import { addStudent, createClass, getClassData } from "./class.service";

const router = express.Router();

const validateTeacher =(req:Request,res:Response,next:NextFunction)=>{
    console.log("here?");
    
 if(req.user.role !== "teacher"){
             return res.status(403).json({
            success: false,
            error: 'Forbidden, teacher access required'
        })
        }else{
            next()
        }
}
router.post("/",tokenValidator,validateTeacher,async(req:Request,res:Response)=>{
    try {
        const {success,data} = classValidator.safeParse(req.body);

        if(!success){
            throw RESPONSE.INVALID_SCHEMA;
        }

       const createdClass = await createClass(data,req.user.id)
        return res.status(201).json({
            success:true,
            data:createdClass
        })

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Somrhing went wrong"
        })
    }
})


router.post("/:id/add-student", tokenValidator,validateTeacher,async ( req:Request,res:Response)=>{
    try {
        
        const {success,data} = addStudentValidator.safeParse(req.body);
        const {id} = req.params;
        if(!success){
            throw RESPONSE.INVALID_SCHEMA
        }
        
        console.log("inisde?");
        const updatedClass = await addStudent(id,data,req.user.id)

         return res.status(200).json({
            success:true,
            data:updatedClass
         })
    } catch (error) {
          return res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Somrhing went wrong"
        })
    }
})

router.get("/:id", tokenValidator,async (req:Request,res:Response)=>{
try {
    const {id} = req.params;
    const classData = await getClassData(id,req.user);

    return res.status(200).json({
        success:true,
        data:classData
    })
    
} catch (error) {
    return res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Somrhing went wrong"
    })
}
})


export default router