import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class NewCreator extends Component {

    state = {
        creator: {
            name: '',
            userName: '',
            password: ''
        },
        redirect: false
    }

    handleChange = (evt) => {
        const newState = { ...this.state }
        newState.creator[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onSubmit = async (evt) => {
        evt.preventDefault()
        try {
            await axios.post('/api/creator', this.state.creator)
            console.log('created new creator account')
        } catch (err) {
            console.log('Failed to create a creator account')
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            name='name'
                            onChange={this.handleChange}
                            value={this.state.creator.name} />
                    </div>
                    <div>
                        <label htmlFor='userName'>Username</label>
                        <input
                            type='text'
                            name='userName'
                            onChange={this.handleChange}
                            value={this.state.creator.userName} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            onChange={this.handleChange}
                            value={this.state.creator.password} />
                    </div>
                    <input type='submit' value='Create Account' />
                </form>

            </div>
        )
    }
}
