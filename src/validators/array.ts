import { Validator } from '@app/types'

export const array = (): Validator => ({
  validate: Array.isArray,
  code: 'array',
  message: 'Value must be an array',
})

export const min = (limit: number): Validator => ({
  validate: value => {
    return value.length >= limit
  },
  code: 'array/min',
  message: `Value must contain at least ${limit} items`,
  requires: ['array'],
})

export const max = (limit: number): Validator => ({
  validate: value => {
    return value.length <= limit
  },
  code: 'array/max',
  message: `Value must contain no more than ${limit} items`,
  requires: ['array'],
})

export const unique = (): Validator => ({
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
  requires: ['array'],
})
