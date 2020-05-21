const mongoose = require('./connection.js')

const UserSchema = new mongoose.Schema({
    userName: String,
    email: String,
    following: Array,
    favoritedEpisodes: Array,
    currentlyListening: String,
})

const UserModel = mongoose.model('user', UserSchema)


function getAllUsers() {
    return UserModel.find({})
}

function getUserById(userId) {
    return UserModel.findById(userId)
}

function createUser(userData) {
    return UserModel.create(userData)
}

function updateUser(userId, userData) {
    UserModel.findByIdAndUpdate(userId, userData)
}

function deleteUser(userId) {
    return UserModel.findByIdAndDelete(userId)
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}