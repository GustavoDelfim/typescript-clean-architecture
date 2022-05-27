import { UserData } from '@/entities/user'
import { UserRepository } from '@/usecases/ports'
import { MongoHelper } from './helper'

export class MongodbUserRepository implements UserRepository {
  private readonly collectionName = 'users'

  public async add (user: UserData): Promise<void> {
    const userCollection = MongoHelper.getCollection(this.collectionName)
    const exists = await this.exists(user)
    if (!exists) {
      await userCollection?.insertOne(user)
    }
  }

  public async findUserByEmail (email: string): Promise<UserData | null> {
    const userCollection = MongoHelper.getCollection<UserData>(this.collectionName)
    const result = await userCollection?.findOne({ email })
    if (!result) return null
    return result
  }

  public async findAllUsers (): Promise<UserData[]> {
    return MongoHelper.getCollection<UserData>(this.collectionName)?.find({}).toArray() || []
  }

  public async exists (user: UserData): Promise<boolean> {
    const found = await this.findUserByEmail(user.email)
    if (found && found.email === user.email) {
      return true
    }
    return false
  }
}
