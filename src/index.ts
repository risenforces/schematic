import { ObjectSchema } from './schemas/object.schema'
import { NumberSchema } from './schemas/number.schema'
import { ArraySchema } from './schemas/array.schema'
import { StringSchema } from './schemas/string.schema'

export const object = (): ObjectSchema => new ObjectSchema({})
export const array = (): ArraySchema => new ArraySchema({})
export const number = (): NumberSchema => new NumberSchema({})
export const string = (): StringSchema => new StringSchema({})

export * from './types'
