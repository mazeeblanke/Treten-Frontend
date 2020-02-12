import { transformArray } from './transformArray'
import { users } from '../mocks/user'

describe('transformArray', () => {
  it('transforms the data using `id` when no key is specified', () => {
    const { all, byIds } = transformArray(users)
    expect(byIds.length).toBe(users.length)
    expect(Object.keys(all).map(k => +k).sort()).toEqual(byIds.sort())
    expect(all[byIds[0]].id).toEqual(byIds[0])
  })
  it('transforms the data using specified key', () => {
    const { all, byIds } = transformArray(users, 'firstName')
    expect(byIds.length).toBe(users.length)
    expect(Object.keys(all)).toEqual(byIds)
    expect(all[byIds[0]].firstName).toEqual(byIds[0])
  })
})
