import {
  Validator,
  ShapeSchema,
  SchematicSchema,
  BaseValidator,
} from '@app/types'
import { Meta } from '@app/schemas/types'

type AnyValidator<V> = Validator<V> | BaseValidator<V>

export function cloneValidator<V, T extends AnyValidator<V>>(validator: T): T {
  return Object.assign({}, validator)
}

export function cloneValidators<V, T extends Validator<V> = Validator<V>>(
  validators: T[]
): T[] {
  return validators.map(validator => cloneValidator<V, T>(validator))
}

export function cloneMeta(meta: Meta): Meta {
  return Object.assign({}, meta)
}

export function cloneShapeSchema(shapeSchema: ShapeSchema): ShapeSchema {
  const clonedShapeSchema: ShapeSchema = {}

  for (const field in shapeSchema) {
    const schema = shapeSchema[field]

    clonedShapeSchema[field] = schema.clone()
  }

  return clonedShapeSchema
}

export function cloneArrayMemberSchemas(
  arrayMemberSchemas: SchematicSchema[]
): SchematicSchema[] {
  return arrayMemberSchemas.map(schema => schema.clone())
}
