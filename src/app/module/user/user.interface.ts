/*
? name:
? email:
? passwords:
? role
? status:
? phoneNumber
? address?
*/
// !name 
export type TUser = {
    name: string
    email: string
    role: 'user' | 'admin' | "Executive Director" | "Managing Director" | "General Manager" | "Coordinator"
    password: string
    phone: string
    address: string
}
export type TLogin = {
    email: string
    password: string
}