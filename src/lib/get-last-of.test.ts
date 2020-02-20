import { getLastOf } from './get-last-of'

test('getLastOf', () => {
  const array = [1, 2, 3]

  expect(getLastOf(array)).toBe(3)
})
