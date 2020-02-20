import { ValidationError } from '@app/types'

export function removeDuplicatedErrors(
  errors: ValidationError[]
): ValidationError[] {
  const uniqueErrors: ValidationError[] = []

  const occuredErrorsMap: Map<string, true> = new Map()

  for (const error of errors) {
    const { path = '', code, message } = error

    const errorFingerprint = `${path}|${code}|${message}`

    if (occuredErrorsMap.has(errorFingerprint)) {
      continue
    }

    occuredErrorsMap.set(errorFingerprint, true)

    uniqueErrors.push(error)
  }

  return uniqueErrors
}
