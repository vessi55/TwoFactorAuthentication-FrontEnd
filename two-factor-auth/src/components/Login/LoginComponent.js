import React, {Component} from 'react'
import { Formik, Form, Field } from "formik";

import UserService from '../../services/User/UserService.js';

import './LoginComponent.css';

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
    }

    onLoginClick(values) {
        UserService.loginUser(
            {
                email : values.email,
                password : values.password
            }   
        )
        .then(response => { 
            this.props.history.push({pathname: `/login/verification`, user: response.data})
        }).catch(error => {
            this.setState({
                loginFailed : true,
                errorMsg : error.response.data.message
            })
        })
    }


    forgotPassClick() {
        this.props.history.push("/forgotPassword")
    }

    render() {

        let {email, password} = this.state

        return (
            <>
            <div className="login">
                <h1>LOGIN</h1>
                <Formik 
                    initialValues={{email, password}}
                    onSubmit={this.onLoginClick}
                    enableReinitialize={true}
                    > 
                    {
                        () => (
                            <Form>
                                {this.state.loginFailed && 
                                <div className="alert alert-danger alert-dismissible" role="alert">
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <strong>{this.state.errorMsg}</strong>
                                </div>}                       
                                <div className="inputWithIcon">
                                    <i className="fa fa-envelope fa-lg fa-fw"></i>
                                    <Field className="loginEmail" name="email" type="text" placeholder="E-mail" autoComplete="off"></Field>
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
            </>
        )
    }
}

export default LoginComponent







