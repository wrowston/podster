import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Podster Home Page</h1>
                <Link to='/creatorSignUp'>
                    <button type="button" class="btn btn-dark">
                        Become a Creator
                    </button>
                </Link>

                <Link to='/explore'>

                    <button type="button" class="btn btn-dark add-margin">
                        Continue as a Guest
                    </button>
                </Link>
            </div>
        )
    }
}
