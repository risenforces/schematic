import { Validator } from '@app/types'
import { numberValidators } from './index'

interface ExpectedResults {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pass: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fail: any[]
}

function check(validator: Validator, expectedResults: ExpectedResults): void {
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

describe('number validators', () => {
  test('number', () => {
    check(numberValidators.number(), {
      pass: [-0, 0, -1, 1, 0x34, -Infinity, Infinity],
      fail: ['string', '', null, undefined, NaN, [], {}, true, false],
    })
  })

  test('finite', () => {
    check(numberValidators.finite(), {
      pass: [0, 34, 345345, 3.54, 2e5, 0x43],
      fail: [-Infinity, Infinity, NaN],
    })
  })

  test('integer', () => {
    check(numberValidators.integer(), {
      pass: [1, 2, 354, 4, 5324, 5.0, 0, -100000],
      fail: [
        34.00000032,
        34.53,
        99.99,
        -Infinity,
        Infinity,
        NaN,
        Math.PI,
        '34',
        0.1,
      ],
    })
  })

  test('float', () => {
    check(numberValidators.float(), {
      pass: [34.00000032, 34.53, 99.99, Math.PI],
      fail: [1, 5.0, Infinity, -Infinity, NaN, 0],
    })
  })

  test('min', () => {
    check(numberValidators.min(10), {
      pass: [10, 20, 349857, 23423455345345, Infinity],
      fail: [1, 9, -Infinity, -0],
    })
  })

  test('max', () => {
    check(numberValidators.max(10), {
      pass: [10, 1, 9, -Infinity, -0],
      fail: [20, 349857, 23423455345345, Infinity],
    })
  })

  test('lessThan', () => {
    check(numberValidators.lessThan(11), {
      pass: [10, 1, 9, -Infinity, -0],
      fail: [20, 349857, 23423455345345, Infinity],
    })
  })

  test('greaterThan', () => {
    check(numberValidators.greaterThan(9), {
      pass: [10, 20, 349857, 23423455345345, Infinity],
      fail: [1, 9, -Infinity, -0],
    })
  })

  test('positive', () => {
    check(numberValidators.positive(), {
      pass: [1, Infinity],
      fail: [0, -0, -1, -Infinity, NaN],
    })
  })

  test('negative', () => {
    check(numberValidators.negative(), {
      pass: [-1, -Infinity],
      fail: [0, -0, 1, Infinity, NaN],
    })
  })
})
