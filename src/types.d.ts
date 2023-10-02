
// Type definitions for models
export interface Model {
  id: string
  name: string
  description: string
  format: Format
  size: number
  created: string
  lastModified: string
  preview: string
  finished: boolean
}

export type NewModel = Omit<Model, 'id'>

// Type definitions for projects
export interface Project {
  id: string
  name: string
  description: string
  status: Status
  location: string
  models: uuid[]
}

export type NewProject = Omit<Project, 'id'>
