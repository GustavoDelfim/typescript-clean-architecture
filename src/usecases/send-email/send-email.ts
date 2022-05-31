import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { UserData, User } from '@/entities/user'
import { Either, left } from '@/shared'
import { MailServiceError } from '../errors/mail-service-error'
import { UseCase } from '../ports'
import { EmailOptions, EmailService } from './posts/email-service'

export class SendEmail implements UseCase {
  private readonly options: EmailOptions
  private readonly service: EmailService

  constructor (options: EmailOptions, service: EmailService) {
    this.options = options
    this.service = service
  }

  public async perform (userData: UserData):
  Promise<
    Either<
      MailServiceError | InvalidNameError | InvalidEmailError,
      EmailOptions
    >
  > {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> =
      User.create(userData)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const greetings = `E aí <b>${userData.name}</b>, beleza?`
    const customizeHtml = `${greetings} <br /><br /> ${this.options.html}`

    const emailInfo: EmailOptions = {
      ...this.options,
      to: `${userData.name} <${userData.email}>`,
      html: customizeHtml
    }

    return this.service.send(emailInfo)
  }
}
