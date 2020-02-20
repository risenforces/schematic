/* eslint-disable dot-notation */

import { NumberSchema } from './number.schema'

describe('NumberSchema', () => {
  test('clone', () => {
    const schema = new NumberSchema({})
      .message('number')
      .message('required')
      .min(0)
      .message('min')
      .max(100)
      .message('max')
      .integer()
      .message('integer')
      .required()

    const clonedSchema = schema.clone()

    expect(clonedSchema['validators']).toEqual(schema['validators'])
    expect(clonedSchema['meta']).toEqual(schema['meta'])
  })
})
