/* eslint-disable dot-notation */

import { Validator, BaseValidator } from '@app/types'
import { BaseSchema } from './base.schema'

describe('BaseSchema', () => {
  let schema: BaseSchema

  beforeEach(() => {
    schema = new BaseSchema({
      baseValidator: {} as BaseValidator<unknown>,
    })
  })

  describe('validators', () => {
    it('should have correct value after BaseSchema instantiation', () => {
      expect(schema['baseValidator']).toEqual({})
      expect(schema['validators']).toEqual([])
    })

    test('addValidator', () => {
      const validator = {} as Validator

      schema['addValidator'](validator)
      expect(schema['validators'].length).toBe(1)
      expect(schema['validators'][0]).toBe(validator)
    })

    test('message', () => {
      const firstValidator = { message: 'first' } as Validator
      const secondValidator = { message: 'second' } as Validator

      schema['addValidator']({ ...firstValidator })
      schema['addValidator']({ ...secondValidator })

      expect(schema['validators'][0].message).toBe('first')
      expect(schema['validators'][1].message).toBe('second')

      schema['message']('new message')

      expect(schema['validators'][0].message).toBe('first')
      expect(schema['validators'][1].message).toBe('new message')
    })
  })

  describe('meta', () => {
    it('should have correct value after BaseSchema instantiation', () => {
      expect(schema['meta']).toEqual({ required: false })
    })

    test('required', () => {
      schema['required']()
      expect(schema['meta'].required).toBe(true)

      schema['optional']()
      expect(schema['meta'].required).toBe(false)
    })
  })
})
