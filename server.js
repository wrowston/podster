const express = require('express')
const app = express()

const podcastRotuer = require('./controllers/podcast.js')
const userRotuer = require('./controllers/user.js')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(`${__dirname}/client/build`))

app.use('/api/podcast', podcastRotuer)
app.use('/api/user', userRotuer)

// app.get('/', (req, res) => {
//     res.json('hello world')
// })


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})