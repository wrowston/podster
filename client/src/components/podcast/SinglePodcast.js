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
            rating: '',
            episodes: [],
            followers: 0,
            image: ''
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
            await axios.put(`/api/podcast/${podcastId}`, this.state.podcast)
            this.getPodcastById()
        } catch (error) {
            console.log('Failed to get podcast')
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                <h3>Single Podcast</h3>

                {this.state.showEditForm
                    ?
                    <div>
                        <h4>Edit Podcast</h4>
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.podcast.name}
                                    onChange={this.onChangeCurrentPodcast}
                                />
                            </div>
                            <div>
                                <label htmlFor="creator">Creator</label>
                                <input
                                    type="text"
                                    name="creator"
                                    value={this.state.podcast.creator}
                                    onChange={this.onChangeCurrentPodcast}
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={this.state.podcast.description}
                                    onChange={this.onChangeCurrentPodcast}
                                />
                            </div>
                            <div>
                                <label htmlFor="genre">Genre</label>
                                <input
                                    type="text"
                                    name="genre"
                                    value={this.state.podcast.genre}
                                    onChange={this.onChangeCurrentPodcast}
                                />
                            </div>
                            <div>
                                <label htmlFor="image">Image</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={this.state.podcast.image}
                                    onChange={this.onChangeCurrentPodcast}
                                />
                            </div>
                            <Link to={'/'}>
                                <button onClick={() => this.onDeletePodcast(this.props.match.params.podcastId)}>
                                    Delete
                                </button>
                            </Link>
                            <input type="submit" value="Save" />
                        </form>
                    </div>
                    : <div>
                        <img src={this.state.podcast.image} alt='podcast cover art' height={250} width={250} />
                        <h1>{this.state.podcast.name}</h1>
                        <h3>{this.state.podcast.creator}</h3>
                        <div>{this.state.podcast.description}</div>
                        <div>{this.state.podcast.genre}</div>
                        <div>Rewiews: {this.state.podcast.rating}</div>
                        <div>Followers: {this.state.podcast.followers}</div>
                    </div>}


                <button onClick={this.toggleEditForm}>
                    {this.state.showEditForm
                        ? 'Hide Edit Podcast Form'
                        : 'Edit Podcast'}
                </button>

                <AllEpisodes
                    podcastId={this.props.match.params.podcastId}
                />
            </div>
        )
    }
}
