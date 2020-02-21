import { ValidationError, BaseValidator } from '@app/types'

type RunValidatorResult =
  | {
      isValid: true
    }
  | {
      isValid: false
      error: ValidationError
    }

export function runBaseValidator<
  V,
  T extends BaseValidator<V> = BaseValidator<V>
>(value: unknown, validator: T): RunValidatorResult {
  const { validate, code, message } = validator

  if (validate(value)) {
    return { isValid: true }
  }

  return {
    isValid: false,
    error: { code, message },
  }
}
