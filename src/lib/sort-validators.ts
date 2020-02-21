import { Validator } from '@app/types'
import { VALIDATOR_PRIORITIES } from '@app/constants/validator-priorities'

function getPriority<V>(validator: Validator<V>): number {
  return VALIDATOR_PRIORITIES[validator.code]
}

export function sortValidators<V>(validators: Validator<V>[]): Validator<V>[] {
  return validators.sort((validatorA, validatorB) => {
    return getPriority(validatorB) - getPriority(validatorA)
  })
}
