import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AllPodcastsByCreator from '../podcast/AllPodcastsByCreator.js'

export default class CreatorProfile extends Component {

    state = {
        creator: {
            name: ''
        },
        showEditForm: false
    }

    componentDidMount() {
        this.getCreatorProfile()
    }

    getCreatorProfile = async () => {
        const creatorId = this.props.match.params.creatorId
        const res = await axios.get(`/api/creator/${creatorId}`)
        const newState = { ...this.state }
        newState.creator = res.data
        this.setState(newState)
    }

    onDeleteCreator = async (creatorId) => {
        await axios.delete(`/api/creator/${creatorId}`)
    }

    toggleEditForm = () => {
        const showEditForm = !this.state.showEditForm
        this.setState({ showEditForm })
    }

    onChangeCurrentCreator = (evt) => {
        const newState = { ...this.state }
        newState.creator[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const creatorId = this.props.match.params.creatorId
            await axios.put(`/api/creator/${creatorId}`, this.state.creator)
            this.getCreatorProfile()
        } catch (error) {
            console.log('Failed to get creator')
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                <h4 class='add-margin'>Creator Profile</h4>

                {this.state.showEditForm
                    ?
                    <div>
                        <h4>Edit Creator</h4>
                        <div class='form-wrapper'>
                            <form onSubmit={this.onSubmit}>
                                <div class="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        class="form-control"
                                        value={this.state.creator.name}
                                        onChange={this.onChangeCurrentCreator}
                                    />
                                </div>
                                <Link to={`/creator/${this.props.match.params.creatorId}`}>
                                    <input type="submit" value="Save" class='btn btn-success' />
                                </Link>
                                <Link to={'/'}>
                                    <button
                                        class='btn btn-danger add-margin'
                                        onClick={() => this.onDeleteCreator(this.props.match.params.creatorId)}>
                                        Delete
                                </button>
                                </Link>
                            </form>
                        </div>
                    </div>
                    :
                    <div>
                        <h2>{this.state.creator.name}</h2>
                        <AllPodcastsByCreator
                            creatorId={this.props.match.params.creatorId}
                            showEditForm={this.state.showEditForm}
                            toggleEditForm={this.toggleEditForm} />
                    </div>}

                <button
                    class='btn btn-dark add-top-margin-btn'
                    onClick={this.toggleEditForm}>
                    {this.state.showEditForm
                        ? 'Hide Edit Creator Account Form'
                        : 'Edit Creator Account'}
                </button>
            </div>
        )
    }
}
