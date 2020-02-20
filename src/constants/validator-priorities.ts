import { ValidatorCode } from '@app/types'

export const VALIDATOR_PRIORITIES: Record<ValidatorCode, number> = {
  'mixed': 1000,

  'object': 1000,

  'array': 1000,
  'array/min': 900,
  'array/max': 900,
  'array/unique': 900,

  'number': 1000,
  'number/finite': 900,
  'number/integer': 900,
  'number/float': 900,
  'number/min': 900,
  'number/max': 900,
  'number/less-than': 900,
  'number/greater-than': 900,
  'number/positive': 900,
  'number/negative': 900,

  'string': 1000,
  'string/length': 900,
  'string/min': 900,
  'string/max': 900,
  'string/matches': 900,
  'string/email': 900,
  'string/url': 900,
  'string/trimmed': 900,
  'string/uppercased': 900,
  'string/lowercased': 900,

  'boolean': 1000,
  'date': 1000,
}
