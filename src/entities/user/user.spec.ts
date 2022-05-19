import { left } from '../../shared/either'
import { InvalidEmailError } from '../errors/invalid-email-error'
import { InvalidNameError } from '../errors/invalid-name-error'
import { User } from './user'

describe('User domain entity', () => {
  test('should not create user with invalid e-email adresss', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'Gustavo Delfim', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })

  test('should not create user with invalid name (too few characters)', () => {
    const invalidName = '0      '
    const error = User.create({
      name: invalidName,
      email: 'gusttavodelfim@gmail.com'
    })
    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should not create user with invalid name (too many characters)', () => {
    const invalidName = '0'.repeat(257)
    const error = User.create({
      name: invalidName,
      email: 'gusttavodelfim@gmail.com'
    })
    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should create user with valid data', () => {
    const validUser = {
      name: 'Gustavo Delfim',
      email: 'gusttavodelfim@gmail.com'
    }
    const user = User.create(validUser).value as User
    expect(user.name.value).toBe(validUser.name)
    expect(user.email.value).toBe(validUser.email)
  })
})
