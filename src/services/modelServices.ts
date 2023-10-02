import { Model, NewModel } from '../types'
import modelsData from '../data/models.json'
import { checkId, validateModel, validatePartialModel } from '../utils/utils'
import { randomUUID } from 'node:crypto'
// Import data from JSON file and cast to Model type
const models: Model[] = modelsData as Model[]

// GET all models or filter by name
export const getAllModels = (): Model[] => {
  return models
}

// GET a single character by id
export const getModelById = (id: any): Model | undefined => {
  if (!checkId(id)) {
    throw new Error('Invalid ID')
  }
  return models.find((model) => model.id === id)
}

// POST a new model
export const createModel = (model: NewModel): Model => {
  const newModel: Model = {
    id: randomUUID(),
    ...model
  }
  if (!validateModel(newModel)) {
    throw new Error('Invalid model')
  }

  models.push(newModel)
  return newModel
}

// PUT (update) an existing model
export const updateModel = (model: Model): Model => {
  if (!validatePartialModel(model)) {
    throw new Error('Invalid model')
  }
  const index = models.findIndex((m) => m.id === model.id)
  if (index < 0) {
    throw new Error('Model not found')
  }
  models[index] = model
  return model
}

// DELETE an existing model
export const deleteModel = (id: any): void => {
  if (checkId(id)) {
    const index = models.findIndex((m) => m.id === id)

    if (index < 0) {
      throw new Error('Model not found')
    }
    models.splice(index, 1)
  } else {
    throw new Error('Invalid ID')
  }
}
