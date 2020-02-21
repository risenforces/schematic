import { objectValidators } from '@app/validators'
import {
  ValidationResult,
  ValidationError,
  ShapeSchema,
  SchematicSchema,
} from '@app/types'
import { createValidationResult } from '@app/lib/create-validation-result'
import {
  cloneValidators,
  cloneMeta,
  cloneShapeSchema,
  cloneValidator,
} from '@app/lib/clone'
import { normalizeNestedErrors } from '@app/lib/normalize-nested-errors'
import { BaseSchema } from './base.schema'
import { ObjectSchemaOptions } from './types'

export class ObjectSchema extends BaseSchema<Record<string, unknown>>
  implements SchematicSchema {
  constructor({
    baseValidator = objectValidators.object(),
    validators,
    meta,
    shapeSchema = {},
  }: ObjectSchemaOptions) {
    super({
      baseValidator,
      validators,
      meta,
    })

    this.shapeSchema = shapeSchema
  }

  protected shapeSchema: ShapeSchema

  shape(schema: ShapeSchema): this {
    this.shapeSchema = schema

    return this
  }

  validate(value: unknown): ValidationResult {
    const basicValidation = this.runBasicValidation(value)

    if (!basicValidation.hasPassed) {
      return createValidationResult(basicValidation.errors)
    }

    const { castedValue, errors } = basicValidation

    for (const field in this.shapeSchema) {
      const schema = this.shapeSchema[field]

      const { isValid, errors: fieldErrors } = schema.validate(
        castedValue[field]
      )

      if (isValid) continue

      const normalizedFieldErrors: ValidationError[] = normalizeNestedErrors(
        field,
        fieldErrors
      )

      errors.push(...normalizedFieldErrors)
    }

    return createValidationResult(errors)
  }

  clone(): ObjectSchema {
    return new ObjectSchema({
      baseValidator: cloneValidator(this.baseValidator),
      validators: cloneValidators<Record<string, unknown>>(this.validators),
      meta: cloneMeta(this.meta),
      shapeSchema: cloneShapeSchema(this.shapeSchema),
    })
  }
}
