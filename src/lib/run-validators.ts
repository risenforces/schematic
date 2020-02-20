import { ValidationError, Validator } from '@app/types'
import { sortValidators } from './sort-validators'
import { runValidator } from './run-validator'

export interface RunValidatorsResult {
  errors: ValidationError[]
}

export function runValidators(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  validators: Validator[]
): RunValidatorsResult {
  const errors: ValidationError[] = []

  /* First, process validators for the current schema */

  const sortedValidators = sortValidators(validators)

  for (const validator of sortedValidators) {
    const validation = runValidator(value, validator)

    if (validation.isValid) continue

    errors.push(validation.error)
  }

  return { errors }
}
