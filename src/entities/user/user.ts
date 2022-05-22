import { Either, left, right } from '@/shared/either'
import { Email } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { Name } from '@/entities/name'
import { UserData } from './user-data'

export class User {
  public readonly name: Name
  public readonly email: Email

  private constructor (name: Name, email: Email) {
    this.name = name
    this.email = email
  }

  static create (userData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name)
    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    const emailOrError = Email.create(userData.email)
    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    return right(new User(nameOrError.value, emailOrError.value))
  }
}
