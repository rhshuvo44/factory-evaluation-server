import { z } from 'zod'

export const employeeValidation = z.object({
  body: z.object({
    name: z.string(),
    photo: z.string().optional(),
    salary: z.number().positive(),
    workingDays: z.number().positive(),
    designation: z.enum([
      'Supervisor',
      'G.M',
      'P.M',
      'Ex. Accountant',
      'Security',
      'Cutting Master',
      'Fin. Incharge',
      'Mechanic',
      'Operator',
      'Folding',
      'Check',
      'Helper',
      'Maid',
      'Cleaner',
      'Cut. Helper',
      'Cutting',
    ]),
    status: z.enum(['in-progress', 'blocked']).default('in-progress'),
    overTime: z.number().positive(),
    overTimeRate: z.number().positive(),
    perDaySalary: z.number().positive(),
    grossPerDaySalary: z.number().positive(),
  }),
})
export const employeeUpdateValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    photo: z.string().optional(),
    salary: z.number().positive().optional(),
    workingDays: z.number().positive().optional(),
    designation: z
      .enum([
        'Supervisor',
        'G.M',
        'P.M',
        'Ex. Accountant',
        'Security',
        'Cutting Master',
        'Fin. Incharge',
        'Mechanic',
        'Operator',
        'Folding',
        'Check',
        'Helper',
        'Maid',
        'Cleaner',
        'Cut. Helper',
        'Cutting',
      ])
      .optional(),
    status: z.enum(['in-progress', 'blocked']).optional(),
    overTime: z.number().positive().optional(),
    overTimeRate: z.number().positive().optional(),
    perDaySalary: z.number().positive().optional(),
    grossPerDaySalary: z.number().positive().optional(),
  }),
})
