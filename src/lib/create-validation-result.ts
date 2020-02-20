import { ValidationError, ValidationResult } from '@app/types'
import { removeDuplicatedErrors } from './remove-duplicated-errors'

export function createValidationResult(
  errors: ValidationError[]
): ValidationResult {
  return {
    isValid: errors.length === 0,
    errors: removeDuplicatedErrors(errors),
  }
}
