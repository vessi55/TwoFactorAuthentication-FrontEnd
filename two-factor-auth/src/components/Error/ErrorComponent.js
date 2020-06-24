import React, {Component} from 'react'

import ErrorPage from '../../images/error3.png'

import './ErrorComponent.css'

class ErrorComponent extends Component {

    render() {
        return (
            <div className="errorPage">
                <img src={ErrorPage}></img>
            </div>
        )
    }
}

export default ErrorComponent