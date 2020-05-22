const mongoose = require('./connection.js')

const EpisodeSchema = new mongoose.Schema({
    name: String,
    podcast: String,
    description: String,
    dateUploaded: String,
    length: String,
    favorites: Number,
    listens: Number,
    podcastId: {
        type: String,
        required: true
    }
})

const EpisodeModel = mongoose.model('episode', EpisodeSchema)


function getAllEpisodes() {
    return EpisodeModel.find({})
}

function getEpisodeById(episodeId) {
    return EpisodeModel.findById(episodeId)
}

function createEpisode(episodeData) {
    return EpisodeModel.create(episodeData)
}

function updateEpisode(episodeId, episodeData) {
    return EpisodeModel.findByIdAndUpdate(episodeId, episodeData)
}

function deleteEpisode(episodeId) {
    return EpisodeModel.findByIdAndDelete(episodeId)
}


module.exports = {
    getAllEpisodes,
    getEpisodeById,
    createEpisode,
    updateEpisode,
    deleteEpisode
}