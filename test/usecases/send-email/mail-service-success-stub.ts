import { Either, right } from '@/shared'
import { MailServiceError } from '@/usecases/errors/mail-service-error'
import { EmailOptions, EmailService } from '@/usecases/send-email/posts/email-service'

export class MailServiceSuccessStub implements EmailService {
  public async send (options: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
    return right(options)
  }
}
