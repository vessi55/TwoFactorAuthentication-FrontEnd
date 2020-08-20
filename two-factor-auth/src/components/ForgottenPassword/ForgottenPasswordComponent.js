import React, {Component} from 'react'
import { Formik, Form, Field } from "formik";
import TextField from '@material-ui/core/TextField';

import UserService from '../../services/User/UserService.js'
import ForgotPassPic from '../../images/forgotPassword.png'

import './ForgottenPasswordComponent.css'

class ForgottenPasswordComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id : this.props.match.params.id,
            email : '',
            successMsg : '',
            errorMsg : ''
        }

        this.validate = this.validate.bind(this)
        this.onSendResetPasswordEmailClick = this.onSendResetPasswordEmailClick.bind(this)
    }

    validate(values) {
        let errors = {}

        if(!values.email) {
            errors.email = '* Email Required'
        }
        
        return errors
    }

    onSendResetPasswordEmailClick(values) {
        UserService.sendResetPasswordEmail(
            {
                email : values.email
            }
        )
        .then(response => {
            this.setState({
                successMsg : response.data
            })
        })
        .catch(error => {
            this.setState({
                errorMsg : error.response
            })
        })
    }

    render() {

        let { email } = this.state

        return (
            <div className="forgotPassword">
                <Formik 
                    initialValues={{email}}
                    onSubmit={this.onSendResetPasswordEmailClick}
                    validate={this.validate}
                    validateOnChange={true}
                    enableReinitialize={true}
                    > 
                    {
                        ({ errors, touched }) => (
                            <Form>
                                <img src={ForgotPassPic} alt="forgotPass"></img>
                                <h2>Forgot Your Password?</h2>
                                <p>Please enter your email address in the box below. <br/> You will receive instructions about how to reset your password.</p>
                                {this.state.successMsg !== '' && 
                                <div className="alert alert-success alert-dismissible" role="alert">
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <strong>{this.state.successMsg}</strong>
                                </div>}
                                {this.state.errorMsg !== '' && 
                                <div className="alert alert-danger alert-dismissible" role="alert">
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <strong>{this.state.errorMsg}</strong>
                                </div>}  
                                <Field as={TextField} className="form-control" placeholder="Email" type="text" name="email" 
                                    autoComplete="off" id="outlined-textarea" variant="outlined" label="Email"></Field>
                                {touched.email && errors.email && <div className="errorField">{errors.email}</div>}
                                <button type="submit" className="sendResetPasswordEmailBtn" onClick={this.sendResetPasswordEmail}>
                                    <span>Reset Password</span></button>
                            </Form>
                            )
                        }
                </Formik>
            </div>
        )
    }
}

export default ForgottenPasswordComponent