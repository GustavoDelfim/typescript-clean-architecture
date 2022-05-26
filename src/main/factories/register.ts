import { RegisterUserController } from '@/web-controllers'
import { WebController } from '@/web-controllers/ports'
import { RegisterUserOnMailingList } from '@/usecases'
import { InMemoryUserRepository } from '@test/usecases/register-user-on-mailing-list/repository/in-memory-user-repository'

export const makeRegisterUserController = (): WebController => {
  const inMemoryUserRepository = new InMemoryUserRepository([])
  const registerUserOnMailingListUseCase = new RegisterUserOnMailingList(inMemoryUserRepository)
  return new RegisterUserController(registerUserOnMailingListUseCase)
}
