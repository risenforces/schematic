import {
  Validator,
  ShapeSchema,
  SchematicSchema,
  BaseValidator,
} from '@app/types'

export interface BaseSchemaOptions<V> {
  baseValidator: BaseValidator<V>
  validators?: Validator<V>[]
  meta?: Meta
}

export interface SpecificPrimitiveSchemaOptions<V> {
  baseValidator?: BaseValidator<V>
  validators?: Validator<V>[]
  meta?: Meta
}

export type ObjectSchemaOptions = SpecificPrimitiveSchemaOptions<
  Record<string, unknown>
> & {
  shapeSchema?: ShapeSchema
}

export type ArraySchemaOptions = SpecificPrimitiveSchemaOptions<unknown[]> & {
  membersSchema?: SchematicSchema
}

export interface Meta {
  required: boolean
}
