import { Validator } from '@app/types'
import { REGEXPS } from '@app/constants/regexps'

export const string = (): Validator => ({
  validate: value => {
    return typeof value === 'string'
  },
  code: 'string',
  message: 'Value must be a string',
})

export const length = (length: number): Validator => ({
  validate: value => {
    return value.length === length
  },
  code: 'string/length',
  message: `Value must be exactly ${length} characters`,
})

export const min = (limit: number): Validator => ({
  validate: value => {
    return value.length >= limit
  },
  code: 'string/min',
  message: `Value must be at least ${limit} characters`,
})

export const max = (limit: number): Validator => ({
  validate: value => {
    return value.length <= limit
  },
  code: 'string/max',
  message: `Value must be at most ${limit} characters`,
})

export const matches = (regex: RegExp): Validator => ({
  validate: value => {
    return regex.test(value)
  },
  code: 'string/matches',
  message: `Value must match the following: "${regex}"`,
})

export const email = (): Validator => ({
  validate: value => {
    return REGEXPS.EMAIL.test(value)
  },
  code: 'string/email',
  message: `Value must be valid email`,
})

export const url = (): Validator => ({
  validate: value => {
    return REGEXPS.URL.test(value)
  },
  code: 'string/url',
  message: `Value must be valid url`,
})

export const trimmed = (): Validator => ({
  validate: value => {
    return value.trim() === value
  },
  code: 'string/trimmed',
  message: `Value must be a trimmed string`,
})

export const lowercased = (): Validator => ({
  validate: value => {
    return value.toLowerCase() === value
  },
  code: 'string/lowercased',
  message: `Value must be a lowercase string`,
})

export const uppercased = (): Validator => ({
  validate: value => {
    return value.toUpperCase() === value
  },
  code: 'string/uppercased',
  message: `Value must be an uppercase string`,
})
