import { ResponseHandler, sentize } from '../../utils/responseHAndler';
import { AUTH_RESPONSE } from "./auth.response";
import { UserModel } from "./auth.schama";
import { user, userMethod } from "./auth.types";
import jwt from "jsonwebtoken";

export const createUser = async (data: user) => {
    try {
        const checkEmailExist = await UserModel.findOne({ email: data.email });
        if (checkEmailExist) throw AUTH_RESPONSE.DUBLICATE_EMAIL
        const userData = await UserModel.create(data);
        return sentize(userData);
    } catch (error) {
        throw error
    }
}

export const login = async (data: { email: string, password: string }) => {
    try {
        const user = await UserModel.findOne({ email: data.email });

        if (!user) throw AUTH_RESPONSE.INVALID_CREDENTIALS;
        // @ts-ignore
        const validatePassword = await user.comparePassword(data.password);

        if (!validatePassword) throw AUTH_RESPONSE.INVALID_CREDENTIALS;

        const token = jwt.sign({ id: user._id, role: user.role }, "testing");

        return token;
    } catch (error) {
        throw error
    }
}


export const findUser = async (id: string) => {
    try {
        const user = await UserModel.findById(id);
        if (!user) throw AUTH_RESPONSE.USER_NOT_FOUND
        return sentize(user);
    } catch (error) {
        throw error
    }
}