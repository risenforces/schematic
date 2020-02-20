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
import { runValidators } from '@app/lib/run-validators'
import { runRequiredCheck } from '@app/lib/run-required-check'
import { normalizeNestedErrors } from '@app/lib/normalize-nested-errors'
import { runValidator } from '@app/lib/run-validator'
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
    const requiredCheck = runRequiredCheck(value, this.meta.required)

    if (!requiredCheck.hasPassed) {
      return createValidationResult(requiredCheck.errors)
    }

    /* First, run base validator */

    const baseValidation = runValidator(value, this.baseValidator)

    if (!baseValidation.isValid) {
      return createValidationResult([baseValidation.error])
    }

    /* Second, process validators for the current schema */

    const { errors } = runValidators(value, this.validators)

    /* Everything is alright, we can get to the shape schema validation */

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
