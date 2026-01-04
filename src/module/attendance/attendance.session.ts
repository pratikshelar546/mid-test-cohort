export class attendanceSesssion {
    classId:null;
    startTime:Date;
    attendance:Record<string, string>

constructor(classId){
this.classId =classId,
this.startTime= new Date();
this.attendance= {};
}

markAttendace(studentId,status){
this.attendance[studentId]=status
}

todaysSummary(){
let present = Object.values(this.attendance).filter(status => status === 'present').length;
let absent = Object.values(this.attendance).filter(status => status === 'absent').length;
let total = present + absent;
return {
    present,
    absent,
    total
}

}

myAttendace(studentId){
    if(!this.attendance[studentId]){
        return "not yet updated"
    }
    return this.attendance[studentId]
}
}