import { ValidationError } from '@app/types'

export function normalizeNestedErrors(
  field: string,
  errors: ValidationError[]
): ValidationError[] {
  return errors.map(error => {
    const { path, code, message } = error

    if (!path) {
      return {
        path: field,
        code,
        message,
      }
    }

    return {
      path: `${field}.${path}`,
      code,
      message,
    }
  })
}
