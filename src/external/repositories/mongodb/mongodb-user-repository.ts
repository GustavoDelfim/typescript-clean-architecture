import { UserData } from '@/entities/user'
import { UserRepository } from '@/usecases/ports'

export class MongodbUserRepository implements UserRepository {
  add(user: UserData): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findUserByEmail(email: string): Promise<UserData | null> {
    throw new Error('Method not implemented.')
  }

  findAllUsers(): Promise<UserData[]> {
    throw new Error('Method not implemented.')
  }

  exists(user: UserData): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
