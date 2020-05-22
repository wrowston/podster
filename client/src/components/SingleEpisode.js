import React, { Component } from 'react'
import axios from 'axios'

export default class SingleEpisode extends Component {

    state = {
        episode: {
            name: '',
            description: '',
            dateUploaded: '',
            length: '',
            favorites: 0,
            listens: 0,
            podcastId: ''
        },
    }

    componentDidMount() {
        this.getEpisodeById()
    }

    getEpisodeById = async () => {
        const episodeId = this.props.match.params.episodeId
        const res = await axios.get(`/api/episode/${episodeId}`)
        const newState = { ...this.state }
        newState.episode = res.data
        this.setState(newState)
    }

    render() {
        return (
            <div>
                <div>
                    <h2>{this.state.episode.name}</h2>
                    <div>{this.state.episode.description}</div>
                    <div>{this.state.episode.dateUploaded}</div>
                    <div>{this.state.episode.length}</div>
                    <div>Favorites: {this.state.episode.favorites}</div>
                    <div>Listen: {this.state.episode.listens}</div>
                </div>
            </div>
        )
    }
}
