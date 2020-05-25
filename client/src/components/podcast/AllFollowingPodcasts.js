import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class AllPodcast extends Component {

    state = {
        podcast: {
            name: '',
            creator: '',
            description: '',
            genre: '',
            rating: '',
            episodes: [],
            followers: 0,
            image: '',
            activeUser: {
                isLiked: false,
                userId: ''
            }
        },
        allPodcasts: []
    }

    componentDidMount() {
        this.getAllPodcasts()
    }

    getAllPodcasts = async () => {
        try {
            const res = await axios.get('/api/podcast')
            const newState = { ...this.state }
            newState.allPodcasts = res.data
            this.setState(newState)
        } catch (error) {
            console.log('Failed to get all podcasts')
            console.log(error)
        }
    }

    onChangePodcast = (evt) => {
        const newState = { ...this.state }
        newState.podcast[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try {
            await axios.post('/api/podcast', this.state.podcast)
            this.getAllPodcasts()
        } catch (error) {
            console.log('Failed to get all podcasts')
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                <h1>Following</h1>
                {this.state.allPodcasts.map((podcast, index) => {
                    return (
                        <div key={`t4n328on - ${index}`}>
                            <img src={podcast.image} alt='podcast cover art' height={250} width={250} />
                            <Link to={`/podcast/${podcast._id}`}><h1>{podcast.name}</h1></Link>
                            <h3>{podcast.creator}</h3>
                            <div>{podcast.description}</div>
                            <div>{podcast.genre}</div>
                            <div>Rewiews: {podcast.rating}</div>
                            <div>Followers: {podcast.followers}</div>
                        </div>
                    )
                })}

            </div>
        )
    }
}
