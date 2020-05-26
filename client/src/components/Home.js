import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Podster Home Page</h1>
                <Link to='/creatorSignUp'>
                    <button>
                        Become a Creator
                    </button>
                </Link>

                <Link to='/explore'>
                    <button>
                        Continue as a Guest
                    </button>
                </Link>
            </div>
        )
    }
}
