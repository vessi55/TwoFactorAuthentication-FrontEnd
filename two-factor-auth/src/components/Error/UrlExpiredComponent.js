import React, {Component} from 'react'

import UrlExpiredImg from '../../images/expiredImg.png'
import UrlExpiredText from '../../images/expiredTxt.png'

import './UrlExpiredComponent.css'

class UrlExpiredComponent extends Component {

    constructor(props) {
        super(props)

        this.backToLogin = this.backToLogin.bind(this)
    }

    backToLogin() {
        this.props.history.push(`/login`)
    }

    render() {
        return (
            <div className="urlExpiredPage">
                <div className="form-row">
                    <div className="form-group col-md-6 col-sm-8">
                        <img className="urlExpiredImg" src={UrlExpiredImg} alt="expired"></img>
                    </div>
                    <div className="form-group col-md-4 col-sm-8">
                        <img className="urlExpiredTxt" src={UrlExpiredText} alt="expired"></img>
                        <button type="submit" className="backToLoginBtn" onClick={this.backToLogin}>
                            <span>Back To Login</span></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UrlExpiredComponent