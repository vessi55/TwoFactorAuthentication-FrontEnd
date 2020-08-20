import React, {Component} from 'react'
import { Formik, Form, Field } from "formik";

import UserService from '../../services/User/UserService.js'
import InvitationService from '../../services/Invitation/InvitationService.js'

import './RegisterComponent.css'

class RegisterComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id : this.props.match.params.id,
            email : '',
            firstName : '',
            lastName : '',
            password : '',
            repeatPassword : '',
            gender : '',
            phoneNumber : '',
            verificationCode : '',
            errorMsg : ''
        }

        this.onRegisterClick = this.onRegisterClick.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        InvitationService.checkIfSetUpAccountLinkIsValid(this.props.match.params.id)
        .then(response => {
            if(response.data.urlExpired === true) {
                this.props.history.push(`/expired`)
            }
        })

        InvitationService.getInvitationById(this.state.id)
        .then(response => {
            this.setState({
                email : response.data.email
            })
        })
    }

    onRegisterClick(values) {
        UserService.registerUser(
            {
                firstName : values.firstName,
                lastName : values.lastName,
                email : values.email,
                password : values.password,
                repeatPassword : values.repeatPassword,
                phone : values.phone, 
                gender : values.inlineMaterialRadiosExample,
                verificationCode : values.verificationCode
            }   
        )
        .then(() => { 
            this.props.history.push(`/login`)
        })
        .catch(error => {
            this.setState({
                errorMsg : error.response.data.message
            })
        })
    }

    validate(values) {
        let errors = {}

        if(!values.firstName) {
            errors.firstName = '* First Name Required'
        } 
        if(!values.lastName) {
            errors.lastName = '* Last Name Required'
        } 
        if(!values.password) {
            errors.password = '* Password Required'
        } 
        if(!values.repeatPassword) {
            errors.repeatPassword = '* Password Required'
        } 
        if(!values.phoneNumber) {
            errors.phoneNumber = '* Phone Number Required'
        } 
        if(!values.verificationCode) {
            errors.verificationCode = '* Verification Code Required'
        }
        if(values.password !== values.repeatPassword) {
            errors.repeatPassword = 'Passwords DO NOT Match !'
        }
        
        return errors
    }

    render() {

        let {email, firstName, lastName, password, repeatPassword, gender, phoneNumber, verificationCode} = this.state

        return (
            
            <div className="register">
                <h1></h1>
                <Formik 
                    initialValues={{email, firstName, lastName, password, repeatPassword, gender, phoneNumber, verificationCode}}
                    onSubmit={this.onRegisterClick}
                    validateOnCFhange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                    > 
                    {
                        ({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label><b>Email</b></label><br/>
                                    <div className="emailIcon">
                                        <i className="fa fa-envelope fa-lg fa-fw leftSide"></i>
                                        <Field className="registerEmail" type="text" name="email" disabled={true}></Field>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label><b>First Name</b></label><br/>
                                        <div className="userIcon">
                                            <Field className="registerFirstName" type="text" name="firstName" ></Field>
                                            <i className="fa fa-user fa-lg fa-fw"></i>
                                        </div>
                                        {touched.firstName && errors.firstName && <div className="errorField">{errors.firstName}</div>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label><b>Last Name</b></label><br/>
                                        <div className="userIcon">
                                            <i className="fa fa-user fa-lg fa-fw"></i>
                                            <Field className="registerLastName" type="text" name="lastName" ></Field>
                                        </div>
                                        {touched.lastName && errors.lastName && <div className="errorField">{errors.lastName}</div>}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="genderLabel"><b>Gender</b></label><br/>
                                        <div className="genderIcon">
                                            <i className="fa fa-venus-mars fa-lg fa-fw"></i>
                                        </div>
                                        <div className="form-check">
                                            <Field type="radio" className="form-check-input" id="materialInline1" 
                                            name="inlineMaterialRadiosExample"></Field>
                                            <label className="radio-inline" checked="checked">Male</label>
                                        </div>
                                        <div className="form-check">
                                            <Field type="radio" className="form-check-input" id="materialInline2" 
                                            name="inlineMaterialRadiosExample"></Field>
                                            <label className="radio-inline">Female</label>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label><b>Phone Number</b></label><br/>
                                        <div className="phoneIcon">
                                            <i className="fa fa-phone fa-lg fa-fw"></i>
                                            <Field className="registerPhone" type="text" name="phoneNumber"></Field>
                                        </div>
                                        {touched.phoneNumber && errors.phoneNumber && <div className="errorField">{errors.phoneNumber}</div>}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label><b>Password</b></label><br/>
                                        <div className="passIcon">
                                            <i className="fa fa-lock fa-lg fa-fw"></i>
                                            <Field className="registerPass" type="password" name="password" ></Field>
                                        </div>
                                        {touched.password && errors.password && <div className="errorField">{errors.password}</div>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label><b>Confirm Password</b></label><br/>
                                        <div className="passIcon">
                                            <i className="fa fa-lock fa-lg fa-fw" ></i>
                                            <Field className="registerConfirmPass" type="password" name="repeatPassword" ></Field>
                                        </div> 
                                        {touched.repeatPassword && errors.repeatPassword && <div className="errorField">{errors.repeatPassword}</div>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label><b>Verification Code</b></label><br/>
                                    <p className="codeMsg">( P.S. For your security, this verification code will expire in 24 hours )</p>
                                    <div className="codeIcon">
                                        <Field className="registerCode" type="text" name="verificationCode"></Field>
                                        <i className="fa fa-key fa-lg fa-fw"></i>
                                    </div>
                                    {touched.verificationCode && errors.verificationCode && <div className="errorField">{errors.verificationCode}</div>}
                                </div>
                                <button className="registerButton" type="submit" align="center"><span>REGISTER</span></button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        )
    }
}

export default RegisterComponent