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
            podcastId: this.props.podcastId
        },
        allEpisodes: []
    }

    componentDidMount() {
        this.getAllEpisodesByPodcastId()
    }

    getAllEpisodesByPodcastId = async () => {
        try {
            const podcastId = this.props.podcastId
            const res = await axios.get(`/api/episode/podcast/${podcastId}`)
            const newState = { ...this.state }
            newState.allEpisodes = res.data
            this.setState(newState)
        } catch (error) {
            console.log('Failed to get all episodes by podcast ID')
            console.log(error)
        }
    }


    onChangeEpisode = (evt) => {
        const newState = { ...this.state }
        newState.episode[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try {
            await axios.post('/api/episode', this.state.episode)
            this.getAllEpisodesByPodcastId()
        } catch (error) {
            console.log('Failed to get all episodes by podcast')
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

                <h5>Upload a New Episode</h5>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={this.state.episode.name}
                            onChange={this.onChangeEpisode}
                        />
                    </div>
                    <div>
                        <label htmlFor="podcastName">Podcast Name</label>
                        <input
                            type="text"
                            name="podcastName"
                            value={this.state.episode.podcastName}
                            onChange={this.onChangeEpisode}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={this.state.episode.description}
                            onChange={this.onChangeEpisode}
                        />
                    </div>
                    <div>
                        <label htmlFor="dateUploaded">Date Uploaded</label>
                        <input
                            type="text"
                            name="dateUploaded"
                            value={this.state.episode.dateUploaded}
                            onChange={this.onChangeEpisode}
                        />
                    </div>
                    <div>
                        <label htmlFor="length">Length</label>
                        <input
                            type="text"
                            name="length"
                            value={this.state.episode.length}
                            onChange={this.onChangeEpisode}
                        />
                    </div>
                    <div>
                        <label htmlFor="podcastId">Podcast ID</label>
                        <input
                            type="text"
                            name="podcastId"
                            value={this.state.episode.podcastId}
                            onChange={this.onChangeEpisode}
                        />
                    </div>
                    <input type="submit" value="Add Episode" />
                </form>
            </div>
        )
    }
}
