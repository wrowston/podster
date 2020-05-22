const express = require('express')
const episodeModel = require('../models/episode.js')
const podcastModel = require('../models/podcast.js')

const episodeRouter = express.Router()

// GET ALL
episodeRouter.get('/', async (req, res) => {
    try {
        const allEpisodes = await episodeModel.getAllEpisodes()
        res.json(allEpisodes)
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})

// GET ALL EPISODES BY A PODCAST
episodeRouter.get('/podcast/:podcastId', async (req, res) => {
    try {
        const allEpisodes = await episodeModel.getAllEpisodesByPodcastId(req.params.podcastId)
        //const podcast = await podcastModel.getPodcastById(req.params.podcastId)
        res.json(allEpisodes)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

// GET ONE
episodeRouter.get('/:episodeId', async (req, res) => {
    try {
        const singleEpisode = await episodeModel.getEpisodeById(req.params.episodeId)
        res.json(singleEpisode)
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})

// CREATE
episodeRouter.post('/', async (req, res) => {
    try {
        await episodeModel.createEpisode(req.body)
        res.json('ok')
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})

// UPDATE
episodeRouter.put('/:episodeId', async (req, res) => {
    try {
        await episodeModel.updateEpisode(req.params.episodeId, req.body)
        res.json('ok')
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})

// DELETE
episodeRouter.delete('/:episodeId', async (req, res) => {
    try {
        await episodeModel.deleteEpisode(req.params.episodeId)
        res.json('ok')
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})


module.exports = episodeRouter

