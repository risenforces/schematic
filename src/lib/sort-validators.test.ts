import { ValidatorCode, Validator } from '@app/types'
import { sortValidators } from './sort-validators'

function createDummyValidator(code: ValidatorCode): Validator {
  return {
    validate: () => true,
    code,
    message: '',
  }
}

describe('sortValidators', () => {
  it('should sort validators in right way', () => {
    const validators = [
      createDummyValidator('number/min'),
      createDummyValidator('number'),
      createDummyValidator('number/max'),
    ]

    const result = sortValidators(validators)

    const codes = result.map(({ code }) => code)

    expect(codes).toEqual(['number', 'number/min', 'number/max'])
  })
})
