import request from 'supertest'
import { app } from '../../index'

const project = {
  id: '9ee0595d-f092-4460-8125-5c9726817044',
  name: 'Project 1',
  description: 'This is project 1',
  status: 'active',
  models: [
    {
      id: 'a84ab7a6-985f-4ebf-a74e-3c533b9e65a9',
      name: 'Model 1',
      description: 'Model 1 description'
    },
    {
      id: 'b9b90578-cf55-4ec9-9bc0-55bc318b10c1',
      name: 'Model 2',
      description: 'Model 2 description'
    }
  ]
}
const newProject = {
  name: 'New Project',
  description: 'New Project Description',
  status: 'active',
  models: []
}

const updatedProject = {
  id: project.id,
  name: 'Updated Project',
  description: 'Updated Project Description'
}

describe('Project API', () => {
  describe('GET /api/projects', () => {
    test('should return 200 OK', async () => {
      await request(app)
        .get('/api/projects')
        .expect(200)
    })
    test('should return an array of projects', async () => {
      const response = await request(app)
        .get('/api/projects')
      expect(response.body).toBeInstanceOf(Array)
    })
  })
  describe('GET /api/projects/:id', () => {
    test('should return a project wtesth id' + project.id, async () => {
      const response = await request(app)
        .get('/api/projects/' + project.id)
      expect(response.body.id).toBe(project.id)
    })

    test('should return 404 for nonexistent project', async () => {
      await request(app)
        .get('/api/projects/999')
        .expect(404)
    })
  })
  describe('POST /api/projects', () => {
    test('should create a new project', async () => {
      const response = await request(app)
        .post('/api/projects')
        .send(newProject)
      expect(response.body.name).toBe(newProject.name)
    })
    test('should return 400 Bad Request for invalid project data', async () => {
      const response = await request(app)
        .post('/api/projects')
        .send({ name: 'Invalid Project' })
      expect(response.status).toBe(400)
    })
  })
  describe('GET /api/projects/:id/models', () => {
    test('should return all models from a project', async () => {
      const response = await request(app)
        .get(`/api/projects/${project.id}/models`)
      expect(response.body).toEqual(project.models)
    })
  })
  describe('PATCH /api/projects/:id', () => {
    test('should update a project', async () => {
      const response = await request(app)
        .patch('/api/projects/' + project.id)
        .send(updatedProject)
      expect(response.body.name).toBe(updatedProject.name)
      expect(response.body.description).toBe(updatedProject.description)
    })
  })
  describe('DELETE /api/projects/:id', () => {
    test('should delete a project', async () => {
      await request(app)
        .delete('/api/projects/' + project.id)
        .expect(204)
    })
  })
})
