const express = require('express')
const creatorModel = require('../models/creator.js')

const creatorRouter = express.Router()

// GET ALL
creatorRouter.get('/', async (req, res) => {
    try {
        const allCreators = await creatorModel.getAllCreators()
        res.json(allCreators)
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})

// GET ONE
creatorRouter.get('/:creatorId', async (req, res) => {
    try {
        const singleCreator = await creatorModel.getCreatorById(req.params.creatorId)
        res.json(singleCreator)
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})

// CREATE
creatorRouter.post('/', async (req, res) => {
    try {
        await creatorModel.createCreator(req.body)
        res.json('ok')
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})

// UPDATE
creatorRouter.put('/:creatorId', async (req, res) => {
    try {
        await creatorModel.updateCreator(req.params.creatorId, req.body)
        res.json('ok')
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})

// DELETE
creatorRouter.delete('/:creatorId', async (req, res) => {
    try {
        await creatorModel.deleteCreator(req.params.creatorId)
        res.json('ok')
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})


module.exports = creatorRouter

