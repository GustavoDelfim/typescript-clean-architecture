import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { UserData } from '@/entities/user'
import { RegisterUserOnMailingList } from '@/usecases'
import { UseCase, UserRepository } from '@/usecases/ports'
import { MissingParamError } from '@/web-controllers/errors/missing-param-error'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { RegisterUserController } from '@/web-controllers/register-user-controller'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repository/in-memory-user-repository'
import { ErrorThrwoingUseCaseStub } from './error-throwing-usecase-stub'

describe('Sign Up web controller', () => {
  const users: UserData[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const usecase: UseCase = new RegisterUserOnMailingList(repo)
  const controller: RegisterUserController = new RegisterUserController(usecase)

  test('should return status code 201 when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Gustavo Delfim',
        email: 'gusttavodelfim@gmail.com'
      }
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.body).toEqual(request.body)
    expect(response.statusCode).toEqual(201)
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
    const usecaseWithServerError: UseCase = new ErrorThrwoingUseCaseStub(repo)
    const controllerWithError: RegisterUserController = new RegisterUserController(usecaseWithServerError)
    const response: HttpResponse = await controllerWithError.handle(request)
    expect(response.body).toBeInstanceOf(Error)
    expect(response.statusCode).toEqual(500)
  })
})
