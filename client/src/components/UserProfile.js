import React, { Component } from 'react'

export default class UserProfile extends Component {
    getUserById = async () => {
        const userId = this.props.match.params.userId
        console.log('userId', userId)
        const res = await axios.get(`/api/user/${userId}`)
        const newState = { ...this.state }
        newState.user = res.data
        this.setState(newState)
    }

    render() {
        return (
            <div>
                <h1>User Profile</h1>

                <div>Username: </div>
                <div>Joined on </div>
            </div>
        )
    }
}
