import { convertToFormData } from './convertToFormData'
import { user } from '../mocks/user'

describe('convertToFormData', () => {
  describe('when a key is not ignored', () => {
    it('converts the supplied object to formdata', () => {
      const converted = convertToFormData(user)
      expect(converted.get('id')).toEqual(`${user.id}`)
      expect(converted.get('firstName')).toEqual(user.firstName)
    })
  })

  describe('when a key is ignored', () => {
    it('skips the key in the converted data', () => {
      const converted = convertToFormData(user, ['id'])
      expect(converted.get('id')).toBeNull()
      expect(converted.get('firstName')).toEqual(user.firstName)
    })
    it('skips multiple keys in the converted data', () => {
      const converted = convertToFormData(user, ['id', 'firstName'])
      expect(converted.get('id')).toBeNull()
      expect(converted.get('firstName')).toBeNull()
    })
  })
})
