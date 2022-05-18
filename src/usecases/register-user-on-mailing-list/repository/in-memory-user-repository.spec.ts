import { UserData } from '../user-data'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory User repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const userRepo = new InMemoryUserRepository(users)
    const user = await userRepo.findUserByEmail('gusttavodelfim@gmail.com')
    expect(user).toBeNull()
  })

  test('should return user if it is found in the repository', async () => {
    const users: UserData[] = []
    const name = 'Gustavo Delfim'
    const email = 'gusttavodelfim@gmail.com'
    const userRepo = new InMemoryUserRepository(users)
    await userRepo.add({ name, email })
    const user = await userRepo.findUserByEmail(email)
    expect(user?.name).toBe(name)
  })
})
