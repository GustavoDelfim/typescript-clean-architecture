import { UserData, User } from '@/entities/user'
import { UserRepository } from '@/usecases/ports'
import { RegisterUserOnMailingList } from '@/usecases'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repository/in-memory-user-repository'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to maling list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)

    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'Gustavo'
    const email = 'gusttavodelfim@gmail.com'
    const user = User.create({ name, email }).value as User
    const response = await usecase.perform(user)

    expect(response.name).toBe(name)
    expect(response.email).toBe(email)

    const userFound = await repo.findUserByEmail(email)
    expect(userFound?.name).toBe(name)
  })
})
