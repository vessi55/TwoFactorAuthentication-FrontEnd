import React, {Component} from 'react'

import VerificationOptionsComponent from './VerificationOptionsComponent';
import VerificationCodeGeneratorComponent from './VerificationCodeGeneratorComponent';

import './VerificationComponent.css'

class VerificationComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMsg : ''
        }
    }

    render() {

        return (
            <div className="verification">
                <h1>Login Verification</h1>
                <p>To continue logging in, we need you to complete one of the following:</p>
                <img></img>
                <VerificationOptionsComponent></VerificationOptionsComponent>
                <VerificationCodeGeneratorComponent></VerificationCodeGeneratorComponent>
            </div>                              
        )
    }
}

export default VerificationComponent