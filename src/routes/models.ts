import express from 'express'
import * as modelService from '../services/modelServices'

const modelRouter = express.Router()

// GET /api/models
modelRouter.get('/', (_req, res) => {
  try {
    const models = modelService.getAllModels()
    return res.json(models)
  } catch (e: any) {
    return res.status(500).send(e.message)
  }
})

// GET /api/models/:modelId
modelRouter.get('/:modelId', (req, res) => {
  try {
    const id = req.params.modelId
    const model = modelService.getModelById(id)

    if (model != null) {
      return res.json(model)
    } else {
      return res.status(404).json({ msg: `Model with id ${id} not found` })
    }
  } catch (e: any) {
    return res.status(500).send(e.message)
  }
})

// POST /api/models
modelRouter.post('/', (req, res) => {
  try {
    const newModel = modelService.createModel(req.body)
    return res.status(201).json(newModel)
  } catch (e: any) {
    return res.status(400).send(e.message)
  }
})

// PATCH /api/models/:id
modelRouter.patch('/:modelId', (req, res) => {
  try {
    const id = req.params.modelId

    const updatedModel = modelService.updateModel({ id, ...req.body })

    return res.status(200).json(updatedModel)
  } catch (e: any) {
    return res.status(500).send(e.message)
  }
})

// DELETE /api/models/:id
modelRouter.delete('/:modelId', (req, res) => {
  try {
    modelService.deleteModel(req.params.modelId)
    return res.sendStatus(204)
  } catch (e: any) {
    return res.status(500).send(e.message)
  }
})

export default modelRouter
