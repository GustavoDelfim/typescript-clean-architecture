import { UserData } from '@/entities/user'
import { UseCase } from '@/usecases/ports'
import { MissingParamError } from './errors/missing-param-error'
import { HttpRequest, HttpResponse, WebController } from './ports'
import { badRequest, created, serverError } from './util'

export class RegisterUserController implements WebController {
  private readonly usecase: UseCase

  constructor (usecase: UseCase) {
    this.usecase = usecase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    const { body } = request

    try {
      const missingParam = []
      if (!body.name) missingParam.push('name')
      if (!body.email) missingParam.push('email')

      if (missingParam.length) {
        return badRequest(new MissingParamError(missingParam.join(', ')))
      }

      const userData: UserData = body
      const response = await this.usecase.perform(userData)

      if (response.isLeft()) {
        return badRequest(response.value)
      }

      return created(response.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
