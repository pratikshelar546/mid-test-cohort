import mongoose from "mongoose";
import { RESPONSE } from "../../commans/response";
import { findUser } from "../auth/auth.service";
import { CLASS_RESPONSE } from "./class.response";
import { classModel } from "./class.schema";
import { UserModel } from "../auth/auth.schama";

export const createClass = async(data:{className:string},userId:string)=>{
    try {
         const user = await findUser(userId);

        if(!user){
            throw RESPONSE.USER_NOT_FOUND
        }

        const createClass = await classModel.create({
            className:data.className,
            teacherId:userId
        });
        return createClass
    } catch (error) {
        throw error
    }
}

export const addStudent = async (classId:string,data:{studentId:string},teacherId:string)=>{
try {
    const studentExist = await findUser(data.studentId);
    if(!studentExist){        
     throw CLASS_RESPONSE.STUDENT_NOT_FOUND
    }
    
 
    const teacherExist = await findUser(teacherId);
   if(!teacherExist){
    throw CLASS_RESPONSE.TEACHER_NOT_FOUND
   }

   const classExist = await classModel.findOne({
    _id:classId
   })

   if(!classExist) throw CLASS_RESPONSE.CLASS_NOT_FOUND

   if(classExist.teacherId.toString() !== teacherId) throw CLASS_RESPONSE.NOT_TEACHER_OF_CLASS

 
//    if(checkOwner.studentIds.find((id)=>id===data.studentId)){
//     throw CLASS_RESPONSE.STUDENT_NOT_FOUND

//    }

  const udpatedClass= await classModel.findByIdAndUpdate(
  classId,
  { $addToSet: { studentIds: data.studentId } }, 
  { new: true }
);

if(!udpatedClass){
    throw CLASS_RESPONSE.CLASS_NOT_FOUND
}

return udpatedClass

} catch (error) {
    throw error
}
}

export const getClassData = async (id:string,user:{role:string,id:string}) =>{
try {    
    const classData = await classModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
              from: "users",
              let: { studentIds: "$studentIds" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: [
                        "$_id",
                        {
                          $map: {
                            input: { $ifNull: ["$$studentIds", []] },
                            as: "sid",
                            in: { $toObjectId: "$$sid" }
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  $project: {
                    _id: 1,
                    name: 1,
                    email: 1
                  }
                }
              ],
              as: "students"
            }
        },
        {
            $project: {
                _id: 1,
                className: 1,
                teacherId: 1,
                students: 1
            }
        }
    ]);

    if(!classData[0]){
        throw CLASS_RESPONSE.CLASS_NOT_FOUND
    }

    if(user.role==="teacher"){
        const isOwner = classData[0].teacherId.equals(user.id);
        if(!isOwner){            
            throw CLASS_RESPONSE.NOT_TEACHER_OF_CLASS
        }
    }else if(user.role ==="student"){
    const isStundent = classData[0].students.find((s)=>s._id.equals(user.id));
    
    if(!isStundent){
      throw CLASS_RESPONSE.NOT_STUDENT_OF_CLASS
    }
    }
    return classData[0]
} catch (error) {
    throw error
}
}