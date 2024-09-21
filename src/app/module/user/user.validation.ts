import { z } from 'zod'

export const userCreateValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    userName: z.string().min(1, 'UserName is required'),
    email: z.string().email('Invalid email address'),
    role: z
      .enum([
        'user',
        'admin',
        'executiveDirector',
        'managingDirector',
        'generalManager',
        'coordinator',
      ])
      .default('user'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    phone: z.string().min(11).max(11),
    address: z.string().min(1, 'Address is required'),
  }),
})
export const userUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    userName: z.string().optional(),
    email: z.string().optional(),
    role: z
      .enum([
        'user',
        'admin',
        'executiveDirector',
        'managingDirector',
        'generalManager',
        'coordinator',
      ])
      .optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
})
