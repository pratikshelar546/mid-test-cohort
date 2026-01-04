import { UserModel } from "../auth/auth.schama";
import { STUDENT_RESPOSNE } from "./student.response";

export const getAllStundents = async ()=>{
    try {
        const students = await UserModel.find({role:"student"},{name:1,email:1,_id:1});
        console.log(students);
        
        if(!students){
            throw STUDENT_RESPOSNE.STUDENT_NOT_FOUND
        }
        return students;
    } catch (error) {
        throw error
    }
}