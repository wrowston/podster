import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AllEpisodes from '../episode/AllEpisodes.js'

export default class SinglePodcast extends Component {

    state = {
        podcast: {
            name: '',
            creator: '',
            description: '',
            genre: '',
            image: '',
            creatorId: '',
        },
        showEditForm: false
    }

    componentDidMount() {
        this.getPodcastById()
    }

    getPodcastById = async () => {
        const podcastId = this.props.match.params.podcastId
        console.log('podcastId', podcastId)
        const res = await axios.get(`/api/podcast/${podcastId}`)
        const newState = { ...this.state }
        newState.podcast = res.data
        console.log(res.data)
        this.setState(newState)
    }

    onDeletePodcast = async (podcastId) => {
        await axios.delete(`/api/podcast/${podcastId}`)
    }

    toggleEditForm = () => {
        const showEditForm = !this.state.showEditForm
        this.setState({ showEditForm })
    }

    onChangeCurrentPodcast = (evt) => {
        const newState = { ...this.state }
        newState.podcast[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const podcastId = this.props.match.params.podcastId
            console.log(podcastId)
            await axios.put(`/api/podcast/${podcastId}`, this.state.podcast)
            this.getPodcastById()
        } catch (error) {
            console.log('Failed to get podcast')
            console.log(error)
        }
    }

    render() {
        return (
            <div class='add-margin'>
                {this.state.showEditForm
                    ?
                    <div>
                        <h4>Edit Podcast</h4>
                        <div class='form-wrapper'>
                            <form onSubmit={this.onSubmit}>
                                <div class="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="name"
                                        value={this.state.podcast.name}
                                        onChange={this.onChangeCurrentPodcast}
                                    />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="description"
                                        value={this.state.podcast.description}
                                        onChange={this.onChangeCurrentPodcast}
                                    />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="genre">Genre</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="genre"
                                        value={this.state.podcast.genre}
                                        onChange={this.onChangeCurrentPodcast}
                                    />
                                </div>
                                <Link to={'/explore'}>
                                    <input
                                        type="submit"
                                        value="Save"
                                        class='btn btn-success' />
                                </Link>
                                <Link to={`/creator/${this.state.podcast.creatorId}`}>
                                    <button
                                        class='btn btn-danger add-margin'
                                        onClick={() => this.onDeletePodcast(this.props.match.params.podcastId)}>
                                        Delete
                                    </button>
                                </Link>
                            </form>
                            <button
                                onClick={this.toggleEditForm}
                                class='btn btn-dark'>
                                Go Back to Podcast
                            </button>
                        </div>
                    </div>
                    : <div class='single-podcast-wrapper'>
                        <div class='image-name-creator-wrapper'>
                            <img src={this.state.podcast.imageUrl} alt='podcast cover art' class='single-image' height={250} width={250} />
                            <div class='podcast-name-wrapper'>
                                <div class='single-name'>{this.state.podcast.name}</div>
                                <Link
                                    to={`/creator/${this.state.podcast.creatorId}`}
                                    class='single-creator'>
                                    <div
                                        class='single-creator'>
                                        Created By: {this.state.podcast.creator}
                                    </div>
                                </Link>
                                <div class='single-genre'>{this.state.podcast.genre}</div>
                            </div>
                        </div>
                        <div class='single-podcast-info-wrapper'>
                            <div class='about'>ABOUT</div>
                            <div class='single-description'>{this.state.podcast.description}</div>
                        </div>
                        <AllEpisodes
                            podcastId={this.props.match.params.podcastId}
                            showEditForm={this.state.showEditForm}
                            toggleEditForm={this.toggleEditForm}
                        />
                    </div>}
            </div>
        )
    }
}
