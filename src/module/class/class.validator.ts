import {z} from "zod";

export const classValidator = z.object({
className:z.string()
})

export const addStudentValidator = z.object({
    studentId:z.string()
})