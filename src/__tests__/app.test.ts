import request from 'supertest'
import { app } from '../index'

describe('App Routes', () => {
  test('should respond with 404 for unknown routes', async () => {
    const response = await request(app).get('/nonexistent-route')
    expect(response.status).toBe(404)
  })

  test('should handle CORS headers', async () => {
    const response = await request(app).get('/api/projects')
    expect(response.headers['access-control-allow-origin']).toBe('*')
  })

  test('should handle JSON validation errors', async () => {
    const response = await request(app)
      .post('/api/projects')
      .send({ name: 'Test Project' })
    expect(response.status).toBe(400)
  })
})
