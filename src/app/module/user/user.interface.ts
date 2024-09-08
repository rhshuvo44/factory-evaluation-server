/*
? name:
? email:
? passwords:
? role
? status:
? phoneNumber
? address?
*/

import { USER_ROLE } from "./user.constant"

// !name 
export type TUser = {
    name: string
    userName: string
    email: string
    role: 'user' | 'admin' | "executiveDirector" | "managingDirector" | "generalManager" | "coordinator"
    password: string
    phone: string
    address: string
    isDeleted: boolean
    status: "blocked" | "in-progress"

}



export type TUserRole = keyof typeof USER_ROLE;