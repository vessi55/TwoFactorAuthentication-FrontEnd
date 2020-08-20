import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import AuthenticationRoute from './services/Authentication/AuthenticationRoute.jsx'
import SendInvite from './components/Invitation/SendInvite.js'
import Invitations from './components/Invitation/Invitations'
import InvitationsArchive from './components/Invitation/InvitationsArchive'
import RegisterComponent from './components/Register/RegisterComponent'
import LoginComponent from './components/Login/LoginComponent'
import VerificationComponent from './components/Verification/VerificationComponent.js'
import WelcomeComponent from './components/Login/WelcomeComponent.js'
import ForgottenPasswordComponent from './components/ForgottenPassword/ForgottenPasswordComponent.js'
import ResetPasswordComponent from './components/ForgottenPassword/ResetPasswordComponent.js'
import LogoutComponent from './components/Login/LogoutComponent'
import ErrorComponent from './components/Error/ErrorComponent'
import UrlExpiredComponent from './components/Error/UrlExpiredComponent'

import './App.css'
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <div className="App">
        <Router>
          {/* <HeaderComponent></HeaderComponent> */}
          <Switch>
              <Route exact path ="/" component={LoginComponent}></Route>
              <Route exact path="/login" component={LoginComponent}></Route>
              <Route exact path="/login/verification" component={VerificationComponent}></Route>
              <Route exact path="/register/:id" component={RegisterComponent}></Route>
              <Route exact path="/forgotPassword" component={ForgottenPasswordComponent}></Route>
              <Route exact path="/reset-password/:id" component={ResetPasswordComponent}></Route>
              <Route exact path="/expired" component={UrlExpiredComponent}></Route>
              <AuthenticationRoute path="/welcome/:email" component={WelcomeComponent}></AuthenticationRoute>
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
