import React, {Component} from 'react'

import UserService from '../../services/User/UserService.js'
import AuthenticationService from '../../services/Authentication/AuthenticationService.js';
import VerificationCodeExpirationTimer from '../Utils/VerificationCodeExpirationTimer.js';

import './VerificationComponent.css'

class VerificationComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailOption : false,
            smsOption : false,
            sendEmailClicked : false,
            sendSMSClicked : false,
            resendEmailClicked : false,
            resendSMSClicked : false,
            verificationCode : '',
            verificationCodeInput : '',
            minutes : 1,
            seconds : 0,
            errorMsg : ''
        }

        this.selectEmailOption = this.selectEmailOption.bind(this)
        this.selectSMSOption = this.selectSMSOption.bind(this)
        this.sendCodeViaEmail = this.sendCodeViaEmail.bind(this)
        this.sendCodeViaSMS = this.sendCodeViaSMS.bind(this)
        this.resendCodeViaEmail = this.resendCodeViaEmail.bind(this)
        this.resendCodeViaSMS = this.resendCodeViaSMS.bind(this)
        this.hideEmail = this.hideEmail.bind(this)
        this.hidePhoneNumber = this.hidePhoneNumber.bind(this)
        this.submitVerificationCode = this.submitVerificationCode.bind(this)
        this.updateVerificationCodeInput = this.updateVerificationCodeInput.bind(this);
    }

    selectEmailOption(){
        this.setState({
            emailOption : !this.state.emailOption,
            smsOption : false,
            sendEmailClicked : false,
            sendSMSClicked : false
        })
    }

    selectSMSOption(){
        this.setState({
            smsOption : !this.state.smsOption,
            emailOption : false,
            sendEmailClicked : false,
            sendSMSClicked : false
        })
    }

    sendCodeViaEmail() {
        UserService.sendVerificationCodeViaEmail(this.props.location.user.email)
        .then(response => {
            this.setState({
                sendSMSClicked : false,
                sendEmailClicked : !this.state.sendEmailClicked,
                verificationCode : response.data.verificationCode,
            })
        }).catch(error => {
            this.setState({
                errorMsg : error.response.data.message
            })
        })
    }

    sendCodeViaSMS() {
        UserService.sendVerificationCodeViaSMS(this.props.location.user.phone)
        .then(response => {
            this.setState({
                sendEmailClicked : false,
                sendSMSClicked : !this.state.sendSMSClicked,
                verificationCode : response.data.verificationCode
            })
        }).catch(error => {
            this.setState({
                errorMsg : error.response.data.message
            })
        })
    }

    resendCodeViaEmail() {
        UserService.sendVerificationCodeViaEmail(this.props.location.user.email)
        .then(response => {
            this.setState({
                resendSMSClicked : false,
                resendEmailClicked : !this.state.resendEmailClicked,
                verificationCode : response.data.verificationCode
            })
        })
    }

    resendCodeViaSMS() {
        UserService.sendVerificationCodeViaSMS(this.props.location.user.phone)
        .then(response => {
            this.setState({
                resendEmailClicked : false,
                resendSMSClicked : !this.state.resendSMSClicked,
                verificationCode : response.data.verificationCode
            })
        })
    }

    submitVerificationCode() {

        if(this.state.verificationCodeInput === this.state.verificationCode) {
            UserService.submitLoginVerificationCode(
                {
                    email : this.props.location.user.email,
                    verificationCode : this.state.verificationCode
                } 
            ).then(response => {
                AuthenticationService.successfulLoginVerification(response.data.token)

                if(response.data.role === 'USER') {
                    this.props.history.push(`/welcome/${response.data.email}`)
                }
                else if(response.data.role === 'ADMIN') {
                    this.props.history.push('/invite')
                }
            }).catch(error => {
                this.setState({
                    errorMsg : error.response.data.message
                })
            })
        }
        else {
            this.setState({
                errorMsg : "Invalid Verification Code !"
            })
        }
        
    }

    updateVerificationCodeInput(event){
        this.setState({
            verificationCodeInput : event.target.value
        })
    }

    hideEmail(email) {
        var parts = email.split("@"), len = parts[0].length;
        return email.replace(parts[0].slice(1,-1), "*".repeat(len - 2));
    }

    hidePhoneNumber(phoneNumber) {
        return phoneNumber[0] + "*".repeat(phoneNumber.length - 4) + phoneNumber.slice(-3);
    }

    render() {
        return (
            <div className="verification">
                {this.state.errorMsg !== '' && 
                <div className="alert alert-danger alert-dismissible" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong>{this.state.errorMsg}</strong>
                </div>} 
                <h1>Login Verification</h1>
                <p>To continue logging in, we need you to complete one of the following:</p>
                <div className="verificationOptions">
                    <label>
                        <input type="radio" className="option-input radio" name="example" onClick ={this.selectEmailOption}/>
                        Verification Code via Email
                    </label>
                    {
                        this.state.emailOption && 
                        <>
                            <p>
                                We'll send a code to your contact email address {this.hideEmail(this.props.location.user.email)}<br/>
                                Please use this verification code to verify your identity.
                            </p>
                            <button className="emailButton" type="submit" align="center" 
                                disabled={this.state.sendEmailClicked} onClick={this.sendCodeViaEmail}>Send Email</button>
                        </>
                    }
                    <label>
                        <input type="radio" className="option-input radio" name="example" onClick ={this.selectSMSOption}/>
                        Verification Code via SMS
                    </label>
                    {
                        this.state.smsOption && 
                        <>
                            <p>
                                We'll send a code to your contact mobile phone {this.hidePhoneNumber(this.props.location.user.phone)}. <br/>
                                Please use this verification code to verify your identity.
                            </p>
                            <button disabled={this.state.sendSMSClicked} className="smsButton" type="submit" align="center" onClick={this.sendCodeViaSMS}>Send SMS</button>
                        </>
                    }
                    {
                    this.state.sendEmailClicked && 
                        <div className="emailIsSent">
                            Verification Code has been sent to your email ! <br/>
                            Please check your email and submit the verification code in the box below. <br/>
                            <div className="row">
                                <p>Didn't get the email ?</p> 
                                <button className="codeNotReceivedBtn" onClick={this.resendCodeViaEmail}><i>Resend Code</i></button>
                            </div>
                        </div>
                    }
                    {
                    this.state.sendSMSClicked && 
                        <div className="smsIsSent">
                            Verification code has been sent to you phone ! <br/>
                            Please check your phone and submit the verification code in the box below. <br/>
                            <div className="row">
                                <p>Didn't get the SMS ?</p> 
                                <button className="codeNotReceivedBtn" onClick={this.resendCodeViaSMS}><i>Resend Code</i></button>
                            </div>
                        </div>
                    }
                    {
                        (this.state.sendEmailClicked || this.state.sendSMSClicked) 
                        && <VerificationCodeExpirationTimer seconds = {this.state.seconds} minutes = {this.state.minutes}/>
                    }
                    <div className="row">
                        <div className="col">
                            <input className="form-control" type="text" name="verificationCode" autoComplete="off"
                                onChange={this.updateVerificationCodeInput} placeholder="Verification Code"></input>
                        </div>
                        <div className="col">
                            <button className="submitCodeButton" type="submit" onClick={this.submitVerificationCode}><span>SUBMIT</span></button>
                        </div>
                    </div>
                </div>
            </div>                              
        )
    }
}

export default VerificationComponent