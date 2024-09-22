import { format } from 'date-fns'
import QueryBuilder from '../../builder/QueryBuilder'
import { TFactoryDevelopment } from './factoryDevelopment.interface'
import { FactoryDevelopment } from './factoryDevelopment.model'

const createFactoryDevelopment = async (payload: TFactoryDevelopment) => {
    const date = new Date(payload.date)

    const result = await FactoryDevelopment.create({ ...payload, date })
    return result
}
const getFactoryDevelopment = async (query: Record<string, unknown>) => {
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
    const dataQuery = new QueryBuilder(
        FactoryDevelopment.find({ date: { $gte: startOfMonth, $lte: endOfMonth } }),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields()

    const meta = await dataQuery.countTotal()
    const data = await dataQuery.modelQuery

    const result = data.map(item => ({
        ...item.toObject(),
        date: format(item.date, 'dd-MM-yyyy'), // Format date as 'YYYY-MM-DD'
    }))
    // // Calculate the total price
    const totalPrice = data.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
    )

    return {
        meta,
        result,
        totalPrice,
    }
}
export const factoryDevelopmentService = {
    createFactoryDevelopment, getFactoryDevelopment
}
