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
            showTimer : false,
            initial : true,
            verificationCode : '',
            verificationCodeInput : '',
            minutes : 2,
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
        UserService.sendVerificationCodeViaEmail(
            {
                contact : this.props.location.user.email
            }
        )
        .then(response => {
            this.setState({
                initial : false,
                sendSMSClicked : false,
                showTimer: !this.state.showTimer,
                sendEmailClicked : !this.state.sendEmailClicked,
                verificationCode : response.data.verificationCode,
            })
        }).catch(() => {
            this.setState({
                errorMsg : `Възникна някаква грешка ! Моля, опитайте отново.`
            })
        })
    }

    sendCodeViaSMS() {
        UserService.sendVerificationCodeViaSMS(
            {
                contact : this.props.location.user.phone
            }
        )
        .then(response => {
            this.setState({
                initial : false,
                sendEmailClicked : false,
                showTimer: !this.state.showTimer,
                sendSMSClicked : !this.state.sendSMSClicked,
                verificationCode : response.data.verificationCode
            })
        }).catch(() => {
            this.setState({
                errorMsg : `Възникна някаква грешка ! Моля, опитайте отново.`
            })
        })
    }

    resendCodeViaEmail() {
        UserService.sendVerificationCodeViaEmail(
            {
                contact : this.props.location.user.email
            }
        )
        .then(response => {
            this.setState({
                resendSMSClicked : false,
                resendEmailClicked : true,
                showTimer: !this.state.showTimer,
                verificationCode : response.data.verificationCode,
                minutes : 2,
                seconds : 0
            })
        })
    }

    resendCodeViaSMS() {
        UserService.sendVerificationCodeViaSMS(
            {
                contact : this.props.location.user.phone
            }
        )
        .then(response => {
            this.setState({
                resendSMSClicked : true,
                resendEmailClicked : false,
                showTimer: !this.state.showTimer,
                verificationCode : response.data.verificationCode,
                minutes : 2,
                seconds : 0
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
                    this.props.history.push(`/post/article`)
                }
                else if(response.data.role === 'ADMIN') {
                    this.props.history.push(`/invite`)
                }
            }).catch(error => {
                this.setState({
                    errorMsg : `Възникна някаква грешка ! Моля, опитайте отново.`
                })
            })
        }
        else {
            this.setState({
                errorMsg : `Невалиден код за верификация !`
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
        return phoneNumber[0] + phoneNumber[1] + phoneNumber[2] + phoneNumber[3] + "*".repeat(phoneNumber.length - 7) + phoneNumber.slice(-3);
    }

    render() {
        return (
            <div className="verification">
                {this.state.errorMsg !== '' && 
                <div className="alert alert-danger alert-dismissible" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong>{this.state.errorMsg}</strong>
                </div>} 
                <h1>Логин Верификация</h1>
                <p>За да продължите напред, е необходимо да изберете как искаш да получите своя код за верификация чрез една от двете възможни опции:</p>
                <div className="verificationOptions">
                    <label>
                        <input type="radio" className="option-input radio" id="v1" name="example" onClick ={this.selectEmailOption}/>
                        Чрез имейл
                    </label>
                    {
                        this.state.emailOption && 
                        <>
                            <p>
                                Ще получите код за верификация на вашия имейл адрес : <i>({this.hideEmail(this.props.location.user.email)}).</i><br/>
                                Моля, изполвайте този код за да верифицирате своята самоличност !</p>
                            <button className="emailButton" type="submit" align="center" 
                                disabled={this.state.sendEmailClicked} onClick={this.sendCodeViaEmail}>Изпрати Имейл</button>
                        </>
                    }
                    <label>
                        <input type="radio" className="option-input radio" id="v2" name="example" onClick ={this.selectSMSOption}/>
                        Чрез SMS
                    </label>
                    {
                        this.state.smsOption && 
                        <>
                            <p>
                            Ще получите код за верификация на вашия телефонен номер : <i>({this.hidePhoneNumber(this.props.location.user.phone)}).</i><br/>
                            Моля, изполвайте този код за да верифицирате своята самоличност !</p>
                            <button disabled={this.state.sendSMSClicked} className="smsButton" type="submit" align="center" onClick={this.sendCodeViaSMS}>Send SMS</button>
                        </>
                    }
                    {
                    this.state.sendEmailClicked && 
                        <div className="emailIsSent">
                            Кодът за верификация беше изпратен на вашият имейл адрес ! <br/>
                            Моля проверете имейла си и използвайте полученият код в полето, показано отдолу. <br/>
                            <div className="row">
                                <p>Не получихте имейл ?</p> 
                                <button className="codeNotReceivedBtn" onClick={this.resendCodeViaEmail}><i>Изпрати отново</i></button>
                            </div>
                        </div>
                    }
                    {
                    this.state.sendSMSClicked &&  
                        <div className="smsIsSent">
                            Кодът за верификация беше изпратен на вашият телефонен номер ! <br/>
                            Моля проверете мобилния си телефон си и използвайте полученият код в полето, показано отдолу. <br/>
                            <div className="row">
                                <p>Не получихте SMS ?</p> 
                                <button className="codeNotReceivedBtn" onClick={this.resendCodeViaSMS}><i>Изпрати отново</i></button>
                            </div>
                        </div>
                    }
                    {
                        (this.state.showTimer) 
                        && <VerificationCodeExpirationTimer seconds = {this.state.seconds} minutes = {this.state.minutes}/>
                    }
                    {
                        (!this.state.showTimer && !this.state.initial) 
                        && <VerificationCodeExpirationTimer seconds = {this.state.seconds} minutes = {this.state.minutes}/>
                    }
                    <div className="row">
                        <div className="col">
                            <input className="form-control" type="text" name="verificationCode" autoComplete="off"
                                onChange={this.updateVerificationCodeInput} placeholder="Код за верификация"></input>
                        </div>
                        <div className="col">
                            <button className="submitCodeButton" type="submit" onClick={this.submitVerificationCode}><span>Продължи</span></button>
                        </div>
                    </div>
                </div>
            </div>                              
        )
    }
}

export default VerificationComponent