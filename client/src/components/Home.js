import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Podster Home Page</h1>
                <Link to='/userSignUp'>
                    <button>
                        Sign Up
                    </button>
                </Link>

                <Link to='/login'>
                    <button>
                        Log In
                    </button>
                </Link>

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
