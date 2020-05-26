import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

export default class UserView extends Component {
    render() {
        return (
            <div>
                <nav>
                    <Link to='/'>Home</Link>
                    <Link to='/explore'>Explore</Link>
                    <Link to='/creators'>Creators</Link>
                    <Link to='/users'>Users</Link>
                    <Link to={`/user/${this.props.activeUserId}`}>User Profile</Link>
                </nav>

            </div>
        )
    }
}
