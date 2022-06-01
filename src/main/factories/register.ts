import { RegisterUserController } from '@/web-controllers'
import { WebController } from '@/web-controllers/ports'
import { RegisterUserOnMailingList } from '@/usecases'
import { MongodbUserRepository } from '@/external/repositories/mongodb'
import { SendEmail } from '@/usecases/send-email'
import { RegisterAndSendEmail } from '@/usecases/register-and-send-email/register-end-send-email'
import { NodemailerEmailService } from '@/external/main-services'
import { getEmailOptions } from '@/main/config/email'

export const makeRegisterAndSendEmailUserController = (): WebController => {
  const userRepository = new MongodbUserRepository()
  const registerUseCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(userRepository)

  const mailService = new NodemailerEmailService()
  const sendEmailUseCase = new SendEmail(getEmailOptions(), mailService)

  const registerAndSendEmailUseCase: RegisterAndSendEmail = new RegisterAndSendEmail(registerUseCase, sendEmailUseCase)

  return new RegisterUserController(registerAndSendEmailUseCase)
}
