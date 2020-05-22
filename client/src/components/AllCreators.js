import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class AllCreators extends Component {

    state = {
        allCreators: []
    }

    componentDidMount() {
        this.getAllCreators()
    }

    getAllCreators = async () => {
        try {
            const res = await axios.get('/api/creator')
            const newState = { ...this.state }
            newState.allCreators = res.data
            this.setState(newState)
        } catch (error) {
            console.log('Failed to get all creators')
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                <h2>Creators</h2>
                {this.state.allCreators.map((creator, index) => {
                    return (
                        <div key={`ht6wb645 - ${index}`}>
                            <h3>{creator.name}</h3>
                        </div>
                    )
                })}
            </div>
        )
    }
}
