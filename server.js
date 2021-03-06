const express = require('express')
const app = express()

const podcastRotuer = require('./controllers/podcast.js')
const userRotuer = require('./controllers/user.js')
const episodeRouter = require('./controllers/episode.js')
const creatorRouter = require('./controllers/creator.js')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(`${__dirname}/client/build`))

app.use('/api/podcast', podcastRotuer)
app.use('/api/user', userRotuer)
app.use('/api/episode', episodeRouter)
app.use('/api/creator', creatorRouter)



const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})