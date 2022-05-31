import { RegisterUserController } from '@/web-controllers'
import { WebController } from '@/web-controllers/ports'
import { RegisterUserOnMailingList } from '@/usecases'
import { MongodbUserRepository } from '@/external/repositories/mongodb'
import { SendEmail } from '@/usecases/send-email'
import { MailServiceSuccessStub } from '@test/usecases/send-email/mail-service-success-stub'
import { RegisterAndSendEmail } from '@/usecases/register-and-send-email/register-end-send-email'
import { EmailOptions } from '@/usecases/send-email/posts/email-service'

const attachmentFilePath = '../resources/text.txt'
const fromName = 'Test'
const fromEmail = 'from_email@email.com'
const toName = 'any_name'
const toEmail = 'any_email@email.com'
const subject = 'Test e-mail'
const emailbody = 'Hello word attachement test'
const emailBodyHtml = '<b>Hello word attachement test</b>'
const attachments = [{
  filename: attachmentFilePath,
  contentType: 'text/plain'
}]

const mailOptions: EmailOptions = {
  host: 'test',
  port: 867,
  username: 'test',
  password: 'test',
  from: `${fromName} ${fromEmail}`,
  to: `${toName} <${toEmail}>`,
  subject,
  text: emailbody,
  html: emailBodyHtml,
  attachments
}

export const makeRegisterUserController = (): WebController => {
  const userRepository = new MongodbUserRepository()
  const registerUseCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(userRepository)

  const mailServiceMock = new MailServiceSuccessStub()
  const sendEmailUseCase = new SendEmail(mailOptions, mailServiceMock)

  const registerAndSendEmailUseCase: RegisterAndSendEmail = new RegisterAndSendEmail(registerUseCase, sendEmailUseCase)

  return new RegisterUserController(registerAndSendEmailUseCase)
}
