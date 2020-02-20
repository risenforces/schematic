import { Validator, ValidationError } from '@app/types'

type RunValidatorResult =
  | {
      isValid: true
    }
  | {
      isValid: false
      error: ValidationError
    }

export function runValidator(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  validator: Validator
): RunValidatorResult {
  const { validate, code, message } = validator

  const isValid = validate(value)

  if (isValid) {
    return { isValid }
  }

  return {
    isValid,
    error: { code, message },
  }
}
