import mongoose, { Schema } from "mongoose"



const classSchema = new Schema({
className:{
    type:String,
    requried:true
},
teacherId:{
    type:mongoose.Schema.ObjectId,
    required:true
},
studentIds:{
    type:Array
}
});

export const classModel = mongoose.model("class", classSchema);
