import { Validator, ValidationError } from '@app/types'
import { getLastOf } from '@app/lib/get-last-of'
import { runRequiredCheck } from '@app/lib/run-required-check'
import { runValidator } from '@app/lib/run-validator'
import { runValidators } from '@app/lib/run-validators'
import { Meta, BaseSchemaOptions } from './types'
import { getInitialMeta } from './shared'

interface BasicValidationResult {
  hasPassed: boolean
  errors: ValidationError[]
}

export class BaseSchema {
  constructor({
    baseValidator,
    validators = [],
    meta = getInitialMeta(),
  }: BaseSchemaOptions) {
    this.baseValidator = baseValidator
    this.validators = validators
    this.meta = meta
  }

  protected baseValidator: Validator

  protected validators: Validator[]

  protected meta: Meta = {
    required: false,
  }

  protected addValidator(validator: Validator): void {
    this.validators.push(validator)
  }

  required(): this {
    this.meta.required = true

    return this
  }

  optional(): this {
    this.meta.required = false

    return this
  }

  message(text: string): this {
    const lastValidator =
      this.validators.length > 0
        ? getLastOf(this.validators)
        : this.baseValidator

    lastValidator.message = text

    return this
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected runBasicValidation(value: any): BasicValidationResult {
    const requiredCheck = runRequiredCheck(value, this.meta.required)

    if (!requiredCheck.hasPassed) {
      return {
        hasPassed: false,
        errors: requiredCheck.errors,
      }
    }

    const baseValidation = runValidator(value, this.baseValidator)

    if (!baseValidation.isValid) {
      return {
        hasPassed: false,
        errors: [baseValidation.error],
      }
    }

    const { errors } = runValidators(value, this.validators)

    return {
      hasPassed: true,
      errors,
    }
  }
}
