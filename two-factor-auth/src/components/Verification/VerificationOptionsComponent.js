import React, {Component} from 'react'

import UserService from '../../services/User/UserService.js'

import './VerificationOptionsComponent.css'

class VerificationOptionsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailOption: false,
            smsOption: false,
            verificationCode: ''
        }

        this.selectEmailOption = this.selectEmailOption.bind(this)
        this.selectSMSOption = this.selectSMSOption.bind(this)
    }

    selectEmailOption(){
        this.setState({
            emailOption: !this.state.emailOption,
            smsOption: false
        })
    }

    selectSMSOption(){
        this.setState({
            smsOption: !this.state.smsOption,
            emailOption: false
        })
    }

    sendCodeViaEmail(email) {
        UserService.sendVerificationCodeViaEmail(email)
        .then(
            response => {
                this.setState({
                    verificationCode: response.data.verificationCode
                })
            }
        )
    }

    sendCodeViaSMS(phone) {
        UserService.sendVerificationCodeViaSMS(phone)
        .then(
            response => {
                this.setState({
                    verificationCode: response.data.verificationCode
                })
            }
        )
    }

    render() {

        return (
            <div className="verificationOptions">
                <label>
                    <input type="radio" class="option-input radio" name="example" onClick ={() => {this.selectEmailOption()}}/>
                    Verification Code via Email
                </label>
                {
                    this.state.emailOption && 
                    <>
                        <p>
                            We'll send a code to your contact email address (v**********@g****.com). <br/>
                            Please select the correct verification code to verify your identity.
                        </p>
                        <button className="emailButton" type="submit" align="center" onClick={this.sendCodeViaEmail}>Send Email</button>
                    </>
                }
                <label>
                    <input type="radio" class="option-input radio" name="example" onClick ={() => {this.selectSMSOption()}}/>
                    Verification Code via SMS
                </label>
                {
                    this.state.smsOption && 
                    <>
                        <p>
                            We'll send a code to your mobile phone (08xxxxxx96). <br/>
                            Please select the correct verification code to verify your identity.
                        </p>
                        <button className="smsButton" type="submit" align="center" onClick={this.sendCodeViaSMS}>Send SMS</button>
                    </>
                }
            </div>                  
        )
    }
}

export default VerificationOptionsComponent