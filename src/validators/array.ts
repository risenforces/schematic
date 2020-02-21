import { Validator, BaseValidator } from '@app/types'

type ArrayValidator = Validator<unknown[]>

export const array = (): BaseValidator<unknown[]> => ({
  validate: Array.isArray,
  code: 'array',
  message: 'Value must be an array',
})

export const min = (limit: number): ArrayValidator => ({
  validate: value => {
    return value.length >= limit
  },
  code: 'array/min',
  message: `Value must have at least ${limit} items`,
})

export const max = (limit: number): ArrayValidator => ({
  validate: value => {
    return value.length <= limit
  },
  code: 'array/max',
  message: `Value must have at most ${limit} items`,
})

export const unique = (): ArrayValidator => ({
  validate: value => {
    const map = new Map()

    for (const item of value) {
      if (map.has(item)) return false
      map.set(item, true)
    }

    return true
  },
  code: 'array/unique',
  message: `All value items must be unique`,
})
