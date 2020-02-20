import { Validator } from '@app/types'
import { getLastOf } from '@app/lib/get-last-of'
import { getInitialMeta } from './shared'
import { Meta, BaseSchemaOptions } from './types'

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
}
