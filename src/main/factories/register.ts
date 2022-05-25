import { RegisterUserController } from '@/web-controllers'
import { RegisterUserOnMailingList } from '@/usecases'
import { InMemoryUserRepository } from '@test/usecases/register-user-on-mailing-list/repository/in-memory-user-repository'

export const makeRegisterUserController = (): RegisterUserController => {
  const inMemoryUserRepository = new InMemoryUserRepository([])
  const registerUserOnMailingListUseCase = new RegisterUserOnMailingList(inMemoryUserRepository)
  return new RegisterUserController(registerUserOnMailingListUseCase)
}
