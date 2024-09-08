import { z } from 'zod';

export const userCreateValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        role: z.enum(['user', 'admin', "Executive Director", "Managing Director", "General Manager", "Coordinator"]).default("user"),
        password: z.string().min(8, "Password must be at least 8 characters long"),
        phone: z.string().min(10, "Phone number must be at least 10 characters long"),
        address: z.string().min(1, "Address is required")
    })
});
export const UserLoginSchemaZod = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters long'),
    }),
})