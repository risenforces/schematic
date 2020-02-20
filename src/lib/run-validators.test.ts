import { Validator } from '@app/types'
import { runValidators, RunValidatorsResult } from './run-validators'

describe('runValidators', () => {
  test('with no validators', () => {
    expect(runValidators(123, [])).toMatchObject({
      errors: [],
    })
  })

  test('with validators', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validateA = jest.fn((value: any) => value === 'pass')
    const validateB = jest.fn(() => true)

    const mockValidators = [
      {
        validate: validateA,
        code: 'hello',
        message: 'Hello',
      },
      {
        validate: validateB,
        code: 'hello2',
        message: 'Hello2',
        requires: ['hello'],
      },
    ]

    let result: RunValidatorsResult

    result = runValidators('value', mockValidators as Validator[])

    expect(result.errors).toEqual([{ code: 'hello', message: 'Hello' }])

    expect(validateA).toBeCalledTimes(1)
    expect(validateA).toBeCalledWith('value')
    expect(validateB).toBeCalledTimes(0)

    result = runValidators('pass', mockValidators as Validator[])

    expect(result.errors).toEqual([])

    expect(Array.from(result.passedValidatorsMap.keys())).toEqual([
      'hello',
      'hello2',
    ])

    expect(validateA).toBeCalledTimes(2)
    expect(validateA).toBeCalledWith('pass')
    expect(validateB).toBeCalledTimes(1)
    expect(validateB).toBeCalledWith('pass')
  })
})
