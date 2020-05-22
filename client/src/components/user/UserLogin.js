import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class UserLogin extends Component {
    state = {
        user: {
            userName: '',
            password: ''
        },
        redirect: false
    }

    handleChange = (evt) => {
        const updatedUser = { ...this.state.user }
        updatedUser[evt.target.name] = evt.target.value
        this.setState({ user: updatedUser })
    }

    onSubmit = (evt) => {
        evt.prevetnDefault()
        const newState = { ...this.state }
        newState.redirect = true
        this.props.setUserName(this.state.user.userName)
        this.setState(newState)
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/userProfile" />)
        }

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor="userName">User Name</label>
                        <input type="text" name="userName" onChange={this.handleChange} value={this.state.user.userName} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" />
                    </div>
                    <button>Log In</button>
                </form>
            </div>
        )
    }
}
