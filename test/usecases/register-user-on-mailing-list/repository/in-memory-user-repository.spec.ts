import { UserData } from '../../../../src/entities/user/user-data'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory User repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const sut = new InMemoryUserRepository(users)
    const user = await sut.findUserByEmail('gusttavodelfim@gmail.com')
    expect(user).toBeNull()
  })

  test('should return user if it is found in the repository', async () => {
    const users: UserData[] = []
    const name = 'Gustavo Delfim'
    const email = 'gusttavodelfim@gmail.com'
    const sut = new InMemoryUserRepository(users)
    await sut.add({ name, email })
    const user = await sut.findUserByEmail(email)
    expect(user?.name).toBe(name)
  })

  test('should return all users in the repository', async () => {
    const users: UserData[] = [
      { email: 'gusttavodelfim@gmail.com', name: 'Gustavo Delfim' },
      { email: 'any@example', name: 'Any Name' }
    ]
    const sut = new InMemoryUserRepository(users)
    const returnedUsers = await sut.findAllUsers()
    expect(returnedUsers.length).toBe(2)
  })
})
