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

  test('should not accept local part larger than 64 chars', () => {
    const email: string = `${'g'.repeat(65)}@gmail.com`
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept strings larger than 320 chars', () => {
    const email: string = `gusttavodelfim@${'gmail'.repeat(100)}.com`
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept domain larger than 255 chars', () => {
    const email: string = `gusttavodelfim@${'gmail'.repeat(52)}.com`
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty local part', () => {
    const email: string = '@gmail.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})
