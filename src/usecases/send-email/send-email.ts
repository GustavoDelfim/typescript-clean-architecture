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
    const emailInfo: EmailOptions = {
      ...this.options,
      to: `${userData.name} <${userData.email}>`
    }

    return this.service.send(emailInfo)
  }
}
