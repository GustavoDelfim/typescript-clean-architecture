import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/external/repositories/mongodb/helper'

describe('Register Route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    MongoHelper.clearCollection('users')
  })

  test('should return an acount on success', async () => {
    const userData = {
      name: 'Gustavo',
      email: 'gusttavodelfim@gmail.com'
    }

    await request(app)
      .post('/api/register')
      .send(userData)
      .expect(201)
      .expect(userData)
  })
})
