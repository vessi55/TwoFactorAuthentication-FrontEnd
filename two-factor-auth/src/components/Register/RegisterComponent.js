import React, {Component} from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";

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
            confirmPassword : '',
            gender : '',
            phoneNumber : '',
            veerificationCode : ''
        }

        this.onRegisterClick = this.onRegisterClick.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        InvitationService.getInvitationById(this.state.id)
        .then(
            response => {
                this.setState({
                    email: response.data.email
                })
            }
        )
    }

    onRegisterClick(values) {
        console.log(values)
    }

    validate(values) {
        let errors = {}

        if(!values.firstName) {
            errors.firstName = 'Please enter a first name'
        } 
        if(!values.lastName) {
            errors.lastName = 'Please enter a last name'
        } 
        if(!values.password) {
            errors.password = 'Please enter a password'
        } 
        if(!values.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password'
        } 
        if(!values.gender) {
            errors.gender = 'Please select a gender'
        }
        if(!values.phoneNumber) {
            errors.phoneNumber = 'Please enter a phone number'
        } 
        if(!values.verificationCode) {
            errors.verificationCode = 'Please enter a verification code'
        }
        
        return errors
    }

    render() {

        let {email, firstName, lastName, password, confirmPassword, gender, phoneNumber, verificationCode} = this.state

        return (
            
            <div className="register">
                <h1></h1>
                <Formik 
                    initialValues={{email, firstName, lastName, password, confirmPassword, gender, phoneNumber, verificationCode}}
                    onSubmit={this.onRegisterClick}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                    > 
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="email" component="div" className="alert alert-warning"></ErrorMessage>
                                <ErrorMessage name="firstName" component="div" className="alert alert-warning"></ErrorMessage>
                                <ErrorMessage name="lastName" component="div" className="alert alert-warning"></ErrorMessage>
                                <ErrorMessage name="password" component="div" className="alert alert-warning"></ErrorMessage>
                                <ErrorMessage name="confirmPassword" component="div" className="alert alert-warning"></ErrorMessage>
                                <ErrorMessage name="phoneNumber" component="div" className="alert alert-warning"></ErrorMessage>
                                <ErrorMessage name="verificationCode" component="div" className="alert alert-warning"></ErrorMessage>
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
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label><b>Last Name</b></label><br/>
                                        <div className="userIcon">
                                            <i className="fa fa-user fa-lg fa-fw"></i>
                                            <Field className="registerLastName" type="text" name="lastName" ></Field>
                                        </div>
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
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label><b>Password</b></label><br/>
                                        <div className="passIcon">
                                            <i className="fa fa-lock fa-lg fa-fw"></i>
                                            <Field className="registerPass" type="password" name="password" ></Field>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label><b>Confirm Password</b></label><br/>
                                        <div className="passIcon">
                                            <i className="fa fa-lock fa-lg fa-fw" ></i>
                                            <Field className="registerConfirmPass" type="password" name="confirmPassword" ></Field>
                                        </div> 
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label><b>Verification Code</b></label><br/>
                                    <p className="codeMsg">(*You have 3 attemps to enter the verification code which we sent to you in the invitation email.)</p>
                                    <div className="codeIcon">
                                        <Field className="registerCode" type="text" name="veerificationCode"></Field>
                                        <i className="fa fa-key fa-lg fa-fw"></i>
                                    </div>
                                </div>
                                <button className="registerButton" type="submit" align="center">REGISTER</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        )
    }
}

export default RegisterComponent