import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class SingleEpisode extends Component {

    state = {
        episode: {
            name: '',
            description: '',
            dateUploaded: '',
            episodeId: '',
            audioFile: '',
            audioUrl: ''
        },
        showEditForm: false,
        play: false
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
                    <div class="card text-center single-episode">
                        <div class='card-header'>Current Episode</div>
                        <div class='card-body '>
                            <h5 class='card-title add-margin'>{this.state.episode.name}</h5>
                            <div class='card-text add-margin'>{this.state.episode.description}</div>
                            <div>
                                <audio controls src={this.state.episode.audioUrl} class='single-episode-audio add-margin'></audio>
                            </div>
                            <button onClick={this.toggleEditForm} class='btn btn-dark add-margin'>Edit Episode</button>
                        </div>
                        <div class="card-footer text-muted">
                            {this.state.episode.dateUploaded}
                        </div>
                    </div>}

                <button onClick={this.toggleEditForm}>
                    {this.state.showEditForm
                        ? 'Hide Edit Episode Form'
                        : 'Edit Episode'}
                </button>
            </div >
        )
    }
}
