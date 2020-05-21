const express = require('express')
const userModel = require('../models/user.js')

const userRouter = express.Router()

// GET ALL
userRouter.get('/', async (req, res) => {
    try {
        const allUsers = await userModel.getAllUsers()
        res.json(allUsers)
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})

// GET ONE
userRouter.get('/:userId', async (req, res) => {
    try {
        const singleUser = await userModel.getUserById(req.params.userId)
        res.json(singleUser)
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})

// CREATE
userRouter.post('/', async (req, res) => {
    try {
        await userModel.createUser(req.body)
        res.json('ok')
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})

// UPDATE
userRouter.put('/:userId', async (req, res) => {
    try {
        await userModel.updateUser(req.params.userId, req.body)
        res.json('ok')
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})

// DELETE
userRouter.delete('/:userId', async (req, res) => {
    try {
        await userModel.deleteUser(req.params.userId)
        res.json('ok')
    } catch (err) {
        res.status(500).json(error)
        console.log(err)
    }
})


module.exports = userRouter

