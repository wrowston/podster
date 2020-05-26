import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { uploadCommonFile, deleteCommonFile } from '../../firebase/firebase.js'


const moment = require('moment')

export default class AllEpisodes extends Component {

    state = {
        episode: {
            name: '',
            description: '',
            podcastId: this.props.podcastId,
            audioFile: '',
            audioUrl: '',
            dateUploaded: moment().format('L')
        },
        allEpisodes: [],
        showUploadForm: false,
        play: false
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

    toggleUploadForm = () => {
        const showUploadForm = !this.state.showUploadForm
        this.setState({ showUploadForm })
    }

    onUrlsChange = (audioUrl) => {
        const newState = { ...this.state }
        newState.episode.audioUrl = audioUrl
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
        // grab first audio selected
        const selectedAudio = evt.target.files[0]
        if (!selectedAudio) {
            return;
        }

        // try to upload audio to firebase
        try {
            const uploadSnapshot = await uploadCommonFile(selectedAudio);
            // get  full url of audio after it is uploaded
            const downloadURL = await uploadSnapshot.ref.getDownloadURL();

            // lets add the new URL to the array
            const currentAudioURls = this.props.audioURLs || [];
            const newAudioURLs = [...currentAudioURls, downloadURL];
            // lets called the passed function for parent
            this.onUrlsChange(downloadURL);
            console.log('downloadURL', downloadURL);
        } catch (err) {
            console.error('failed to upload audio');
            console.error(err);
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
                <table class='table'>
                    <thead class="thead-dark">
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Audio</th>
                    </thead>
                    <tbody>
                        {this.state.allEpisodes.map((episode, index) => {
                            return (
                                <tr key={`45745gwg - ${index}`}>
                                    <td>
                                        <Link
                                            to={`/episode/${episode._id}`}
                                            class='episode-name'>
                                            <div>{episode.name}</div>
                                        </Link>
                                    </td>
                                    <td class='episode-info'>{episode.dateUploaded}</td>
                                    <td>
                                        <audio controls
                                            src={episode.audioUrl}
                                            class='episode-audio'></audio>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>


                {this.state.showUploadForm ?
                    <div>
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
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={this.state.episode.description}
                                    onChange={this.onChangeEpisode}
                                />
                            </div>
                            <div>
                                <input
                                    type="hidden"
                                    name="dateUploaded"
                                    value={this.state.episode.dateUploaded}
                                    onChange={this.onChangeEpisode}
                                />
                            </div>
                            <div>
                                <label htmlFor="audioFile">Audio File</label>
                                <input
                                    type="file"
                                    name="audioFile"
                                    value={this.state.episode.audioFile}
                                    onChange={this.onFileSelect}
                                />
                            </div>
                            <div>
                                <input
                                    type="hidden"
                                    name="audioUrl"
                                    value={this.state.episode.audaudioUrlioFile}
                                    onChange={this.onChangeEpisode}
                                />
                            </div>
                            <div>
                                <input
                                    type="hidden"
                                    name="podcastId"
                                    value={this.state.episode.podcastId}
                                    onChange={this.onChangeEpisode}
                                />
                            </div>
                            <input type="submit" value="Add Episode" />
                        </form>
                    </div>
                    :
                    null
                }

                <button onClick={this.toggleUploadForm}>
                    {this.state.showUploadForm
                        ? 'Hide Upload Form'
                        : 'Upload a New Episode'}
                </button>

            </div>
        )
    }
}
