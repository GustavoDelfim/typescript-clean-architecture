import { UseCase, UserRepository } from '@/usecases/ports'

export class ErrorThrwoingUseCaseStub implements UseCase {
  private readonly userRepo: UserRepository

  constructor (userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  public async perform (request: any): Promise<void> {
    throw Error()
  }
}
