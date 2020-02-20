import { ValidationError } from '@app/types'
import { normalizeNestedErrors } from './normalize-nested-errors'

test('normalizeNestedErrors', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let errors: any[]

  errors = []

  expect(normalizeNestedErrors('field', errors as ValidationError[])).toEqual(
    []
  )

  errors = [
    {
      code: 'hello',
      message: 'Hello!',
    },
    {
      path: 'nested',
      code: 'bye',
      message: 'Bye!',
    },
  ]

  expect(normalizeNestedErrors('field', errors as ValidationError[])).toEqual([
    {
      path: 'field',
      code: 'hello',
      message: 'Hello!',
    },
    {
      path: 'field.nested',
      code: 'bye',
      message: 'Bye!',
    },
  ])
})
