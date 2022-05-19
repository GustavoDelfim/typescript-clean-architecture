import { Either, left, right } from '../../shared/either'
import { Email } from '../email/email'
import { InvalidEmailError } from '../errors/invalid-email-error'
import { UserData } from './user-data'

export class User {
  // public name: string
  // public email: Email

  // constructor (userData: UserData) {
  // }

  static create (userData: UserData): Either<InvalidEmailError, User> {
    const emailOrError = Email.create(userData.email)

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }

    return left(new InvalidEmailError())
  }
}
