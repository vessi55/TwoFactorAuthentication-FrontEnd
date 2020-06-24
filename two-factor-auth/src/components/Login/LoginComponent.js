import React, {Component} from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import AuthenticationService from '../../services/Authentication/AuthenticationService.js'

import './LoginComponent.css'

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email : '',
            password : '',
            errorMsg : '',
            loginFailed : false
        }

        this.onLoginClick = this.onLoginClick.bind(this)
        this.validate = this.validate.bind(this)
    }

    onLoginClick(values) {
        AuthenticationService.logInUser(
            {
                email : values.email,
                password : values.password
            }   
        )
        .then(response => { 
            AuthenticationService.successfulLogin(response.data.token)
            
            if(response.data.role === 'USER') {
                this.props.history.push(`/welcome/${response.data.email}`)
            }
            else if(response.data.role === 'ADMIN') {
                this.props.history.push('/invite')
            }
        }).catch(() => {
            this.setState({
                loginFailed : true
            })
        })
    }


    forgotPassClick() {
        this.props.history.push("/forgotPassword")
    }

    validate(values) {
        let errors = {}

        if(!values.email) {
            errors.email = 'Please enter your email !'
        } 

        if(!values.password) {
            errors.password = 'Please enter your password !'
        } 
        
        return errors
    }
    
    render() {

        let {email, password} = this.state

        return (
            <div className="login">
                <h1>LOGIN</h1>
                <Formik 
                    initialValues={{email, password}}
                    onSubmit={this.onLoginClick}
                    validate={this.validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                    > 
                    {
                        () => (
                            <Form>
                                <ErrorMessage name="email" component="div" className="alert alert-warning"></ErrorMessage>
                                <ErrorMessage name="password" component="div" className="alert alert-warning"></ErrorMessage>
                                {this.loginFailed && <div className="alert alert-warning">Invalid Credentials</div>}                            
                                <div className="inputWithIcon">
                                    <i className="fa fa-envelope fa-lg fa-fw"></i>
                                    <Field className="loginEmail" name="email" type="text" placeholder="E-mail"></Field>
                                </div>
                                <div className="inputWithIcon">
                                    <i className="fa fa-lock fa-lg fa-fw"></i>
                                    <Field className="loginPassword" name="password" type="password" placeholder="Password"></Field>
                                </div>
                                <button className="logInButton" type="submit" align="center">LOG IN</button>
                                <p className="forgotPass" align="center"><a href="/forgotPassword">Forgot Your Password ?</a></p>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        )
    }
}

export default LoginComponent







