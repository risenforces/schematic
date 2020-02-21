import { Validator } from '@app/types'
import { arrayValidators } from './index'

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

describe('array validators', () => {
  test('array', () => {
    check(arrayValidators.array(), {
      pass: [[], [1, 2, 3]],
      fail: [
        {},
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

  test('min', () => {
    check(arrayValidators.min(3), {
      pass: [
        [1, 2, 3],
        [4, 3, 2, 1],
      ],
      fail: [[], [1, 2]],
    })
  })

  test('max', () => {
    check(arrayValidators.max(3), {
      pass: [[1, 2, 3], [], [1, 2]],
      fail: [[1, 2, 3, 4]],
    })
  })

  test('unique', () => {
    check(arrayValidators.unique(), {
      pass: [
        [1, 2, 3],
        [],
        [1, 2],
        ['12', 12, 23424, Infinity, NaN, true],
        [null, undefined],
      ],
      fail: [
        [true, true],
        [1, 2, 3, 1, 5],
        [null, null],
        [undefined, undefined],
        [true, false, true],
        [Infinity, Infinity],
      ],
    })
  })
})
