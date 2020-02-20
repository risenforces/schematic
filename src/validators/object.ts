import { Validator } from '@app/types'

export const object = (): Validator => ({
  validate: value => {
    return Object.prototype.toString.call(value) === '[object Object]'
  },
  code: 'object',
  message: 'Value must be an object',
})
