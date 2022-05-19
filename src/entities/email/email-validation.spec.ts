import { Email } from './email'

describe('Email validateion', () => {
  test('should not accept empty strings', () => {
    const email: string = ''
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should accept valid email', () => {
    const email: string = 'gusttavodelfim@gmail.com'
    expect(Email.validate(email)).toBeTruthy()
  })

  test('should accept local part çarger than 64 chars', () => {
    const email: string = `${'g'.repeat(65)}@gmail.com`
    expect(Email.validate(email)).toBeFalsy()
  })
})
