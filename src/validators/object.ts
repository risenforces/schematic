import { BaseValidator } from '@app/types'

export const object = (): BaseValidator<Record<string, unknown>> => ({
  validate: (value): value is Record<string, unknown> => {
    return Object.prototype.toString.call(value) === '[object Object]'
  },
  code: 'object',
  message: 'Value must be an object',
})
