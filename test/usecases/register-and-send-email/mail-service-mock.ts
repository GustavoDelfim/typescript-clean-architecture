import { Either, right } from '@/shared'
import { MailServiceError } from '@/usecases/errors/mail-service-error'
import { EmailOptions, EmailService } from '@/usecases/send-email/posts/email-service'

export class MailServiceMock implements EmailService {
  public timesSenWasCalled = 0

  public async send (options: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
    this.timesSenWasCalled++
    return right(options)
  }
}
