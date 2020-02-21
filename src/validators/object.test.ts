import { Validator } from '@app/types'
import { objectValidators } from './index'

interface ExpectedResults {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pass: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fail: any[]
}

function check(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validator: Validator<any>,
  expectedResults: ExpectedResults
): void {
  const { pass, fail } = expectedResults

  for (const value of pass) {
    const result = validator.validate(value)

    expect(result).toBe(true)
  }

  for (const value of fail) {
    const result = validator.validate(value)

    expect(result).toBe(false)
  }
}

describe('object validators', () => {
  test('object', () => {
    check(objectValidators.object(), {
      pass: [{}, { value: 123 }],
      fail: [
        [],
        new Date(),
        Number,
        new Map(),
        new Set(),
        null,
        NaN,
        0,
        '',
        'string',
        Infinity,
        undefined,
        true,
        false,
      ],
    })
  })
})
