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
                        <h4 className='add-margin'>Edit Episode</h4>
                        <div className='form-wrapper'>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={this.state.episode.name}
                                        onChange={this.onChangeCurrentEpisode}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        value={this.state.episode.description}
                                        onChange={this.onChangeCurrentEpisode}
                                    />
                                </div>
                                <input type="submit" value="Save" className='btn btn-success' />
                                <Link to={'/'}>
                                    <button className='btn btn-danger add-margin' onClick={() => this.onDeleteEpisode(this.props.match.params.episodeId)}>
                                        Delete
                                    </button>
                                </Link>
                            </form>
                            <button onClick={this.toggleEditForm} className='btn btn-dark'>Go Back to Episode</button>
                        </div>
                    </div>
                    :
                    <div className="card text-center single-episode">
                        <div className='card-header'>Current Episode</div>
                        <div className='card-body '>
                            <h5 className='card-title add-margin'>{this.state.episode.name}</h5>
                            <div className='card-text add-margin'>{this.state.episode.description}</div>
                            <div>
                                <audio controls src={this.state.episode.audioUrl} className='single-episode-audio add-margin'></audio>
                            </div>
                            <button onClick={this.toggleEditForm} className='btn btn-dark add-margin'>Edit Episode</button>
                        </div>
                        <div className="card-footer text-muted">
                            {this.state.episode.dateUploaded}
                        </div>
                    </div>}
            </div >
        )
    }
}
