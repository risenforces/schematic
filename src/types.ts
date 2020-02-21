export interface SchematicSchema {
  validate: (value: unknown) => ValidationResult
  clone: () => SchematicSchema
}

export type ValidatorCode =
  | 'mixed'
  | 'object'
  | 'array'
  | 'array/min'
  | 'array/max'
  | 'array/unique'
  | 'number'
  | 'number/finite'
  | 'number/integer'
  | 'number/float'
  | 'number/min'
  | 'number/max'
  | 'number/less-than'
  | 'number/greater-than'
  | 'number/positive'
  | 'number/negative'
  | 'string'
  | 'string/length'
  | 'string/min'
  | 'string/max'
  | 'string/matches'
  | 'string/email'
  | 'string/url'
  | 'string/trimmed'
  | 'string/uppercased'
  | 'string/lowercased'
  | 'boolean'
  | 'date'

export interface Validator<V = unknown> {
  validate: (value: V) => boolean
  code: ValidatorCode
  message: string
}

// export type BaseValidator = Validator<unknown>

export interface BaseValidator<V> {
  validate: (value: unknown) => value is V
  code: ValidatorCode
  message: string
}

export interface Modifier {
  modify: (validators: Validator[]) => Validator[]
}

export interface ValidationError {
  path?: string
  code: 'required' | ValidatorCode
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

export type ShapeSchema = Record<string, SchematicSchema>
