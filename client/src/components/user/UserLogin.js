import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import UserView from './UserView'

export default class UserLogin extends Component {
    state = {
        user: {
            userName: '',
            password: ''
        },
        allUsers: [],
        redirect: false,
        login: false,
        activeUserId: ''
    }

    componentDidMount() {
        this.getAllUsers()
    }

    handleChange = (evt) => {
        const userLoggingIn = { ...this.state.user }
        userLoggingIn[evt.target.name] = evt.target.value
        this.setState({ user: userLoggingIn })
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

    onLogin = (evt) => {
        evt.preventDefault()
        this.state.allUsers.forEach((user, index) => {
            const newState = { ...this.state }
            if (this.state.user.userName === user.userName &&
                this.state.user.password === user.password) {
                newState.login = true
                newState.activeUserId = user._id
                this.setState(newState)
            }
        })
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/podcast" />)
        }

        return (
            <div>
                {this.state.login
                    ? <UserView activeUserId={this.state.activeUserId} />
                    :
                    <form onSubmit={this.onLogin}>
                        <div>
                            <label htmlFor="userName">Username</label>
                            <input
                                type="text"
                                name="userName"
                                onChange={this.handleChange}
                                value={this.state.user.userName} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                                value={this.state.user.password}
                            />
                        </div>
                        <button>Log In</button>
                    </form>}
            </div>
        )
    }
}
