import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class AllPodcast extends Component {

    state = {
        newPodcast: {
            name: '',
            creator: '',
            description: '',
            genre: '',
            rating: '',
            episodes: [],
            followers: 0,
            image: '',
            activeUser: {
                isLiked: false,
                userId: ''
            }
        },
        allPodcasts: []
    }

    componentDidMount() {
        this.getAllPodcastsByCreatorId()
    }

    getAllPodcastsByCreatorId = async () => {
        try {
            const creatorId = this.props.creatorId
            const res = await axios.get(`/api/podcast/creator/${creatorId}`)
            const newState = { ...this.state }
            newState.allPodcasts = res.data
            this.setState(newState)
        } catch (error) {
            console.log('Failed to get all podcasts by creator id')
            console.log(error)
        }
    }

    onChangePodcast = (evt) => {
        const newState = { ...this.state }
        newState.newPodcast[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try {
            await axios.post('/api/podcast', this.state.newPodcast)
            this.getAllPodcasts()
        } catch (error) {
            console.log('Failed to get all podcasts')
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                {this.state.allPodcasts.map((podcast, index) => {
                    return (
                        <div key={`t4n328on - ${index}`}>
                            <img src={podcast.image} alt='podcast cover art' height={250} width={250} />
                            <Link to={`/podcast/${podcast._id}`}><h1>{podcast.name}</h1></Link>
                            <h3>{podcast.creator}</h3>
                            <div>{podcast.description}</div>
                            <div>{podcast.genre}</div>
                            <div>Rewiews: {podcast.rating}</div>
                            <div>Followers: {podcast.followers}</div>
                        </div>
                    )
                })}

                <h3>Add a Podcast</h3>

                <form onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={this.state.newPodcast.name}
                            onChange={this.onChangePodcast}
                        />
                    </div>
                    <div>
                        <label htmlFor="creator">Creator</label>
                        <input
                            type="text"
                            name="creator"
                            value={this.state.newPodcast.creator}
                            onChange={this.onChangePodcast}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={this.state.newPodcast.description}
                            onChange={this.onChangePodcast}
                        />
                    </div>
                    <div>
                        <label htmlFor="genre">Genre</label>
                        <input
                            type="text"
                            name="genre"
                            value={this.state.newPodcast.genre}
                            onChange={this.onChangePodcast}
                        />
                    </div>
                    <div>
                        <label htmlFor="image">Image</label>
                        <input
                            type="text"
                            name="image"
                            value={this.state.newPodcast.image}
                            onChange={this.onChangePodcast}
                        />
                    </div>
                    <input type="submit" value="Add Podcast" />
                </form>
            </div>
        )
    }
}
