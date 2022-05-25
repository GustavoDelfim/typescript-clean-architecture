import { InvalidEmailError, InvalidNameError } from "@/entities/errors"
import { UserData } from "@/entities/user"
import { RegisterUserOnMailingList } from "@/usecases"
import { UseCase, UserRepository } from "@/usecases/ports"
import { MissingParamError } from "@/web-controllers/errors/missing-param-error"
import { HttpRequest, HttpResponse } from "@/web-controllers/ports"
import { RegisterUserController } from "@/web-controllers/register-user-controller"
import { InMemoryUserRepository } from "@test/usecases/register-user-on-mailing-list/repository/in-memory-user-repository"

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
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(request.body)
  })

  test('should return status code 400 when request contains ivalid name', async () => {
    const request: HttpRequest = {
      body: {
        name: 'G',
        email: 'gusttavodelfim@gmail.com'
      }
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  test('should return status code 400 when request contains ivalid email', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Gustavo Delfim',
        email: 'gusttavodelfim'
      }
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  test('should return status code 400 when request is missing user name', async () => {
    const request: HttpRequest = {
      body: { email: 'gusttavodelfim' }
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name.')
  })

  test('should return status code 400 when request is missing user email', async () => {
    const request: HttpRequest = {
      body: { name: 'Gustavo' }
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: email.')
  })

  test('should return status code 400 when request is missing user empty', async () => {
    const request: HttpRequest = {
      body: {}
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name, email.')
  })

  test('should return status code 500 when server raises', async () => {
    const request: HttpRequest = {
      body: {}
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})