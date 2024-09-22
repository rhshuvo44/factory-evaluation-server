export type utilities = {
  unitPrice: number
  totalPrice: number
}

export type TUtility = {
  slNo: number
  date: Date
  internet?: utilities[]
  water?: utilities[]
  electricity?: utilities[]
  others?: utilities[]
}
export type TUtilityUpdate = {

  internet?: utilities[]
  water?: utilities[]
  electricity?: utilities[]
  others?: utilities[]
}
