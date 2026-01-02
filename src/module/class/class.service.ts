import { RESPONSE } from "../../commans/response";
import { findUser } from "../auth/auth.service";
import { CLASS_RESPONSE } from "./class.response";
import { classModel } from "./class.schema";

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

export const addStudent = async (classId,data,teacherId)=>{
try {
   const studentExist = await findUser(data.studentId);
   if(!studentExist){
    throw CLASS_RESPONSE.STUDENT_NOT_FOUND
   }

   const teacherExist = await findUser(teacherId);
   if(!teacherExist){
    throw CLASS_RESPONSE.TEACHER_NOT_FOUND
   }

  const udpatedClass=  await classModel.findByIdAndUpdate(
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