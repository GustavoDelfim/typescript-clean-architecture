import { UserData } from '@/entities/user'
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

  public async perform (userData: UserData): Promise<Either<MailServiceError, EmailOptions>> {
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
