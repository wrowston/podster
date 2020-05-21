const mongoose = require('./connection.js')

const PodcastSchema = new mongoose.Schema({
    name: String,
    creator: String,
    description: String,
    genre: String,
    rating: String,
    episodes: Array,
    followers: Number,
    image: String
})

const PodcastModel = mongoose.model('podcast', PodcastSchema)


function getAllPodcasts() {
    return PodcastModel.find({})
}

function getPodcastById(podcastId) {
    return PodcastModel.findById(podcastId)
}

function createPodcast(podcastData) {
    return PodcastModel.create(podcastData)
}

function updatePodcast(podcastId, podcastData) {
    PodcastModel.findByIdAndUpdate(podcastId, podcastData)
}

function deletePodcast(podcastId) {
    return PodcastModel.findByIdAndDelete(podcastId)
}


module.exports = {
    getAllPodcasts,
    getPodcastById,
    createPodcast,
    updatePodcast,
    deletePodcast
}