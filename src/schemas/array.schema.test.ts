/* eslint-disable dot-notation */

import { NumberSchema } from './number.schema'
import { ArraySchema } from './array.schema'

describe('ArraySchema', () => {
  let schema: ArraySchema

  beforeEach(() => {
    schema = new ArraySchema({})
  })

  test('of', () => {
    expect(schema['membersSchema']).toBeUndefined()

    const membersSchema = new NumberSchema({})

    schema.of(membersSchema)

    expect(schema['membersSchema']).toEqual(membersSchema)
  })

  describe('validate', () => {
    test('empty of', () => {
      expect(schema.validate(undefined)).toEqual({ isValid: true, errors: [] })
      expect(schema.validate(null)).toEqual({ isValid: true, errors: [] })

      expect(schema.validate(123)).toEqual({
        isValid: false,
        errors: [
          {
            code: 'array',
            message: 'Value must be an array',
          },
        ],
      })

      expect(schema.validate([])).toEqual({ isValid: true, errors: [] })
    })

    test('1 level nesting', () => {
      schema.of(new NumberSchema({}).integer())

      expect(schema.validate(undefined)).toEqual({ isValid: true, errors: [] })
      expect(schema.validate(null)).toEqual({ isValid: true, errors: [] })

      expect(schema.validate(123)).toEqual({
        isValid: false,
        errors: [
          {
            code: 'array',
            message: 'Value must be an array',
          },
        ],
      })

      expect(schema.validate([])).toEqual({ isValid: true, errors: [] })

      expect(schema.validate(['string'])).toEqual({
        isValid: false,
        errors: [
          {
            path: '0',
            code: 'number',
            message: 'Value must be a number',
          },
        ],
      })

      expect(schema.validate([Math.PI])).toEqual({
        isValid: false,
        errors: [
          {
            path: '0',
            code: 'number/integer',
            message: 'Value must be an integer',
          },
        ],
      })

      expect(schema.validate([Math.PI, {}])).toEqual({
        isValid: false,
        errors: [
          {
            path: '0',
            code: 'number/integer',
            message: 'Value must be an integer',
          },
          {
            path: '1',
            code: 'number',
            message: 'Value must be a number',
          },
        ],
      })
    })
  })
})
