import { z } from 'zod';

const loginValidationSchema = z.object({
    body: z.object({
        userName: z.string().min(1, "UserName is required"),
        password: z.string().min(8, 'Password must be at least 8 characters long'),
    }),
})

const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});


export const AuthValidation = {
    loginValidationSchema,
    refreshTokenValidationSchema
};