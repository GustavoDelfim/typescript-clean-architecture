import { User } from './user'

describe('User domain entity', () => {
  test('should not create user with invalid e-email adresss', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'Gustavo Delfim', email: invalidEmail }).value as Error
    expect(error.name).toEqual('InvalidEmailError')
    expect(error.message).toEqual(`Invalid email: ${invalidEmail}.`)
  })

  test('should not create user with invalid name (too few characters)', () => {
    const invalidName = '0      '
    const userData = {
      name: invalidName,
      email: 'gusttavodelfim@gmail.com'
    }
    const error = User.create(userData).value as Error

    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual(`Invalid name: ${userData.name}.`)
  })

  test('should not create user with invalid name (too many characters)', () => {
    const invalidName = '0'.repeat(257)
    const userData = {
      name: invalidName,
      email: 'gusttavodelfim@gmail.com'
    }
    const error = User.create(userData).value as Error

    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual(`Invalid name: ${userData.name}.`)
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
