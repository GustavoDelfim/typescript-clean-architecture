import { UserData } from '@/entities/user'
import { RegisterUserOnMailingList } from '@/usecases'
import { UserRepository } from '@/usecases/ports'
import { RegisterAndSendEmail } from '@/usecases/register-and-send-email/register-end-send-email'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repository/in-memory-user-repository'
import { SendEmail } from '@/usecases/send-email'
import { EmailOptions } from '@/usecases/send-email/posts/email-service'
import { MailServiceMock } from './mail-service-mock'

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

describe('Register and send e-mail use case', () => {
  test('should add user with complete data to maling list', async () => {
    const users: UserData[] = []
    const userRepo: UserRepository = new InMemoryUserRepository(users)
    const registerUseCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(userRepo)

    const mailServiceMock = new MailServiceMock()
    const sendEmailUseCase = new SendEmail(mailOptions, mailServiceMock)

    const registerAndSendEmailUseCase: RegisterAndSendEmail = new RegisterAndSendEmail(registerUseCase, sendEmailUseCase)

    const name = 'Gustavo'
    const email = 'gusttavodelfim@gmail.com'

    const { value } = await registerAndSendEmailUseCase.perform({ name, email })
    const response = value as UserData
    expect(response.name).toBe(name)
    expect(response.email).toBe(email)

    const user = await userRepo.findUserByEmail(email)
    expect(user?.name).toBe(name)

    expect(mailServiceMock.timesSenWasCalled).toEqual(1)
  })

  test('should not add user with invalid Email to mailing list', async () => {
    const users: UserData[] = []
    const userRepo: UserRepository = new InMemoryUserRepository(users)
    const registerUseCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(userRepo)

    const mailServiceMock = new MailServiceMock()
    const sendEmailUseCase = new SendEmail(mailOptions, mailServiceMock)

    const registerAndSendEmailUseCase: RegisterAndSendEmail =
      new RegisterAndSendEmail(registerUseCase, sendEmailUseCase)

    const name = 'Gustavo'
    const email = 'INVALID_EMAIL'

    const response = (await registerAndSendEmailUseCase.perform({ name, email })).value as Error
    const user = await userRepo.findUserByEmail(email)

    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidEmailError')
  })

  test('should not add user with invalid Name to mailing list', async () => {
    const users: UserData[] = []
    const userRepo: UserRepository = new InMemoryUserRepository(users)
    const registerUseCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(userRepo)

    const mailServiceMock = new MailServiceMock()
    const sendEmailUseCase = new SendEmail(mailOptions, mailServiceMock)

    const registerAndSendEmailUseCase: RegisterAndSendEmail =
      new RegisterAndSendEmail(registerUseCase, sendEmailUseCase)

    const name = ''
    const email = 'gusttavodelfim@gmail.com'

    const response = (await registerAndSendEmailUseCase.perform({ name, email })).value as Error
    const user = await userRepo.findUserByEmail(email)

    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidNameError')
  })
})
