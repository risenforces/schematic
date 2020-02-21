import { Validator } from '@app/types'
import { runValidator } from './run-validator'

test('runValidator', () => {
  const validator = {
    validate: (value: unknown) => value === 'good',
    code: 'code',
    message: 'message',
  }

  expect(runValidator('good', validator as Validator<string>)).toEqual({
    isValid: true,
  })

  expect(runValidator('bad', validator as Validator<string>)).toEqual({
    isValid: false,
    error: {
      code: 'code',
      message: 'message',
    },
  })
})
