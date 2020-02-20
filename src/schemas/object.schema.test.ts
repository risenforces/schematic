/* eslint-disable dot-notation */

import { ObjectSchema } from './object.schema'
import { NumberSchema } from './number.schema'

describe('ObjectSchema', () => {
  let schema: ObjectSchema

  beforeEach(() => {
    schema = new ObjectSchema()
  })

  test('shape', () => {
    expect(schema['shapeSchema']).toEqual({})

    const shapeSchema = {
      hello: new NumberSchema(),
    }

    schema.shape(shapeSchema)

    expect(schema['shapeSchema']).toBe(shapeSchema)
  })

  describe('validate', () => {
    test('empty shape', () => {
      expect(schema.validate(undefined)).toEqual({ isValid: true, errors: [] })
      expect(schema.validate(null)).toEqual({ isValid: true, errors: [] })

      expect(schema.validate(123)).toEqual({
        isValid: false,
        errors: [
          {
            code: 'object',
            message: 'Value must be an object',
          },
        ],
      })

      expect(schema.validate({})).toEqual({ isValid: true, errors: [] })
    })

    test('1 level nesting', () => {
      schema.shape({
        integer: new NumberSchema().integer().required(),
        float: new NumberSchema().float().required(),
      })

      expect(schema.validate(undefined)).toEqual({ isValid: true, errors: [] })
      expect(schema.validate(null)).toEqual({ isValid: true, errors: [] })

      expect(schema.validate(123)).toEqual({
        isValid: false,
        errors: [
          {
            code: 'object',
            message: 'Value must be an object',
          },
        ],
      })

      expect(schema.validate({})).toEqual({
        isValid: false,
        errors: [
          {
            path: 'integer',
            code: 'required',
            message: 'Value is required',
          },
          {
            path: 'float',
            code: 'required',
            message: 'Value is required',
          },
        ],
      })

      expect(
        schema.validate({
          integer: 'string',
          float: [],
        })
      ).toEqual({
        isValid: false,
        errors: [
          {
            path: 'integer',
            code: 'number',
            message: 'Value must be a number',
          },
          {
            path: 'float',
            code: 'number',
            message: 'Value must be a number',
          },
        ],
      })

      expect(
        schema.validate({
          integer: Math.PI,
          float: Math.PI,
        })
      ).toEqual({
        isValid: false,
        errors: [
          {
            path: 'integer',
            code: 'number/integer',
            message: 'Value must be an integer',
          },
        ],
      })

      expect(
        schema.validate({
          integer: 10,
          float: Math.PI,
        })
      ).toEqual({
        isValid: true,
        errors: [],
      })
    })

    test('2 level nesting', () => {
      schema.shape({
        nested: new ObjectSchema().shape({
          hello: new NumberSchema().positive().required(),
        }),
      })

      expect(schema.validate(123)).toEqual({
        isValid: false,
        errors: [
          {
            code: 'object',
            message: 'Value must be an object',
          },
        ],
      })

      expect(schema.validate(undefined)).toEqual({ isValid: true, errors: [] })
      expect(schema.validate(null)).toEqual({ isValid: true, errors: [] })

      expect(schema.validate({})).toEqual({
        isValid: true,
        errors: [],
      })

      expect(
        schema.validate({
          nested: 123,
        })
      ).toEqual({
        isValid: false,
        errors: [
          {
            path: 'nested',
            code: 'object',
            message: 'Value must be an object',
          },
        ],
      })

      expect(
        schema.validate({
          nested: {},
        })
      ).toEqual({
        isValid: false,
        errors: [
          {
            path: 'nested.hello',
            code: 'required',
            message: 'Value is required',
          },
        ],
      })

      expect(
        schema.validate({
          nested: {
            hello: -10,
          },
        })
      ).toEqual({
        isValid: false,
        errors: [
          {
            path: 'nested.hello',
            code: 'number/positive',
            message: 'Value must be a positive number',
          },
        ],
      })

      expect(
        schema.validate({
          nested: {
            hello: 10,
          },
        })
      ).toEqual({
        isValid: true,
        errors: [],
      })
    })

    test('3 level nesting', () => {
      schema.shape({
        nested: new ObjectSchema().shape({
          nested: new ObjectSchema().shape({
            hello: new NumberSchema().positive(),
          }),
        }),
      })

      expect(schema.validate({})).toEqual({ isValid: true, errors: [] })

      expect(schema.validate({ nested: {} })).toEqual({
        isValid: true,
        errors: [],
      })

      expect(
        schema.validate({
          nested: {
            nested: {},
          },
        })
      ).toEqual({
        isValid: true,
        errors: [],
      })

      expect(
        schema.validate({
          nested: {
            nested: {
              hello: -123,
            },
          },
        })
      ).toEqual({
        isValid: false,
        errors: [
          {
            path: 'nested.nested.hello',
            code: 'number/positive',
            message: 'Value must be a positive number',
          },
        ],
      })
    })
  })
})
