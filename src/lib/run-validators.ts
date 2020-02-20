import { ValidatorCode, ValidationError, Validator } from '@app/types'
import { sortValidators } from './sort-validators'

type PassedValidatorsMap = Map<ValidatorCode, true>

export interface RunValidatorsResult {
  errors: ValidationError[]
  passedValidatorsMap: PassedValidatorsMap
}

export function runValidators(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  validators: Validator[]
): RunValidatorsResult {
  const errors: ValidationError[] = []

  const passedValidatorsMap: PassedValidatorsMap = new Map()

  /* First, process validators for the current schema */

  const sortedValidators = sortValidators(validators)

  for (const validator of sortedValidators) {
    const { validate, code, message, requires = [] } = validator

    const requiredValidatorsPassed = requires.every(code => {
      return passedValidatorsMap.has(code)
    })

    if (!requiredValidatorsPassed) {
      continue
    }

    const isValid = validate(value)

    if (isValid) {
      passedValidatorsMap.set(code, true)
      continue
    }

    errors.push({ code, message })
  }

  return { errors, passedValidatorsMap }
}
