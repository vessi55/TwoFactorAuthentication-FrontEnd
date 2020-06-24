import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">Hi, {this.props.match.params.email} , welcome to the home page !!!</div>
                <div align="center">You can manage your users <Link to="/invitations">here.</Link></div>
            </>
        )
    }
}

export default WelcomeComponent