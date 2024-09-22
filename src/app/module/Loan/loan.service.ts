import { format } from 'date-fns'
import QueryBuilder from '../../builder/QueryBuilder'
import { TLoan, TLoanUpdate } from './loan.interface'
import { Loan } from './loan.model'

const createLoan = async (payload: TLoan) => {
    const date = new Date(payload.date)

    const loan = await Loan.create({ ...payload, date })
    return loan
}
const getLoan = async (query: Record<string, unknown>) => {
    // Get the current date
    const now = new Date()
    // Calculate the first and last day of the current month

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
    )
    const loanQuery = new QueryBuilder(
        Loan.find({ date: { $gte: startOfMonth, $lte: endOfMonth } }),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields()

    const meta = await loanQuery.countTotal()
    const loan = await loanQuery.modelQuery

    const result = loan.map(item => ({
        ...item.toObject(),
        date: format(item.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
    }))
    // // Calculate the total price
    const totalPrice = loan.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
    )

    return {
        meta,
        result,
        totalPrice,
    }
}
const updateLoan = async (
    payload: TLoanUpdate,
    id: string,
) => {
    let date
    if (payload?.date) {
        date = new Date(payload?.date)
    }
    const result = await Loan.findByIdAndUpdate(
        id,
        { ...payload, date },
        {
            new: true,
            runValidators: true,
        },
    )
    return result
}
export const loanService = {
    createLoan,
    getLoan, updateLoan
}