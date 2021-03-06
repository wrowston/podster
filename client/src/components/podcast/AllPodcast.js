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
                <div className='podcast-list-wrapper'>
                    {this.state.allPodcasts.map((podcast, index) => {
                        return (
                            <div key={`t4n328on - ${index}`} className='podcast-wrapper'>
                                <img src={podcast.imageUrl} alt='podcast cover art' height={200} width={200} className='podcast-image' />
                                <div className='podcast-info-wrapper'>
                                    <Link to={`/podcast/${podcast._id}`} className='podcast-name'><div>{podcast.name}</div></Link>
                                    <Link to={`/creator/${podcast.creatorId}`} className='podcast-creator'><div>{podcast.creator}</div></Link>
                                    <div className='podcast-info'>{podcast.genre}</div>
                                    <div className='podcast-info'>{podcast.description}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
