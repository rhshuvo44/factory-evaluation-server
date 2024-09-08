import { z } from 'zod';

const loginValidationSchema = z.object({
    body: z.object({
        userName: z.string().min(1, "UserName is required"),
        password: z.string().min(8, 'Password must be at least 8 characters long'),
    }),
})




export const AuthValidation = {
    loginValidationSchema,
};