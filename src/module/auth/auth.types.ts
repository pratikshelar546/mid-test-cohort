import { Document } from "mongoose";

export interface user {
    name:string,
    email:string,
    role:"teacher"| "student",
    password:string,
}

export interface userMethod extends user{
    comparePassword(plain: string): Promise<boolean>;

}