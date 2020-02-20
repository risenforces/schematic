import { objectValidators } from '@app/validators'
import {
  Validator,
  ValidationResult,
  ValidationError,
  ShapeSchema,
  SchematicSchema,
} from '@app/types'
import { createValidationResult } from '@app/lib/create-validation-result'
import { cloneValidators, cloneMeta, cloneShapeSchema } from '@app/lib/clone'
import { runValidators } from '@app/lib/run-validators'
import { runRequiredCheck } from '@app/lib/run-required-check'
import { normalizeNestedErrors } from '@app/lib/normalize-nested-errors'
import { BaseSchema } from './base.schema'
import { Meta } from './types'

export class ObjectSchema extends BaseSchema implements SchematicSchema {
  constructor(
    validators: Validator[] = [objectValidators.object()],
    meta?: Meta,
    shapeSchema: ShapeSchema = {}
  ) {
    super(validators, meta)

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

    /* First, process validators for the current schema */

    const { errors, passedValidatorsMap } = runValidators(
      value,
      this.validators
    )

    /* When "object" validator did not passed, we don't need to check value with shape schema */

    if (!passedValidatorsMap.has('object')) {
      return createValidationResult(errors)
    }

    /* Everything is alright, we can check it using the shape schema */

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
    const clonedValidators = cloneValidators(this.validators)
    const clonedMeta = cloneMeta(this.meta)
    const clonedShapeSchema = cloneShapeSchema(this.shapeSchema)

    return new ObjectSchema(clonedValidators, clonedMeta, clonedShapeSchema)
  }
}
