import { InvalidEmailError } from '@/entities/errors'
import { Right } from '@/shared'
import { MailServiceError } from '@/usecases/errors/mail-service-error'
import { SendEmail } from '@/usecases/send-email'
import { EmailOptions } from '@/usecases/send-email/posts/email-service'
import { MailServiceErrorStub } from './mail-service-error-stub'
import { MailServiceSuccessStub } from './mail-service-success-stub'

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

describe('Send email to user', () => {
  test('should email user with valid name and email address', async () => {
    const emailServiceSuccessStub = new MailServiceSuccessStub()
    const useCase = new SendEmail(mailOptions, emailServiceSuccessStub)
    const response = await useCase.perform({
      name: toName,
      email: toEmail
    })
    expect(response).toBeInstanceOf(Right)
  })

  test('should not try to email with invalid email address', async () => {
    const emailServiceSuccessStub = new MailServiceSuccessStub()
    const useCase = new SendEmail(mailOptions, emailServiceSuccessStub)
    const response = await useCase.perform({
      name: toName,
      email: 'invalid_email'
    })
    expect(response.value).toBeInstanceOf(InvalidEmailError)
  })

  test('should return error wen email service fails', async () => {
    const emailServiceErrorStub = new MailServiceErrorStub()
    const useCase = new SendEmail(mailOptions, emailServiceErrorStub)
    const response = await useCase.perform({
      name: toName,
      email: toEmail
    })
    expect(response.value).toBeInstanceOf(MailServiceError)
  })
})
