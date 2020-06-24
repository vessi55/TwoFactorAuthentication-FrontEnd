import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import AuthenticationRoute from './services/Authentication/AuthenticationRoute.jsx'
import SendInvite from './components/Invitation/SendInvite.js'
import Invitations from './components/Invitation/Invitations'
import InvitationsArchive from './components/Invitation/InvitationsArchive'
import RegisterComponent from './components/Register/RegisterComponent'
import LoginComponent from './components/Login/LoginComponent'
import WelcomeComponent from './components/Login/WelcomeComponent.js'
import ForgotPasswordComponent from './components/Login/ForgotPasswordComponent'
import LogoutComponent from './components/Login/LogoutComponent'
import ErrorComponent from './components/Error/ErrorComponent'

import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import HeaderComponent from './components/Header/HeaderComponent.js'

function App() {
  return (
    <div className="App">
        <Router>
          {/* <HeaderComponent></HeaderComponent> */}
          <Switch>
              <Route exact path ="/" component={LoginComponent}></Route>
              <Route exact path="/login" component={LoginComponent}></Route>
              <Route exact path="/register/:id" component={RegisterComponent}></Route>
              <AuthenticationRoute path="/welcome/:email" component={WelcomeComponent}></AuthenticationRoute>
              <Route exact path="/forgotPassword" component={ForgotPasswordComponent}></Route>
              <AuthenticationRoute exact path="/invite" component={SendInvite}></AuthenticationRoute>
              <AuthenticationRoute exact path="/invitations" component={Invitations}></AuthenticationRoute>
              <AuthenticationRoute exact path="/invitations/archive" component={InvitationsArchive}></AuthenticationRoute>
              <AuthenticationRoute exact path="/logout" component={LogoutComponent}></AuthenticationRoute>
              <Route component={ErrorComponent}></Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
