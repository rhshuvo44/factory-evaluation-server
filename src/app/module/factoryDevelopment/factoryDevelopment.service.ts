import { TFactoryDevelopment } from './factoryDevelopment.interface'
import { FactoryDevelopment } from './factoryDevelopment.model'

const createFactoryDevelopment = async (payload: TFactoryDevelopment) => {
    const date = new Date(payload.date)

    const result = await FactoryDevelopment.create({ ...payload, date })
    return result
}

export const factoryDevelopmentService = {
    createFactoryDevelopment
}
