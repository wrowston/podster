import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { uploadCommonFile, deleteCommonFile } from '../../firebase/firebase.js'

export default class AllPodcast extends Component {

    state = {
        newPodcast: {
            name: '',
            creator: '',
            description: '',
            genre: '',
            followers: 0,
            image: '',
            imageUrl: '',
            creatorId: this.props.creatorId
        },
        allPodcasts: [],
        showAddForm: false
    }

    componentDidMount() {
        this.getAllPodcastsByCreatorId()
        this.getCreatorById()
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

    getCreatorById = async () => {
        const res = await axios.get(`/api/creator/${this.props.creatorId}`)
        const newState = { ...this.state }
        newState.newPodcast.creator = res.data.name
        this.setState(newState)
    }

    toggleAddForm = () => {
        const showAddForm = !this.state.showAddForm
        this.setState({ showAddForm })
    }

    fileSelectedHandler = (evt) => {
        console.log(evt.target.files[0])
    }

    onUrlsChange = (imageUrl) => {
        const newState = { ...this.state }
        newState.newPodcast.imageUrl = imageUrl
        this.setState(newState)
    }

    //code snippet provided by Brandon Moody
    onFileSelect = async (evt) => {
        const { isPicSelected = () => { } } = this.props
        isPicSelected()
        console.log('onFileSelect called, fileList=', evt.target.files[0])
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
            const uploadSnapshot = await uploadCommonFile(selectedImage)
            // get  full url of image after it is uploaded
            const downloadURL = await uploadSnapshot.ref.getDownloadURL()

            // lets add the new URL to the array
            // const currentImageURls = this.props.imageURLs || []
            // const newImageURLs = [...currentImageURls, downloadURL]
            // lets called the passed function for parent
            this.onUrlsChange(downloadURL);
            console.log('downloadURL', downloadURL)
        } catch (err) {
            console.error('failed to upload image')
            console.error(err)
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
                {this.state.showAddForm
                    ?
                    <div>
                        <h3>Add a Podcast</h3>
                        <div class='form-wrapper'>

                            <form onSubmit={this.onSubmit}>
                                <div class="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="name"
                                        value={this.state.newPodcast.name}
                                        onChange={this.onChangePodcast}
                                    />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="description"
                                        value={this.state.newPodcast.description}
                                        onChange={this.onChangePodcast}
                                    />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="genre">Genre</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="genre"
                                        value={this.state.newPodcast.genre}
                                        onChange={this.onChangePodcast}
                                    />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="image">Image</label>
                                    <input
                                        type="file"
                                        class="add-margin"
                                        name="image"
                                        value={this.state.newPodcast.image}
                                        onChange={this.onFileSelect}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="hidden"
                                        name="creator"
                                        value={this.state.newPodcast.creator}
                                        onChange={this.onChangePodcast}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="hidden"
                                        name="creatorId"
                                        value={this.state.newPodcast.creatorId}
                                        onChange={this.onChangePodcast}
                                    />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="imageUrl">ImageURL</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="imageUrl"
                                        value={this.state.newPodcast.imageUrl}
                                        onChange={this.onChangePodcast}
                                    />
                                </div>
                                <input type="submit" value="Add Podcast" class='btn btn-success' />
                            </form>
                            <button class='btn btn-dark add-top-margin-btn' onClick={this.toggleAddForm}>
                                Go Back to Creator Profile
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        <div class='podcast-list-wrapper'>
                            {this.state.allPodcasts.map((podcast, index) => {
                                return (
                                    <div key={`t4n328on - ${index}`} class='podcast-wrapper'>
                                        <img src={podcast.imageUrl} alt='podcast cover art' height={200} width={200} class='podcast-image' />
                                        <div class='podcast-info-wrapper'>
                                            <Link to={`/podcast/${podcast._id}`} class='podcast-name'><div>{podcast.name}</div></Link>
                                            <div class='podcast-creator'>{podcast.creator}</div>
                                            <div class='podcast-info'>{podcast.genre}</div>
                                            <div class='podcast-info'>{podcast.description}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <button class='btn btn-dark' onClick={this.toggleAddForm}>
                            Create a New Podcast
                        </button>
                    </div>
                }

            </div>
        )
    }
}
