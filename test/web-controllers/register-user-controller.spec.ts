import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { UserData } from '@/entities/user'
import { RegisterUserOnMailingList } from '@/usecases'
import { UseCase, UserRepository } from '@/usecases/ports'
import { MissingParamError } from '@/web-controllers/errors/missing-param-error'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { RegisterUserController } from '@/web-controllers/register-user-controller'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repository/in-memory-user-repository'
import { ErrorThrwoingUseCaseStub } from './error-throwing-usecase-stub'
import { MailServiceSuccessStub } from '@test/usecases/send-email/mail-service-success-stub'
import { EmailOptions } from '@/usecases/send-email/posts/email-service'
import { RegisterAndSendEmail } from '@/usecases/register-and-send-email/register-end-send-email'
import { SendEmail } from '@/usecases/send-email'

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

describe('Sign Up web controller', () => {
  const users: UserData[] = []
  const userRepo: UserRepository = new InMemoryUserRepository(users)
  const registerUseCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(userRepo)

  const mailServiceSuccess = new MailServiceSuccessStub()
  const sendEmailUseCase = new SendEmail(mailOptions, mailServiceSuccess)

  const registerAndSendEmailUseCase: RegisterAndSendEmail =
    new RegisterAndSendEmail(registerUseCase, sendEmailUseCase)

  const controller: RegisterUserController = new RegisterUserController(registerAndSendEmailUseCase)

  test('should return status code ok when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Gustavo Delfim',
        email: 'gusttavodelfim@gmail.com'
      }
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.body).toEqual(request.body)
    expect(response.statusCode).toEqual(200)
  })

  test('should return status code 400 when request contains ivalid name', async () => {
    const request: HttpRequest = {
      body: {
        name: 'G',
        email: 'gusttavodelfim@gmail.com'
      }
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.body).toBeInstanceOf(InvalidNameError)
    expect(response.statusCode).toEqual(400)
  })

  test('should return status code 400 when request contains ivalid email', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Gustavo Delfim',
        email: 'gusttavodelfim'
      }
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
    expect(response.statusCode).toEqual(400)
  })

  test('should return status code 400 when request is missing user name', async () => {
    const request: HttpRequest = {
      body: { email: 'gusttavodelfim' }
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name.')
    expect(response.statusCode).toEqual(400)
  })

  test('should return status code 400 when request is missing user email', async () => {
    const request: HttpRequest = {
      body: { name: 'Gustavo' }
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: email.')
    expect(response.statusCode).toEqual(400)
  })

  test('should return status code 400 when request is missing user empty', async () => {
    const request: HttpRequest = {
      body: {}
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name, email.')
    expect(response.statusCode).toEqual(400)
  })

  test('should return status code 500 when server raises', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Gustavo Delfim',
        email: 'gusttavodelfim'
      }
    }
    const usecaseWithServerError: UseCase = new ErrorThrwoingUseCaseStub(userRepo)
    const controllerWithError: RegisterUserController = new RegisterUserController(usecaseWithServerError)
    const response: HttpResponse = await controllerWithError.handle(request)
    expect(response.body).toBeInstanceOf(Error)
    expect(response.statusCode).toEqual(500)
  })
})
