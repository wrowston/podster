import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class AllUsers extends Component {

    state = {
        allUsers: []
    }

    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers = async () => {
        try {
            const res = await axios.get('/api/user')
            const newState = { ...this.state }
            newState.allUsers = res.data
            this.setState(newState)
        } catch (error) {
            console.log('Failed to get all users')
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                {this.state.allUsers.map((user, index) => {
                    return (
                        <div key={`ht6wb645 - ${index}`}>
                            <Link to={`/user/${user._id}`}><h3>{user.userName}</h3></Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}
