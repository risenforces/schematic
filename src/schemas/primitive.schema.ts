import { ValidationResult } from '@app/types'
import { cloneValidators, cloneMeta, cloneValidator } from '@app/lib/clone'
import { createValidationResult } from '@app/lib/create-validation-result'
import { BaseSchema } from './base.schema'
import { SpecificPrimitiveSchemaOptions } from './types'

export class PrimitiveSchema<V> extends BaseSchema<V> {
  validate(value: unknown): ValidationResult {
    const { errors } = this.runBasicValidation(value)

    return createValidationResult(errors)
  }

  protected cloneWith<
    I extends PrimitiveSchema<V>,
    C extends new (options: SpecificPrimitiveSchemaOptions<V>) => I
  >(SchemaClass: C): I {
    return new SchemaClass({
      baseValidator: cloneValidator(this.baseValidator),
      validators: cloneValidators<V>(this.validators),
      meta: cloneMeta(this.meta),
    })
  }
}
