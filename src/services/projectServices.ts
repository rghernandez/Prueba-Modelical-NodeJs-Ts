import { Project, NewProject, Model, NewModel } from '../types'
import projectsData from '../data/projects.json'
import { checkId } from '../utils/utilFunctions'
import { validateProject, validatePartialProject } from '../utils/projectUtils'
import { randomUUID } from 'node:crypto'
import { createModel, getModelById } from './modelServices'

// Import data from JSON file and cast to Project type
const projects: Project[] = projectsData as Project[]

// GET all projects or filter by name
export const getAllProjects = (): Project[] => {
  return projects
}

// GET a single project by id
export const getProjectById = (id: any): Project | undefined => {
  if (!checkId(id)) {
    throw new Error('Invalid ID')
  }
  return projects.find((project) => project.id === id)
}

// POST a new project
export const createProject = (project: NewProject): Project => {
  const newProject: Project = {
    id: randomUUID(),
    ...project
  }
  if (!validateProject(newProject)) {
    throw new Error('Invalid project')
  }

  projects.push(newProject)
  return newProject
}

// Update an existing project
export const updateProject = (project: Project): Project => {
  if (!validatePartialProject(project)) {
    throw new Error('Invalid project')
  }
  const index = projects.findIndex((p) => p.id === project.id)
  if (index < 0) {
    throw new Error('Project not found')
  }
  projects[index] = {
    ...projects[index],
    ...project
  }
  return projects[index]
}

// DELETE an existing project
export const deleteProject = (id: any): void => {
  if (checkId(id)) {
    const index = projects.findIndex((m) => m.id === id)

    if (index < 0) {
      throw new Error('Model not found')
    }
    projects.splice(index, 1)
  } else {
    throw new Error('Invalid ID')
  }
}

// GET all models for a project
export const getAllModelsForProject = (projectId: any): Model[] | undefined => {
  if (!checkId(projectId)) {
    throw new Error('Invalid ID')
  }
  const models = getModelsForProject(projectId)
  return models
}

// get models for a project
const getModelsForProject = (projectId: any): Model[] | undefined => {
  const project = getProjectById(projectId)
  if (project != null) {
    const models = project.models.map((modelId) => getModelById(modelId))
      .filter((model): model is Model => model !== undefined)
    return models
  } else {
    throw new Error('Project not found')
  }
}

// Add a model to a project with projectId and Model
export const addModelToProject = (projectId: any, model: NewModel): Model => {
  if (!checkId(projectId)) {
    throw new Error('Invalid ID')
  }
  const project = getProjectById(projectId)
  if (project != null) {
    const modelCreated = createModel(model)
    project.models.push(modelCreated.id)
    return modelCreated
  } else {
    throw new Error('Project not found')
  }
}
