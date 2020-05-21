import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Podster Home Page</h1>
                <Link>
                    <button>
                        Sign Up
                    </button>
                </Link>

                <Link>
                    <button>
                        Sign In
                    </button>
                </Link>

                <Link>
                    <button>
                        Become a Creator
                    </button>
                </Link>
            </div>
        )
    }
}
