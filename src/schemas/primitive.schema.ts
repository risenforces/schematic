import { ValidationResult } from '@app/types'
import { cloneValidators, cloneMeta, cloneValidator } from '@app/lib/clone'
import { createValidationResult } from '@app/lib/create-validation-result'
import { runValidators } from '@app/lib/run-validators'
import { runRequiredCheck } from '@app/lib/run-required-check'
import { runValidator } from '@app/lib/run-validator'
import { BaseSchema } from './base.schema'
import { BaseSchemaOptions } from './types'

type SchemaClassType<I> = new (options: BaseSchemaOptions) => I

export class PrimitiveSchema extends BaseSchema {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(value: any): ValidationResult {
    const requiredCheck = runRequiredCheck(value, this.meta.required)

    if (!requiredCheck.hasPassed) {
      return createValidationResult(requiredCheck.errors)
    }

    const baseValidation = runValidator(value, this.baseValidator)

    if (!baseValidation.isValid) {
      return createValidationResult([baseValidation.error])
    }

    const { errors } = runValidators(value, this.validators)

    return createValidationResult(errors)
  }

  protected cloneWith<I extends BaseSchema, C extends SchemaClassType<I>>(
    SchemaClass: C
  ): I {
    return new SchemaClass({
      baseValidator: cloneValidator(this.baseValidator),
      validators: cloneValidators(this.validators),
      meta: cloneMeta(this.meta),
    })
  }
}
