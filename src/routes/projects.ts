import { Router } from 'express'
import * as projectService from '../services/projectServices'

// Create router
const projectRouter = Router()

// GET /api/projects
projectRouter.get('/', (_req, res) => {
  try {
    const projects = projectService.getAllProjects()
    return res.json(projects)
  } catch (e: any) {
    return res.status(404).send(e.message)
  }
})

// GET /api/projects/:id
projectRouter.get('/:projectId', (req, res) => {
  try {
    const projectId = req.params.projectId
    const project = projectService.getProjectById(projectId)
    return res.json(project)
  } catch (e: any) {
    return res.status(404).send(e.message)
  }
})

// GET /api/projects/:id/models
projectRouter.get('/:projectId/models', (req, res) => {
  const projectId = req.params.projectId
  const models = projectService.getAllModelsForProject(projectId)

  if (models != null) {
    return res.json(models)
  } else {
    return res.status(404).json({ msg: `Project with id ${projectId} not found` })
  }
})

// POST /api/projects
projectRouter.post('/', (req, res) => {
  try {
    const newProject = req.body
    const addedProject = projectService.createProject(newProject)
    return res.status(201).json(addedProject)
  } catch (e: any) {
    return res.status(400).send(e.message)
  }
})

// PATCH /api/projects/:id
projectRouter.patch('/:projectId', (req, res) => {
  try {
    const id = req.params.projectId
    const { name, description } = req.body

    if (name == null || description == null) {
      return res.status(400).json({ msg: 'Please include name and description' })
    }

    const updatedProject = projectService.updateProject({ id, ...req.body })

    return res.status(200).json(updatedProject)
  } catch (e: any) {
    return res.status(400).send(e.message)
  }
})

// DELETE /api/projects/:id
projectRouter.delete('/:projectId', (req, res) => {
  try {
    const id = req.params.projectId
    projectService.deleteProject(id)
    return res.sendStatus(204)
  } catch (e: any) {
    return res.status(500).send(e.message)
  }
})

export default projectRouter
