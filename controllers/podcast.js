const express = require('express')
const podcastModel = require('../models/podcast.js')

const podcastRouter = express.Router()

// GET ALL
podcastRouter.get('/', async (req, res) => {
    try {
        const allPodcasts = await podcastModel.getAllPodcasts()
        res.json(allPodcasts)
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})

podcastRouter.get('/creator/:creatorId', async (req, res) => {
    try {
        const allPodcasts = await podcastModel.getAllPodcastByCreatorId(req.params.creatorId)
        res.json(allPodcasts)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

// GET ONE
podcastRouter.get('/:podcastId', async (req, res) => {
    try {
        const singlePodcast = await podcastModel.getPodcastById(req.params.podcastId)
        res.json(singlePodcast)
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})

// CREATE
podcastRouter.post('/', async (req, res) => {
    try {
        await podcastModel.createPodcast(req.body)
        res.json('ok')
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})

// UPDATE
podcastRouter.put('/:podcastId', async (req, res) => {
    try {
        await podcastModel.updatePodcast(req.params.podcastId, req.body)
        res.json('ok')
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})

// DELETE
podcastRouter.delete('/:podcastId', async (req, res) => {
    try {
        await podcastModel.deletePodcast(req.params.podcastId)
        res.json('ok')
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})


module.exports = podcastRouter

