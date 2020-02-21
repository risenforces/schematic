import { BaseValidator } from '@app/types'
import { runValidator } from './run-validator'

test('runBaseValidator', () => {
  const validator = {
    validate: (value: unknown) => typeof value === 'string',
    code: 'code',
    message: 'message',
  }

  expect(runValidator('', validator as BaseValidator<string>)).toEqual({
    isValid: true,
  })

  expect(runValidator(123, validator as BaseValidator<string>)).toEqual({
    isValid: false,
    error: {
      code: 'code',
      message: 'message',
    },
  })
})
