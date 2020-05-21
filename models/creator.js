const mongoose = require('./connection.js')

const CreatorSchema = new mongoose.Schema({
    name: String,
    podcast: String,
    description: String,
    dateUploaded: String,
    length: String,
    favorites: Number,
    listens: Number,
})

const CreatorModel = mongoose.model('creator', CreatorSchema)


function getAllCreators() {
    return CreatorModel.find({})
}

function getCreatorById(creatorId) {
    return CreatorModel.findById(creatorId)
}

function createCreator(creatorData) {
    return CreatorModel.create(creatorData)
}

function updateCreator(creatorId, creatorData) {
    return CreatorModel.findByIdAndUpdate(creatorId, creatorData)
}

function deleteCreator(creatorId) {
    return CreatorModel.findByIdAndDelete(creatorId)
}


module.exports = {
    getAllCreators,
    getCreatorById,
    createCreator,
    updateCreator,
    deleteCreator
}