import { Validator, ValidationError } from '@app/types'

type RunValidatorResult =
  | {
      isValid: true
    }
  | {
      isValid: false
      error: ValidationError
    }

export function runValidator<V, T extends Validator<V> = Validator<V>>(
  value: V,
  validator: T
): RunValidatorResult {
  const { validate, code, message } = validator

  if (validate(value)) {
    return { isValid: true }
  }

  return {
    isValid: false,
    error: { code, message },
  }
}
