import { classModel } from "../class/class.schema"
import { ATTENDANCE_RESPONSE } from "./attendance.response";
import { attendanceSesssion } from "./attendance.session";

export const startAttendance = async (classId:string,teacherId:string)=>{
try {
    const classData = await classModel.findById(classId);
    if(!classData.teacherId.equals(teacherId)){
        ATTENDANCE_RESPONSE.NOT_TEACHER_OF_CLASS
    }

    const attendanceSession = new attendanceSesssion(classId);

    return attendanceSession;
    
} catch (error) {
 throw error   
}
}