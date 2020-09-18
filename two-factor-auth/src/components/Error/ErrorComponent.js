import React, {Component} from 'react'

import ErrorPage from '../../images/error.png'

import './ErrorComponent.css'

class ErrorComponent extends Component {

    render() {
        return (
            <div className="errorPage">
                <img src={ErrorPage} alt="error"></img>
            </div>
        )
    }
}

export default ErrorComponent