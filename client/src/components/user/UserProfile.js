import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class UserProfile extends Component {


    state = {
        user: {
            userName: '',
            password: '',
            dateJoined: '',
            following: [],
            favoritedEpisodes: [],
        },
    }

    componentDidMount() {
        this.getUserById()
    }

    getUserById = async () => {
        const userId = this.props.activeUserId
        console.log('userId', userId)
        const res = await axios.get(`/api/user/${userId}`)
        const newState = { ...this.state }
        newState.user = res.data
        this.setState(newState)
    }

    onDeleteUser = async (userId) => {
        await axios.delete(`/api/user/${userId}`)
    }

    toggleEditForm = () => {
        const showEditForm = !this.state.showEditForm
        this.setState({ showEditForm })
    }

    onChangeCurrentUser = (evt) => {
        const newState = { ...this.state }
        newState.user[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const userId = this.props.match.params.userId
            await axios.put(`/api/user/${userId}`, this.state.user)
            this.getUserProfile()
        } catch (error) {
            console.log('Failed to get user')
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                <h1>User Profile</h1>

                {this.state.showEditForm
                    ?
                    <div>
                        <h4>Edit User</h4>
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <label htmlFor="userName">Username</label>
                                <input
                                    type="text"
                                    name="userName"
                                    value={this.state.user.userName}
                                    onChange={this.onChangeCurrentUser}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="text"
                                    name="password"
                                    value={this.state.user.password}
                                    onChange={this.onChangeCurrentUser}
                                />
                            </div>
                            <Link to={'/'}>
                                <button onClick={() => this.onDeleteUser(this.props.match.params.userId)}>
                                    Delete
                                </button>
                            </Link>
                            <input type="submit" value="Save" />
                        </form>
                    </div>
                    :
                    <div>
                        <h3>Username: {this.state.user.userName}</h3>
                        <div>Joined on {this.state.user.dateJoined}</div>
                        <div>Following: {this.state.user.following}</div>
                        <div>Favorited Episodes: {this.state.user.favoritedEpisodes}</div>
                    </div>}


                <button onClick={this.toggleEditForm}>
                    {this.state.showEditForm
                        ? 'Hide Edit Form'
                        : 'Edit User Account'}
                </button>


            </div>
        )
    }
}
