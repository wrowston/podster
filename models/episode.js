const mongoose = require('./connection.js')

const EpisodeSchema = new mongoose.Schema({
    name: String,
    description: String,
    dateUploaded: Date,
    favorites: Number,
    podcastId: {
        type: String,
        required: true
    },
    audioFile: String,
    audioUrl: String
})

const EpisodeModel = mongoose.model('episode', EpisodeSchema)


function getAllEpisodes() {
    return EpisodeModel.find({})
}

function getEpisodeById(episodeId) {
    return EpisodeModel.findById(episodeId)
}

function getAllEpisodesByPodcastId(podcastId) {
    return EpisodeModel.find({ podcastId })
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
    deleteEpisode,
    getAllEpisodesByPodcastId
}