import { TLoan } from "./loan.interface"
import { Loan } from "./loan.model"


const createLoan = async (payload: TLoan) => {
    const date = new Date(payload.date)


    const loan = await Loan.create({ ...payload, date })
    return loan
}

export const loanService = {
    createLoan,
}
