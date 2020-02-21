import { Validator, ValidationError, BaseValidator } from '@app/types'
import { getLastOf } from '@app/lib/get-last-of'
import { runRequiredCheck } from '@app/lib/run-required-check'
import { runValidators } from '@app/lib/run-validators'
import { runBaseValidator } from '@app/lib/run-base-validator'
import { Meta, BaseSchemaOptions } from './types'
import { getInitialMeta } from './shared'

type BasicValidationResult<V> =
  | {
      hasPassed: true
      castedValue: V
      errors: ValidationError[]
    }
  | {
      hasPassed: false
      errors: ValidationError[]
    }

export class BaseSchema<V = unknown> {
  constructor({
    baseValidator,
    validators = [],
    meta = getInitialMeta(),
  }: BaseSchemaOptions<V>) {
    this.baseValidator = baseValidator
    this.validators = validators
    this.meta = meta
  }

  protected baseValidator: BaseValidator<V>

  protected validators: Validator<V>[]

  protected meta: Meta = {
    required: false,
  }

  protected addValidator(validator: Validator<V>): void {
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

  protected runBasicValidation(value: unknown): BasicValidationResult<V> {
    const requiredCheck = runRequiredCheck(value, this.meta.required)

    if (!requiredCheck.hasPassed) {
      return {
        hasPassed: false,
        errors: requiredCheck.errors,
      }
    }

    const baseValidation = runBaseValidator(value, this.baseValidator)

    if (!baseValidation.isValid) {
      return {
        hasPassed: false,
        errors: [baseValidation.error],
      }
    }

    // TS is not so clever to realize that value must have V type after baseValidator
    const castedValue = value as V

    const { errors } = runValidators(castedValue, this.validators)

    return {
      hasPassed: true,
      castedValue,
      errors,
    }
  }
}
