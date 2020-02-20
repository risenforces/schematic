import { Validator } from '@app/types'
import { PrimitiveSchema } from './primitive.schema'

describe('PrimitiveSchema', () => {
  describe('validate', () => {
    test('required', () => {
      let schema: PrimitiveSchema

      const baseValidator = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate: (value: any) => value === 1,
        code: '1',
        message: '1',
      }

      schema = new PrimitiveSchema({
        baseValidator: baseValidator as Validator,
      }).required()

      expect(schema.validate(undefined)).toEqual({
        isValid: false,
        errors: [{ code: 'required', message: 'Value is required' }],
      })

      expect(schema.validate(null)).toEqual({
        isValid: false,
        errors: [{ code: 'required', message: 'Value is required' }],
      })

      expect(schema.validate(1).isValid).toBe(true)

      schema = new PrimitiveSchema({
        baseValidator: baseValidator as Validator,
      })

      expect(schema.validate(undefined).isValid).toBe(true)
      expect(schema.validate(null).isValid).toBe(true)
      expect(schema.validate(1).isValid).toBe(true)
    })

    test('validators', () => {
      const baseValidator = {
        validate: () => true,
        code: '',
        message: '',
      }

      const validators = [
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
        },
      ]

      const schema = new PrimitiveSchema({
        baseValidator: baseValidator as Validator,
        validators: validators as Validator[],
      })

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
