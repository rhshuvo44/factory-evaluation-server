export type TEmployee = {
  slNo: number
  id: string
  name: string
  photo?: string
  designation:
  | 'Supervisor'
  | 'G.M'
  | 'P.M'
  | 'Ex. Accountant'
  | 'Security'
  | 'Cutting Master'
  | 'Fin. Incharge'
  | 'Mechanic'
  | 'Operator'
  | 'Folding'
  | 'Check'
  | 'Helper'
  | 'Maid'
  | 'Cleaner'
  | 'Cut. Helper'
  | 'Cutting'
  workingDays: number
  status: 'in-progress' | 'blocked'
  salary: number
  perDaySalary: number
  overTime: number
  overTimeRate: number
  grossPerDaySalary: number
}
export type TEmployeeUpdate = {
  slNo?: number
  id?: string
  name?: string
  photo?: string
  designation?:
  | 'Supervisor'
  | 'G.M'
  | 'P.M'
  | 'Ex. Accountant'
  | 'Security'
  | 'Cutting Master'
  | 'Fin. Incharge'
  | 'Mechanic'
  | 'Operator'
  | 'Folding'
  | 'Check'
  | 'Helper'
  | 'Maid'
  | 'Cleaner'
  | 'Cut. Helper'
  | 'Cutting'
  workingDays?: number
  status?: 'in-progress' | 'blocked'
  salary?: number
  perDaySalary?: number
  overTime?: number
  overTImeRate?: number
  grossPerDaySalary?: number
}
