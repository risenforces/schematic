import { Validator } from '@app/types'
import { VALIDATOR_PRIORITIES } from '@app/constants/validator-priorities'

function getPriority(validator: Validator): number {
  return VALIDATOR_PRIORITIES[validator.code]
}

export function sortValidators(validators: Validator[]): Validator[] {
  return validators.sort((validatorA, validatorB) => {
    return getPriority(validatorB) - getPriority(validatorA)
  })
}
