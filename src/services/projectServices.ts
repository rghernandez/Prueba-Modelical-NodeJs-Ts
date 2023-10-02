import { Project, NewProject, Model } from '../types'
import projectsData from '../data/projects.json'
import { checkId, validateProject, validatePartialProject } from '../utils/utils'
import { randomUUID } from 'node:crypto'

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

// PUT (update) an existing project
export const updateProject = (project: Project): Project => {
  if (!validatePartialProject(project)) {
    throw new Error('Invalid project')
  }
  const index = projects.findIndex((p) => p.id === project.id)
  if (index < 0) {
    throw new Error('Project not found')
  }
  projects[index] = project
  return project
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
export const getAllModelsForProject = (projectId: any): Model[] => {
  if (!checkId(projectId)) {
    throw new Error('Invalid ID project')
  }
  const project = getProjectById(projectId)
  if (project != null) {
    return project.models
  } else {
    return []
  }
}
