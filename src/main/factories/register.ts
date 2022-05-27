import { RegisterUserController } from '@/web-controllers'
import { WebController } from '@/web-controllers/ports'
import { RegisterUserOnMailingList } from '@/usecases'
import { MongodbUserRepository } from '@/external/repositories/mongodb'

export const makeRegisterUserController = (): WebController => {
  const userRepository = new MongodbUserRepository()
  const registerUserOnMailingListUseCase = new RegisterUserOnMailingList(userRepository)
  return new RegisterUserController(registerUserOnMailingListUseCase)
}
