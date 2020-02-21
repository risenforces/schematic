import { SchematicSchema } from '@app/types'
import { stringValidators } from '@app/validators'
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

  length(length: number): this {
    this.addValidator(stringValidators.length(length))

    return this
  }

  min(limit: number): this {
    this.addValidator(stringValidators.min(limit))

    return this
  }

  max(limit: number): this {
    this.addValidator(stringValidators.max(limit))

    return this
  }

  matches(regex: RegExp): this {
    this.addValidator(stringValidators.matches(regex))

    return this
  }

  email(): this {
    this.addValidator(stringValidators.email())

    return this
  }

  url(): this {
    this.addValidator(stringValidators.url())

    return this
  }

  trimmed(): this {
    this.addValidator(stringValidators.trimmed())

    return this
  }

  lowercased(): this {
    this.addValidator(stringValidators.lowercased())

    return this
  }

  uppercased(): this {
    this.addValidator(stringValidators.uppercased())

    return this
  }
}
