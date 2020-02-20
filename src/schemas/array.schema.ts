import { arrayValidators } from '@app/validators'
import { ValidationResult, ValidationError, SchematicSchema } from '@app/types'
import { createValidationResult } from '@app/lib/create-validation-result'
import { cloneValidators, cloneMeta, cloneValidator } from '@app/lib/clone'
import { runValidators } from '@app/lib/run-validators'
import { runRequiredCheck } from '@app/lib/run-required-check'
import { normalizeNestedErrors } from '@app/lib/normalize-nested-errors'
import { runValidator } from '@app/lib/run-validator'
import { BaseSchema } from './base.schema'
import { ArraySchemaOptions } from './types'

export class ArraySchema extends BaseSchema implements SchematicSchema {
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

  membersSchema?: SchematicSchema

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

    /* Everything is alright, we can get to the members schema validation */

    for (let i = 0; i < value.length; i++) {
      const item = value[i]

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
      validators: cloneValidators(this.validators),
      meta: cloneMeta(this.meta),
      membersSchema: this.membersSchema?.clone(),
    })
  }
}
