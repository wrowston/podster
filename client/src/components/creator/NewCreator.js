import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class NewCreator extends Component {

    state = {
        creator: {
            name: ''
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
            <div class='form-wrapper'>
                <form onSubmit={this.onSubmit}>
                    <div class="form-group">
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            class='form-control'
                            name='name'
                            onChange={this.handleChange}
                            value={this.state.creator.name} />
                    </div>
                    <input type='submit' value='Create Account' class='btn btn-success' />
                </form>

            </div>
        )
    }
}
