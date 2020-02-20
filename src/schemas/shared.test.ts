import { getInitialMeta } from './shared'

describe('schemas shared', () => {
  test('getInitialMeta', () => {
    expect(getInitialMeta()).toEqual({
      required: false,
    })
  })
})
