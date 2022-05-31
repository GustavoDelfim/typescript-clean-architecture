import { User } from '@/entities'
import { UserData } from '@/entities/user'
import { UserRepository, UseCase } from '@/usecases/ports'

export class RegisterUserOnMailingList implements UseCase {
  private readonly userRepo: UserRepository

  constructor (userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  public async perform (user: User): Promise<UserData> {
    const userData: UserData = {
      name: user.name.value,
      email: user.email.value
    }

    if (!(await this.userRepo.exists(userData))) {
      await this.userRepo.add(userData)
    }

    return userData
  }
}
