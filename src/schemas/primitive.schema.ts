import { ValidationResult, Validator } from '@app/types'
import { cloneValidators, cloneMeta } from '@app/lib/clone'
import { createValidationResult } from '@app/lib/create-validation-result'
import { runValidators } from '@app/lib/run-validators'
import { runRequiredCheck } from '@app/lib/run-required-check'
import { BaseSchema } from './base.schema'
import { Meta } from './types'

type SchemaClassType<I> = new (validators: Validator[], meta: Meta) => I

export class PrimitiveSchema extends BaseSchema {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(value: any): ValidationResult {
    const requiredCheck = runRequiredCheck(value, this.meta.required)

    if (!requiredCheck.hasPassed) {
      return createValidationResult(requiredCheck.errors)
    }

    const { errors } = runValidators(value, this.validators)

    return createValidationResult(errors)
  }

  protected cloneWith<I extends BaseSchema, C extends SchemaClassType<I>>(
    SchemaClass: C
  ): I {
    const clonedValidators = cloneValidators(this.validators)
    const clonedMeta = cloneMeta(this.meta)

    return new SchemaClass(clonedValidators, clonedMeta)
  }
}
