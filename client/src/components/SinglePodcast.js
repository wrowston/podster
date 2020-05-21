import React, { Component } from 'react'
import axios from 'axios'

export default class SinglePodcast extends Component {

    state = {
        podcast: {
            name: '',
            creator: '',
            description: '',
            genre: '',
            rating: '',
            episodes: [],
            followers: 0,
            image: ''
        }
    }

    componentDidMount() {
        this.getPodcastById()
    }

    getPodcastById = async () => {
        const podcastId = this.props.match.params.podcastId
        console.log('podcastId', podcastId)
        const res = await axios.get(`/api/podcast/${podcastId}`)
        this.setState(res.data)
    }


    render() {
        return (
            <div>
                <h3>Single Podcast</h3>
                <div>
                    <img src={this.state.image} />
                    <h1>{this.state.name}</h1>
                    <h3>{this.state.creator}</h3>
                    <div>{this.state.description}</div>
                    <div>{this.state.genre}</div>
                    <div>{this.state.rating}</div>
                    <div>{this.state.followers}</div>
                </div>
            </div>
        )
    }
}
