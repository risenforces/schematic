import { ValidationError } from '@app/types'
import { createValidationResult } from './create-validation-result'

test('createValidationResult', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let errors: any[]

  errors = []

  expect(createValidationResult(errors as ValidationError[])).toEqual({
    isValid: true,
    errors: [],
  })

  errors = [{ code: 'one' }, { code: 'two' }]

  expect(createValidationResult(errors as ValidationError[])).toEqual({
    isValid: false,
    errors: [{ code: 'one' }, { code: 'two' }],
  })
})
