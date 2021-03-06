const mongoose = require('./connection.js')

const PodcastSchema = new mongoose.Schema({
    name: String,
    creator: String,
    description: String,
    genre: String,
    image: String,
    imageUrl: String,
    creatorId: {
        type: String,
        required: true
    }
})

const PodcastModel = mongoose.model('podcast', PodcastSchema)


function getAllPodcasts() {
    return PodcastModel.find({})
}

function getPodcastById(podcastId) {
    return PodcastModel.findById(podcastId)
}

function getAllPodcastByCreatorId(creatorId) {
    return PodcastModel.find({ creatorId })
}

function createPodcast(podcastData) {
    return PodcastModel.create(podcastData)
}

function updatePodcast(podcastId, podcastData) {
    return PodcastModel.findByIdAndUpdate(podcastId, podcastData)
}

function deletePodcast(podcastId) {
    return PodcastModel.findByIdAndDelete(podcastId)
}


module.exports = {
    getAllPodcasts,
    getPodcastById,
    createPodcast,
    updatePodcast,
    deletePodcast,
    getAllPodcastByCreatorId
}