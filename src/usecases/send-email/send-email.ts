import { User } from '@/entities/user'
import { Either } from '@/shared'
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

  public async perform (user: User):
  Promise<
    Either<
      MailServiceError,
      EmailOptions
    >
  > {
    const greetings = `E aí <b>${user.name.value}</b>, beleza?`
    const customizeHtml = `${greetings} <br /><br /> ${this.options.html}`

    const emailInfo: EmailOptions = {
      ...this.options,
      to: `${user.name.value} <${user.email.value}>`,
      html: customizeHtml
    }

    return this.service.send(emailInfo)
  }
}
