import { Validator, ShapeSchema, SchematicSchema } from '@app/types'
import { Meta } from '@app/schemas/types'

export function cloneValidators(validators: Validator[]): Validator[] {
  return validators.map(validator => Object.assign({}, validator))
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
