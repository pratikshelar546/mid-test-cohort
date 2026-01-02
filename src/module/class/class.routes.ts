import express, { NextFunction, Request, Response } from "express";
import { tokenValidator } from "../../middlerware/tokenValidator";
import {  addStudentValidator, classValidator } from "./class.validator";
import { RESPONSE } from "../../commans/response";
import { addStudent, createClass } from "./class.service";

const router = express.Router();

const validateTeacher =(req:Request,res:Response,next:NextFunction)=>{
 if(req.user.role !== "teacher"){
             return res.status(401).json({
            success: false,
            error: "Unauthorized, token missing or invalid"
        })
        }else{
            next()
        }
}
router.post("/class",tokenValidator,validateTeacher,async(req:Request,res:Response)=>{
    try {
        const {success,data} = classValidator.safeParse(req.body);

        if(!success){
            throw RESPONSE.INVALID_SCHEMA;
        }

       const createdClass = await createClass(data,req.user.id)
console.log(createClass,"class");

        return res.status(200).json({
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


router.post("/class/:id/add-student", tokenValidator,validateTeacher,async ( req:Request,res:Response)=>{
    try {
        const {success,data} = addStudentValidator.safeParse(req.body);
        const {id} = req.params;
        if(!success){
            throw RESPONSE.INVALID_SCHEMA
        }

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


export default router