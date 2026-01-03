import express, { NextFunction, Request, Response } from 'express';
import { isValidEmail } from '../../utils/isValidEmail';
import { AUTH_RESPONSE } from './auth.response';
import { createUser, findUser, login } from './auth.service';
import { userLoginSchema, userZodSchema } from './auth.validator';
import { tokenValidator } from '../../middlerware/tokenValidator';

const router = express.Router();


router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validate = userZodSchema.safeParse(req.body)

        if (!validate.success) {
            throw AUTH_RESPONSE.INVALID_SCHEMA;
        }

        const data = validate.data;
        if (!isValidEmail(data.email)) {
            throw AUTH_RESPONSE.INVALID_SCHEMA;
        }

        const userCreated = await createUser(data);

        return res.status(201).send({
            success: true,
            data: userCreated
        })
    } catch (error: any) {
        return res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Somrhing went wrong"
        })
    }
})

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validator = userLoginSchema.safeParse(req.body);
        if (!validator.success) {
            throw AUTH_RESPONSE.INVALID_SCHEMA;
        }

        const data = validator.data;
        if (!isValidEmail(data.email)) {
            throw AUTH_RESPONSE.INVALID_SCHEMA;
        }
        const token = await login(data);

        return res.status(200).json({
            success: true,
            data: { token: token }
        });
    } catch (error: any) {
        return res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Somthing went wrong!!"
        })
    }
})


router.get("/me", tokenValidator, async (req: Request, res: Response) => {
    try {
        const user = await findUser(req.user.id);

        if (!user) {
            throw AUTH_RESPONSE.USER_NOT_FOUND
        }

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error: any) {
        return res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Somrhing went wrong"
        })
    }
})
export default router;