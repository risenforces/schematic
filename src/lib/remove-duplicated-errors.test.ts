import { ValidationError } from '@app/types'
import { removeDuplicatedErrors } from './remove-duplicated-errors'

test('removeDuplicatedErrors', () => {
  const errors = [
    { path: 'path1', code: 'code1', message: 'message1' },
    { code: 'code1', message: 'message1' },
    { path: 'path2', code: 'code1', message: 'message1' },
    { path: 'path1', code: 'code2', message: 'message1' },
    { path: 'path1', code: 'code1', message: 'message2' },
    { code: 'code1', message: 'message1' },
    { path: 'path1', code: 'code1', message: 'message1' },
    { path: 'path2', code: 'code1', message: 'message1' },
    { path: 'path2', code: 'code2', message: 'message8' },
  ]

  expect(removeDuplicatedErrors(errors as ValidationError[])).toEqual([
    { path: 'path1', code: 'code1', message: 'message1' },
    { code: 'code1', message: 'message1' },
    { path: 'path2', code: 'code1', message: 'message1' },
    { path: 'path1', code: 'code2', message: 'message1' },
    { path: 'path1', code: 'code1', message: 'message2' },
    { path: 'path2', code: 'code2', message: 'message8' },
  ])
})
