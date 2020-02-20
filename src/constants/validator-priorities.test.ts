import { ValidatorCode } from '@app/types'
import { VALIDATOR_PRIORITIES } from './validator-priorities'

test('VALIDATOR_PRIORITIES', () => {
  for (const typeValidatorCode in VALIDATOR_PRIORITIES) {
    if (typeValidatorCode.includes('/')) continue

    for (const specificValidatorCode in VALIDATOR_PRIORITIES) {
      if (!specificValidatorCode.startsWith(typeValidatorCode + '/')) continue

      const typeValidatorPriority =
        VALIDATOR_PRIORITIES[typeValidatorCode as ValidatorCode]

      const specificValidatorPriority =
        VALIDATOR_PRIORITIES[specificValidatorCode as ValidatorCode]

      expect(typeValidatorPriority).toBeGreaterThan(specificValidatorPriority)
    }
  }
})
