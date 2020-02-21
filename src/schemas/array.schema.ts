import { arrayValidators } from '@app/validators'
import { ValidationResult, ValidationError, SchematicSchema } from '@app/types'
import { createValidationResult } from '@app/lib/create-validation-result'
import { cloneValidators, cloneMeta, cloneValidator } from '@app/lib/clone'
import { normalizeNestedErrors } from '@app/lib/normalize-nested-errors'
import { BaseSchema } from './base.schema'
import { ArraySchemaOptions } from './types'

export class ArraySchema extends BaseSchema<unknown[]>
  implements SchematicSchema {
  constructor({
    baseValidator = arrayValidators.array(),
    validators,
    meta,
    membersSchema,
  }: ArraySchemaOptions) {
    super({
      baseValidator,
      validators,
      meta,
    })

    this.membersSchema = membersSchema
  }

  protected membersSchema?: SchematicSchema

  of(schema: SchematicSchema): this {
    this.membersSchema = schema

    return this
  }

  min(limit: number): this {
    this.addValidator(arrayValidators.min(limit))

    return this
  }

  max(limit: number): this {
    this.addValidator(arrayValidators.max(limit))

    return this
  }

  unique(): this {
    this.addValidator(arrayValidators.unique())

    return this
  }

  validate(value: unknown): ValidationResult {
    const basicValidation = this.runBasicValidation(value)

    if (!basicValidation.hasPassed) {
      return createValidationResult(basicValidation.errors)
    }

    const { castedValue, errors } = basicValidation

    for (let i = 0; i < castedValue.length; i++) {
      const item = castedValue[i]

      if (!this.membersSchema) continue

      const { isValid, errors: fieldErrors } = this.membersSchema.validate(item)

      if (isValid) continue

      const normalizedFieldErrors: ValidationError[] = normalizeNestedErrors(
        String(i),
        fieldErrors
      )

      errors.push(...normalizedFieldErrors)
    }

    return createValidationResult(errors)
  }

  clone(): ArraySchema {
    return new ArraySchema({
      baseValidator: cloneValidator(this.baseValidator),
      validators: cloneValidators<unknown[]>(this.validators),
      meta: cloneMeta(this.meta),
      membersSchema: this.membersSchema?.clone(),
    })
  }
}
