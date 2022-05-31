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
    await MongoHelper.clearCollection('users')
  })

  test('when user is added, it should exist', async () => {
    const userRepository = new MongodbUserRepository()
    const userDate = {
      name: 'Gustavo',
      email: 'gusttavodelfim@gmail.com'
    }
    await userRepository.add(userDate)
    const found = await userRepository.exists(userDate)
    expect(found).toBeTruthy()
  })

  test('fild all users return all added users', async () => {
    const userRepository = new MongodbUserRepository()
    const userDate1 = {
      name: 'Any 1',
      email: 'any1@gmail.com'
    }
    const userDate2 = {
      name: 'Any 2',
      email: 'any2@gmail.com'
    }
    await userRepository.add(userDate1)
    await userRepository.add(userDate2)

    const allUsers = await userRepository.findAllUsers()
    expect(allUsers[0].name).toBe(userDate1.name)
    expect(allUsers[1].name).toBe(userDate2.name)
  })
})
