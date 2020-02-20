import { Validator } from '@app/types'
import { PrimitiveSchema } from './primitive.schema'

describe('PrimitiveSchema', () => {
  describe('validate', () => {
    test('required', () => {
      let schema: PrimitiveSchema

      schema = new PrimitiveSchema([]).required()

      expect(schema.validate(undefined)).toEqual({
        isValid: false,
        errors: [{ code: 'required', message: 'Value is required' }],
      })

      expect(schema.validate(null)).toEqual({
        isValid: false,
        errors: [{ code: 'required', message: 'Value is required' }],
      })

      expect(schema.validate(1).isValid).toBe(true)

      schema = new PrimitiveSchema([])

      expect(schema.validate(undefined).isValid).toBe(true)
      expect(schema.validate(null).isValid).toBe(true)
      expect(schema.validate(1).isValid).toBe(true)
    })

    test('validators', () => {
      const mockValidators = [
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          validate: (value: any) => value === 'pass',
          code: 'hello',
          message: 'Hello',
        },
        {
          validate: () => true,
          code: 'hello2',
          message: 'Hello2',
          requires: ['hello'],
        },
      ]

      const schema = new PrimitiveSchema(mockValidators as Validator[])

      expect(schema.validate('value')).toEqual({
        isValid: false,
        errors: [{ code: 'hello', message: 'Hello' }],
      })

      expect(schema.validate('pass')).toEqual({
        isValid: true,
        errors: [],
      })
    })
  })
})
