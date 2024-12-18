import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

// !name
export interface TUser {
  name: string
  username: string
  email: string
  role:
    | 'superAdmin'
    | 'admin'
    | 'executiveDirector'
    | 'managingDirector'
    | 'generalDirector'
    | 'coordinator'
  password: string
  passwordChangedAt: Date
  phone: string
  address: string
  isDeleted: boolean
  status: 'blocked' | 'in-progress'
}
export type TUserUpdate = {
  name?: string
  username?: string
  email?: string
  role?:
    | 'superAdmin'
    | 'admin'
    | 'executiveDirector'
    | 'managingDirector'
    | 'generalDirector'
    | 'coordinator'
  password?: string
  phone?: string
  address?: string
  isDeleted?: boolean
  status?: 'blocked' | 'in-progress'
}
export interface UserModel extends Model<TUser> {
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean
}

export type TUserRole = keyof typeof USER_ROLE
