import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Sound from 'react-sound'

export default class SingleEpisode extends Component {

    state = {
        episode: {
            name: '',
            description: '',
            dateUploaded: '',
            length: '',
            favorites: 0,
            listens: 0,
            episodeId: '',
            audioFile: '',
            audioUrl: ''
        },
        showEditForm: false
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


    onDeleteEpisode = async (episodeId) => {
        await axios.delete(`/api/episode/${episodeId}`)
    }

    toggleEditForm = () => {
        const showEditForm = !this.state.showEditForm
        this.setState({ showEditForm })
    }

    togglePlay = () => {
        const play = !this.state.play
        this.setState({ play })
    }

    onChangeCurrentEpisode = (evt) => {
        const newState = { ...this.state }
        newState.episode[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const episodeId = this.props.match.params.episodeId
            await axios.put(`/api/episode/${episodeId}`, this.state.episode)
            this.getEpisodeById()
        } catch (error) {
            console.log('Failed to get episode')
            console.log(error)
        }
    }

    render() {
        return (
            <div>

                {this.state.showEditForm
                    ?
                    <div>
                        <h4>Edit Episode</h4>
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.episode.name}
                                    onChange={this.onChangeCurrentEpisode}
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={this.state.episode.description}
                                    onChange={this.onChangeCurrentEpisode}
                                />
                            </div>
                            <Link to={'/'}>
                                <button onClick={() => this.onDeleteEpisode(this.props.match.params.episodeId)}>
                                    Delete
                        </button>
                            </Link>
                            <input type="submit" value="Save" />
                        </form>
                    </div>
                    :
                    <div>
                        <h2>{this.state.episode.name}</h2>
                        <div>{this.state.episode.description}</div>
                        <div>{this.state.episode.dateUploaded}</div>
                        <div>{this.state.episode.length}</div>
                        <div>Favorites: {this.state.episode.favorites}</div>
                        <div>Listen: {this.state.episode.listens}</div>
                        <button onClick={this.togglePlay}>
                            {this.state.play
                                ? 'Pause'
                                : 'Play'}
                        </button>
                        {this.state.play ?
                            <Sound
                                url={this.state.episode.audioUrl}
                                playStatus={Sound.status.PLAYING}
                                playFromPosition={0}
                                onLoading={this.handleSongLoading}
                                onPlaying={this.handleSongPlaying}
                                onFinishedPlaying={this.handleSongFinishedPlaying}
                            />
                            : <Sound
                                url={this.state.episode.audioUrl}
                                playStatus={Sound.status.PAUSED}
                                playFromPosition={0}
                                onLoading={this.handleSongLoading}
                                onPlaying={this.handleSongPlaying}
                                onFinishedPlaying={this.handleSongFinishedPlaying}
                            />}
                    </div>}

                <button onClick={this.toggleEditForm}>
                    {this.state.showEditForm
                        ? 'Hide Edit Episode Form'
                        : 'Edit Episode'}
                </button>
            </div>
        )
    }
}
