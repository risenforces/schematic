import { SchematicSchema } from '@app/types'
import { numberValidators, stringValidators } from '@app/validators'
import { SpecificPrimitiveSchemaOptions } from './types'
import { PrimitiveSchema } from './primitive.schema'

export class StringSchema extends PrimitiveSchema implements SchematicSchema {
  constructor({
    baseValidator = stringValidators.string(),
    validators,
    meta,
  }: SpecificPrimitiveSchemaOptions) {
    super({
      baseValidator,
      validators,
      meta,
    })
  }

  clone(): StringSchema {
    return this.cloneWith(StringSchema)
  }

  finite(): this {
    this.addValidator(numberValidators.finite())

    return this
  }

  integer(): this {
    this.addValidator(numberValidators.integer())

    return this
  }

  float(): this {
    this.addValidator(numberValidators.float())

    return this
  }

  min(threshold: number): this {
    this.addValidator(numberValidators.min(threshold))

    return this
  }

  max(threshold: number): this {
    this.addValidator(numberValidators.max(threshold))

    return this
  }

  positive(): this {
    this.addValidator(numberValidators.positive())

    return this
  }

  negative(): this {
    this.addValidator(numberValidators.negative())

    return this
  }
}
