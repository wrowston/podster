import React, { Component } from 'react'
import axios from 'axios'

export default class NewUser extends Component {

    state = {
        user: {
            userName: '',
            password: ''
        }
    }

    handleChange = (evt) => {
        const newState = { ...this.state }
        newState.user[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try {
            await axios.post('/api/user', this.state.user)
            console.log('created new user account')
        } catch (err) {
            console.log('Failed to create a user account')
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor='userName'>Username</label>
                        <input
                            type='text'
                            name='userName'
                            onChange={this.handleChange}
                            value={this.state.user.userName} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            onChange={this.handleChange}
                            value={this.state.user.password} />
                    </div>
                    <input type='submit' value='Create Account' />
                </form>

            </div>
        )
    }
}
