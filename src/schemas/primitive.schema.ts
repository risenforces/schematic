import { ValidationResult } from '@app/types'
import { cloneValidators, cloneMeta, cloneValidator } from '@app/lib/clone'
import { createValidationResult } from '@app/lib/create-validation-result'
import { BaseSchema } from './base.schema'
import { BaseSchemaOptions } from './types'

type SchemaClassType<I> = new (options: BaseSchemaOptions) => I

export class PrimitiveSchema extends BaseSchema {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(value: any): ValidationResult {
    const { errors } = this.runBasicValidation(value)

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
