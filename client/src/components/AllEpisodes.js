import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class AllEpisodes extends Component {

    state = {
        episode: {
            name: '',
            podcastName: '',
            description: '',
            dateUploaded: '',
            length: '',
            favorites: 0,
            listens: 0,
        },
        allEpisodes: []
    }

    componentDidMount() {
        this.getAllEpisodesByPodcastId()
    }

    getAllEpisodesByPodcastId = async () => {
        try {
            const podcastId = this.props.match.params.podcastId
            const res = await axios.get(`/api/episode/podcast/${podcastId}`)
            const newState = { ...this.state }
            newState.allEpisodes = res.data
            this.setState(newState)
        } catch (error) {
            console.log('Failed to get all episodes by podcast ID')
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                {this.state.allEpisodes.map((episode, index) => {
                    return (
                        <div key={`45745gwg - ${index}`}>
                            <div>{episode.name}</div>
                            <div>{episode.podcastName}</div>
                            <div>{episode.description}</div>
                            <div>{episode.dateUploaded}</div>
                            <div>{episode.length}</div>
                            <div>Favorites: {episode.favorites}</div>
                            <div>Listens: {episode.listens}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
