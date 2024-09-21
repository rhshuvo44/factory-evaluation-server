import { TMiscellaneous } from "./miscellaneous.interface"
import { Miscellaneous } from "./miscellaneous.model"


const createMiscellaneous = async (miscellaneousData: TMiscellaneous) => {
    const miscellaneous = await Miscellaneous.create(miscellaneousData)
    return miscellaneous
}

export const miscellaneousService = {
    createMiscellaneous
}
