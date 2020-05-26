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
                <h1>Explore</h1>
                <div class='podcast-list-wrapper'>
                    {this.state.allPodcasts.map((podcast, index) => {
                        return (
                            <div key={`t4n328on - ${index}`} class='podcast-wrapper'>
                                <img src={podcast.imageUrl} alt='podcast cover art' height={200} width={200} class='podcast-image' />
                                <div class='podcast-info-wrapper'>
                                    <Link to={`/podcast/${podcast._id}`} class='podcast-name'><div>{podcast.name}</div></Link>
                                    <div class='podcast-creator'>{podcast.creator}</div>
                                    <div class='podcast-info'>{podcast.genre}</div>
                                    <div class='podcast-info'>{podcast.description}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
