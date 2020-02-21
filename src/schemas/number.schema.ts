import { SchematicSchema } from '@app/types'
import { numberValidators } from '@app/validators'
import { SpecificPrimitiveSchemaOptions } from './types'
import { PrimitiveSchema } from './primitive.schema'

export class NumberSchema extends PrimitiveSchema<number>
  implements SchematicSchema {
  constructor({
    baseValidator = numberValidators.number(),
    validators,
    meta,
  }: SpecificPrimitiveSchemaOptions<number>) {
    super({
      baseValidator,
      validators,
      meta,
    })
  }

  clone(): NumberSchema {
    return this.cloneWith(NumberSchema)
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
