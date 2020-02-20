import { ObjectSchema } from './schemas/object.schema'
import { NumberSchema } from './schemas/number.schema'

export const object = (): ObjectSchema => new ObjectSchema({})
export const number = (): NumberSchema => new NumberSchema({})

export * from './types'
