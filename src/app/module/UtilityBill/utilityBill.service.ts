import { TUtility } from './utilityBill.interface'
import { Utility } from './utilityBill.model'

const createUtility = async (payload: TUtility) => {
    const date = new Date(payload.date)

    const result = await Utility.create({ ...payload, date })
    return result
}



export const utilityService = {
    createUtility,
}
