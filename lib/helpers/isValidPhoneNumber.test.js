import { isValidPhoneNumber } from './isValidPhoneNumber'

describe('isValidPhoneNumber', () => {
  it('returns true if supplied a valid phone number', () => {
    // expect(isValidPhoneNumber('08030722387')).toBeTruthy()
    expect(isValidPhoneNumber('+2348030722387')).toBeTruthy()
    expect(isValidPhoneNumber('+2347030722387')).toBeTruthy()
  })
  it('returns false if supplied an invalid phone number', () => {
    expect(isValidPhoneNumber('0803072237')).toBeFalsy()
    expect(isValidPhoneNumber('+234803072387')).toBeFalsy()
    expect(isValidPhoneNumber('+234703072387')).toBeFalsy()
  })
})
