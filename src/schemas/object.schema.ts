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

export class ObjectSchema extends BaseSchema implements SchematicSchema {
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

  shapeSchema: ShapeSchema

  shape(schema: ShapeSchema): this {
    this.shapeSchema = schema

    return this
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(value: any): ValidationResult {
    const { hasPassed, errors } = this.runBasicValidation(value)

    if (!hasPassed) {
      return createValidationResult(errors)
    }

    for (const field in this.shapeSchema) {
      const schema = this.shapeSchema[field]

      const { isValid, errors: fieldErrors } = schema.validate(value[field])

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
      validators: cloneValidators(this.validators),
      meta: cloneMeta(this.meta),
      shapeSchema: cloneShapeSchema(this.shapeSchema),
    })
  }
}
