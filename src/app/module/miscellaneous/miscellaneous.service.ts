import { format } from 'date-fns'
import QueryBuilder from '../../builder/QueryBuilder'
import { TMiscellaneous, TMiscellaneousUpdate } from './miscellaneous.interface'
import { Miscellaneous } from './miscellaneous.model'

const createMiscellaneous = async (miscellaneousData: TMiscellaneous) => {
    const miscellaneous = await Miscellaneous.create(miscellaneousData)
    return miscellaneous
}
const getMiscellaneous = async (query: Record<string, unknown>) => {
    // Get the current date
    const now = new Date()
    // Calculate the first and last day of the current month

    const startOfMonth = format(
        new Date(now.getFullYear(), now.getMonth(), 1),
        'dd-MM-yyyy',
    )
    const endOfMonth = format(
        new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999),
        'dd-MM-yyyy',
    )
    const miscellaneousQuery = new QueryBuilder(
        Miscellaneous.find({ date: { $gte: startOfMonth, $lte: endOfMonth } }),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields()

    const meta = await miscellaneousQuery.countTotal()
    const result = await miscellaneousQuery.modelQuery

    // // Calculate the total price
    const totalPrice = result.reduce((sum, travel) => sum + travel.totalPrice, 0)

    return {
        meta,
        result,
        totalPrice,
    }
}
const UpdateMiscellaneous = async (
    miscellaneousData: TMiscellaneousUpdate,
    id: string,
) => {
    const updatedMiscellaneous = await Miscellaneous.findByIdAndUpdate(
        id,
        miscellaneousData,
        {
            new: true,
            runValidators: true,
        },
    )
    return updatedMiscellaneous
}
const deletedMiscellaneous = async (id: string) => {
    await Miscellaneous.deleteOne({ _id: id })
}
export const miscellaneousService = {
    createMiscellaneous,
    getMiscellaneous,
    UpdateMiscellaneous,
    deletedMiscellaneous
}
