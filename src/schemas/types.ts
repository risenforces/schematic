import { Validator, ShapeSchema, SchematicSchema } from '@app/types'

export interface BaseSchemaOptions {
  baseValidator: Validator
  validators?: Validator[]
  meta?: Meta
}

export interface SpecificPrimitiveSchemaOptions {
  baseValidator?: Validator
  validators?: Validator[]
  meta?: Meta
}

export type ObjectSchemaOptions = SpecificPrimitiveSchemaOptions & {
  shapeSchema?: ShapeSchema
}

export type ArraySchemaOptions = SpecificPrimitiveSchemaOptions & {
  membersSchema?: SchematicSchema
}

export interface Meta {
  required: boolean
}
