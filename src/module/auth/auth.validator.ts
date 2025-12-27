import {z } from "zod";

export const userZodSchema = z.object({
name:z.string(),
email:z.string(),
password:z.string().min(6,"password should be 6 or more charchter"),
role:z.enum(["teacher","student"])
})

export const userLoginSchema = z.object({
    email:z.string(),
    password:z.string()
})