import { UserData } from "@/entities/user";
import { left } from "@/shared";
import { RegisterUserOnMailingList } from "@/usecases";
import { MissingParamError } from "./errors/missing-param-error";
import { HttpRequest, HttpResponse } from "./ports";
import { badRequest, created, serverError } from "./util";

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList

  constructor (usecase: RegisterUserOnMailingList) {
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