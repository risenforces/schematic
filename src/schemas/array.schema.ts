import { arrayValidators } from '@app/validators'
import {
  Validator,
  ValidationResult,
  ValidationError,
  SchematicSchema,
} from '@app/types'
import { createValidationResult } from '@app/lib/create-validation-result'
import { cloneValidators, cloneMeta } from '@app/lib/clone'
import { runValidators } from '@app/lib/run-validators'
import { runRequiredCheck } from '@app/lib/run-required-check'
import { normalizeNestedErrors } from '@app/lib/normalize-nested-errors'
import { BaseSchema } from './base.schema'
import { Meta } from './types'

export class ArraySchema extends BaseSchema implements SchematicSchema {
  constructor(
    validators: Validator[] = [arrayValidators.array()],
    meta?: Meta,
    membersSchema?: SchematicSchema
  ) {
    super(validators, meta)

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

    /* First, process validators for the current schema */

    const { errors, passedValidatorsMap } = runValidators(
      value,
      this.validators
    )

    /* When "array" validator did not passed, we don't need to check value with shape schema */

    if (!passedValidatorsMap.has('array')) {
      return createValidationResult(errors)
    }

    /* Everything is alright, we can check it using the member schemas */

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
    const clonedValidators = cloneValidators(this.validators)
    const clonedMeta = cloneMeta(this.meta)

    return new ArraySchema(
      clonedValidators,
      clonedMeta,
      this.membersSchema?.clone()
    )
  }
}
