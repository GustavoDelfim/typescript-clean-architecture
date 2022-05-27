import { MongoHelper } from '@/external/repositories/mongodb/helper'
import { MongodbUserRepository } from '@/external/repositories/mongodb'

describe('Mongodb User Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    MongoHelper.clearCollection('users ')
  })

  test('ehwn user is added, it should exist', async () => {
    const userRepository = new MongodbUserRepository()
    const userDate = {
      name: 'Gustavo',
      email: 'gusttavodelfim@gmail.com'
    }
    await userRepository.add(userDate)
    expect(await userRepository.exists(userDate)).toBeTruthy()
  })
})
