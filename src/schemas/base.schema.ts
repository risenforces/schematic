import { Validator } from '@app/types'
import { getLastOf } from '@app/lib/get-last-of'
import { getInitialMeta } from './shared'
import { Meta } from './types'

export class BaseSchema {
  constructor(validators: Validator[], meta: Meta = getInitialMeta()) {
    this.validators = validators
    this.meta = meta
  }

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
    const lastValidator = getLastOf(this.validators)

    lastValidator.message = text

    return this
  }
}
