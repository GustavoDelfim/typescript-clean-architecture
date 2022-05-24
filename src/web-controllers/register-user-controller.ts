import { UserData } from "@/entities/user";
import { RegisterUserOnMailingList } from "@/usecases";
import { HttpRequest, HttpResponse } from "./ports";
import { badRequest, created } from "./util";

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList

  constructor (usecase: RegisterUserOnMailingList) {
    this.usecase = usecase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = request.body
    const response = await this.usecase.perform(userData)

    if (response.isRight()) {
      return created(response.value)
    }

    return badRequest(response.value)
  } 
}