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
                <h2 className='add-margin'>Creators</h2>
                <div className='creator-list'>
                    {this.state.allCreators.map((creator, index) => {
                        return (
                            <div key={`ht6wb645 - ${index}`}>
                                <Link
                                    to={`/creator/${creator._id}`}
                                    className="list-group-item list-group-item-action list-group-item-dark">
                                    <div>{creator.name}</div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
