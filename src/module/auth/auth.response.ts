export const AUTH_RESPONSE = {
    INVALID_CREDENTIALS:{
        message:"Invalid email or password",
        statusCode:400
    },
    DUBLICATE_EMAIL:{
        message:"Email already exists",
        statusCode:400
    },
    INVALID_SCHEMA:{
    message:"Invalid request schema",
        statusCode:400
    },
    USER_NOT_FOUND:{
    message:"Unauthorized, token missing or invalid",
        statusCode:401
    }
}