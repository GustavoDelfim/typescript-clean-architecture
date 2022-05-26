import request from 'supertest'
import app from '@/main/config/app'

describe('Register Route', () => {
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
