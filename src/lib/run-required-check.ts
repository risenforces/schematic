import { ValidationError } from '@app/types'

export type RunRequiredCheckResult =
  | {
      hasPassed: true
    }
  | {
      hasPassed: false
      errors: ValidationError[]
    }

export function runRequiredCheck(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  required: boolean
): RunRequiredCheckResult {
  if (value != null) {
    return { hasPassed: true }
  }

  const errors: ValidationError[] = []

  if (required) {
    errors.push({
      code: 'required',
      message: 'Value is required',
    })
  }

  return {
    hasPassed: false,
    errors,
  }
}
