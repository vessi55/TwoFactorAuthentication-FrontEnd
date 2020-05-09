import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import AdminComponent from '../Admin/Admin'
import './Login.css'

export default class Login extends Component {
    render() {
        return (
            <div className="Login">
                <Router>
                    <>
                    <Switch>
                        <Route exact path="/" component={LoginComponent}></Route>
                        <Route path="/login" component={LoginComponent}></Route>
                        <Route path="/welcome/:name" component={WelcomeComponent}></Route>
                        <Route path="/forgotPassword" component={ForgotPasswordComponent}></Route>
                        <Route path="/users" component={AdminComponent}></Route>
                        <Route component={ErrorComponent}></Route>
                    </Switch>
                    </>
                </Router>
            </div>
        )
    }
}

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : '',
            pass : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClick = this.loginClick.bind(this);
    }

    handleChange(event) {
        console.log(this.state);
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }

    loginClick() {
        this.props.history.push(`/welcome/${this.state.email}`)
    }

    forgotPassClick() {
        this.props.history.push("/forgotPassword")
    }

    render() {
        return (
            <div className="login">
                <p className="logInText" align="center">Log in</p>
                <form className="loginForm">
                    <input className="email" name="email" type="text" align="center" placeholder="Email" value={this.state.email} onChange={this.handleChange}></input>
                    <input className="pass" name="pass" type="password" align="center" placeholder="Password" value={this.state.pass} onChange={this.handleChange}></input>
                    <button className="logInButton" type="button" align="center" onClick={this.loginClick}>LOG IN</button>
                    <p className="forgotPass" align="center"><a href="/forgotPassword">Forgot Your Password ?</a></p>
                </form>
            </div>
        )
    }
}

class WelcomeComponent extends Component {

    render() {
        return (
        <p align="center">Hi, {this.props.match.params.name} , welcome to the home page !!!</p>
        )
    }
}

class ForgotPasswordComponent extends Component {

    render() {
        return (
            <p align="center">Forgot Your Password ???</p>
        )
    }
}

class ErrorComponent extends Component {

    render() {
        return (
            <p align="center">Sorry, but something went wrong...</p>
        )
    }
}