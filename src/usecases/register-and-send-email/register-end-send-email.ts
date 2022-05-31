import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { UserData, User } from '@/entities/user'
import { Either, left, right } from '@/shared'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list/register-user-on-mailing-list'
import { MailServiceError } from '../errors/mail-service-error'
import { UseCase } from '../ports'
import { SendEmail } from '../send-email'

export class RegisterAndSendEmail implements UseCase {
  private readonly registerUserOnMailingList: RegisterUserOnMailingList
  private readonly sendEmail: SendEmail

  constructor (registerUserOnMailingList: RegisterUserOnMailingList, sendEmail: SendEmail) {
    this.registerUserOnMailingList = registerUserOnMailingList
    this.sendEmail = sendEmail
  }

  public async perform (userData: UserData): Promise<
    Either<
      InvalidNameError | InvalidEmailError | MailServiceError,
      UserData
    >
  > {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> =
      User.create(userData)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    await this.registerUserOnMailingList.perform(userOrError.value)
    const result = await this.sendEmail.perform(userData)

    if (result.isLeft()) {
      left(result.value)
    }

    return right(userData)
  }
}
