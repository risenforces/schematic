import { Validator, ShapeSchema, SchematicSchema } from '@app/types'
import { Meta } from '@app/schemas/types'
import {
  cloneValidators,
  cloneMeta,
  cloneShapeSchema,
  cloneArrayMemberSchemas,
} from './clone'

describe('clone utils', () => {
  test('cloneValidators', () => {
    const validators = [
      { validate: () => true, code: 'first', message: 'first' },
      { validate: () => true, code: 'second', message: 'second' },
    ]

    const clonedValidators = cloneValidators(validators as Validator[])

    expect(clonedValidators).not.toBe(validators)
    expect(clonedValidators).toEqual(validators)

    for (let i = 0; i < clonedValidators.length; i++) {
      expect(clonedValidators[i]).not.toBe(validators[i])
    }
  })

  test('cloneMeta', () => {
    const meta = {
      required: true,
      something: false,
    }

    const clonedMeta = cloneMeta(meta as Meta)

    expect(clonedMeta).not.toBe(meta)
    expect(clonedMeta).toEqual(meta)
  })

  function createSchema(value: string): SchematicSchema {
    const schema = {
      clone: () => value,
    }

    return (schema as unknown) as SchematicSchema
  }

  test('cloneShapeSchema', () => {
    const shapeSchema = {
      first: createSchema('first'),
      second: createSchema('second'),
      third: createSchema('third'),
    }

    const clonedShapeSchema = cloneShapeSchema(shapeSchema as ShapeSchema)

    expect(clonedShapeSchema).not.toBe(shapeSchema)

    expect(clonedShapeSchema).toEqual({
      first: 'first',
      second: 'second',
      third: 'third',
    })
  })

  test('cloneArrayMemberSchemas', () => {
    const arrayMemberSchemas = [
      createSchema('first'),
      createSchema('second'),
      createSchema('third'),
    ]

    const clonedArrayMemberSchemas = cloneArrayMemberSchemas(
      arrayMemberSchemas as SchematicSchema[]
    )

    expect(clonedArrayMemberSchemas).not.toBe(arrayMemberSchemas)

    expect(clonedArrayMemberSchemas).toEqual(['first', 'second', 'third'])
  })
})
