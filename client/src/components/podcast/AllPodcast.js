import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class AllPodcast extends Component {

    state = {
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

    render() {
        return (
            <div>
                <h1>Browse All Podcasts</h1>
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
