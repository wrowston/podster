import React, { Component } from 'react'
import axios from 'axios'


export default class BrowsePodcast extends Component {

    state = {
        newPodcast: {
            name: '',
            creator: '',
            description: '',
            genre: '',
            rating: '',
            episodes: [],
            followers: 0,
            image: ''
        },
        allPodcasts: []
    }

    componentDidMount() {
        this.getAllPodcasts()
    }

    getAllPodcasts = async () => {
        try {
            const res = await axios.get('/api/podcast')
            const newState = { ...this.state }
            newState.allPodcasts = res.data
            this.setState(newState)
        } catch (error) {
            console.log('Failed to get all podcasts')
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
                <h1>Browse All Podcasts</h1>
                {this.state.allPodcasts.map(podcast => {
                    return (
                        <div>
                            <img src={podcast.image} />
                            <h1>{podcast.name}</h1>
                            <h3>{podcast.creator}</h3>
                            <div>{podcast.description}</div>
                            <div>{podcast.genre}</div>
                            <div>{podcast.rating}</div>
                            <div>{podcast.followers}</div>
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
