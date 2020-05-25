import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { uploadCommonFile, deleteCommonFile } from '../../firebase/firebase.js'

export default class AllPodcast extends Component {

    state = {
        newPodcast: {
            name: '',
            description: '',
            genre: '',
            rating: '',
            followers: 0,
            image: '',
            imageUrl: '',
            activeUser: {
                isLiked: false,
                userId: ''
            },
            creatorId: this.props.creatorId
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

    fileSelectedHandler = (evt) => {
        console.log(evt.target.files[0])
    }

    onUrlsChange = (imageUrl) => {
        const newState = { ...this.state }
        newState.newPodcast.imageUrl = imageUrl
        this.setState(newState)
    }

    onFileSelect = async (evt) => {
        const { isPicSelected = () => { } } = this.props
        isPicSelected()
        console.log('onFileSelect called, fileList=', evt.target.files[0]);
        if (evt.target.files[0] === null
            || evt.target.files[0].length < 1) {
            return;
        }
        // grab first image selected
        const selectedImage = evt.target.files[0]
        if (!selectedImage) {
            return;
        }

        // try to upload image to firebase
        try {
            const uploadSnapshot = await uploadCommonFile(selectedImage);
            // get  full url of image after it is uploaded
            const downloadURL = await uploadSnapshot.ref.getDownloadURL();

            // lets add the new URL to the array
            const currentImageURls = this.props.imageURLs || [];
            const newImageURLs = [...currentImageURls, downloadURL];
            // lets called the passed function for parent
            this.onUrlsChange(downloadURL);
            console.log('downloadURL', downloadURL);
        } catch (err) {
            console.error('failed to upload image');
            console.error(err);
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
            this.getAllPodcastsByCreatorId()
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
                            <img src={podcast.imageUrl} alt='podcast cover art' height={250} width={250} />
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
                            type="file"
                            name="image"
                            value={this.state.newPodcast.image}
                            onChange={this.onFileSelect}
                        />
                    </div>
                    <div>
                        <label htmlFor="creatorId">CreatorID</label>
                        <input
                            type="text"
                            name="creatorId"
                            value={this.state.newPodcast.creatorId}
                            onChange={this.onChangePodcast}
                        />
                    </div>
                    <div>
                        <label htmlFor="imageUrl">ImageURL</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={this.state.newPodcast.imageUrl}
                            onChange={this.onChangePodcast}
                        />
                    </div>
                    <input type="submit" value="Add Podcast" />
                </form>
            </div>
        )
    }
}
