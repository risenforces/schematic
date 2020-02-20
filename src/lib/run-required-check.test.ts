import { runRequiredCheck } from './run-required-check'

describe('runRequiredCheck', () => {
  describe('value == null', () => {
    it('should be not passed (but no errors)', () => {
      expect(runRequiredCheck(null, false)).toEqual({
        hasPassed: false,
        errors: [],
      })

      expect(runRequiredCheck(undefined, false)).toEqual({
        hasPassed: false,
        errors: [],
      })
    })

    it('should be not passed', () => {
      expect(runRequiredCheck(null, true)).toEqual({
        hasPassed: false,
        errors: [{ code: 'required', message: 'Value is required' }],
      })

      expect(runRequiredCheck(undefined, true)).toEqual({
        hasPassed: false,
        errors: [{ code: 'required', message: 'Value is required' }],
      })
    })
  })

  describe('value != null', () => {
    it('should always be passed', () => {
      const values = [
        NaN,
        1,
        '',
        'str',
        Infinity,
        {},
        [],
        new Date(),
        true,
        false,
      ]

      for (const value of values) {
        expect(runRequiredCheck(value, false)).toEqual({ hasPassed: true })
        expect(runRequiredCheck(value, true)).toEqual({ hasPassed: true })
      }
    })
  })
})
