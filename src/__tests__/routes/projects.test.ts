import request from 'supertest'
import { app } from '../../index'
import { Project } from '../../types'
import projectData from '../../data/projects.json'
import modelsData from '../../data/models.json'

const project: Project = projectData[0] as Project

const newProject = {
  name: 'New Project',
  description: 'New Project Description',
  status: 'active',
  location: 'https://www.github.com',
  models: []
}

const updatedProject = {
  ...project,
  name: 'Updated Project',
  description: 'Updated Project Description'
}

const expectedModels = modelsData.filter((m) => project.models.includes(m.id))

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
      expect(response.body).toEqual(expectedModels)
    })
  })
  describe('POST /api/projects/:id/models', () => {
    test('should add a model to a project', async () => {
      const model = modelsData[2]
      const response = await request(app)
        .post(`/api/projects/${project.id}/models`)
        .send(model)
      expect(201)
      expect(response.body).toEqual(model)
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
