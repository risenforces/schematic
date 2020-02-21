import { Validator, BaseValidator } from '@app/types'

type NumberValidator = Validator<number>

export const number = (): BaseValidator<number> => ({
  validate: (value): value is number => {
    if (typeof value !== 'number') return false
    if (Number.isNaN(value)) return false
    return true
  },
  code: 'number',
  message: 'Value must be a number',
})

export const finite = (): NumberValidator => ({
  validate: Number.isFinite,
  code: 'number/finite',
  message: 'Value must be finite',
})

export const integer = (): NumberValidator => ({
  validate: Number.isInteger,
  code: 'number/integer',
  message: 'Value must be an integer',
})

export const float = (): NumberValidator => ({
  validate: value => {
    return Number.isFinite(value) && value % 1 !== 0
  },
  code: 'number/float',
  message: 'Value must be a float',
})

export const min = (limit: number): NumberValidator => ({
  validate: value => {
    return value >= limit
  },
  code: 'number/min',
  message: `Value must be greater than or equal to ${limit}`,
})

export const max = (limit: number): NumberValidator => ({
  validate: value => {
    return value <= limit
  },
  code: 'number/max',
  message: `Value must be less than or equal to ${limit}`,
})

export const lessThan = (limit: number): NumberValidator => ({
  validate: value => {
    return value < limit
  },
  code: 'number/less-than',
  message: `Value must be less than ${limit}`,
})

export const greaterThan = (limit: number): NumberValidator => ({
  validate: value => {
    return value > limit
  },
  code: 'number/greater-than',
  message: `Value must be greater than ${limit}`,
})

export const positive = (): NumberValidator => ({
  validate: value => {
    return value > 0
  },
  code: 'number/positive',
  message: 'Value must be a positive number',
})

export const negative = (): NumberValidator => ({
  validate: value => {
    return value < 0
  },
  code: 'number/negative',
  message: 'Value must be a negative number',
})
