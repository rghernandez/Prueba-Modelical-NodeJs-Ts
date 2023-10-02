import request from 'supertest'
import { app } from '../../index'

const model = {
  id: 'a84ab7a6-985f-4ebf-a74e-3c533b9e65a9',
  name: 'Model 1',
  description: 'Model 1 description',
  projectId: 1
}
const newModel = {
  name: 'New Model',
  description: 'New Model Description',
  projectId: 2
}
const updatedModel = {
  id: model.id,
  name: 'Updated Model',
  description: 'Updated Model Description',
  projectId: 2
}

describe('Model API', () => {
  describe('GET /api/models', () => {
    test('should return 200 OK and an array of models', async () => {
      const response = await request(app).get('/api/models')
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
    })

    test('should return a model by ID', async () => {
      const response = await request(app).get('/api/models/' + model.id)
      expect(response.status).toBe(200)
      expect(response.body.id).toBe(model.id)
    })
  })

  describe('POST /api/models', () => {
    test('should create a new model', async () => {
      const response = await request(app).post('/api/models').send(newModel)
      expect(response.status).toBe(201)
      expect(response.body.name).toBe(newModel.name)
    })
    test('should return 400 for missing name', async () => {
      const response = await request(app).post('/api/models').send({ description: 'Test' })
      expect(response.status).toBe(400)
    })
  })

  describe('PATCH /api/models/:id', () => {
    test('should update a model', async () => {
      const response = await request(app).patch('/api/models/' + model.id).send(updatedModel)
      expect(response.status).toBe(200)
      expect(response.body.name).toBe(updatedModel.name)
    })
  })

  describe('DELETE /api/models/:id', () => {
    test('should delete a model', async () => {
      const response = await request(app).delete('/api/models/' + model.id)
      expect(response.status).toBe(204)
    })
  })
})
