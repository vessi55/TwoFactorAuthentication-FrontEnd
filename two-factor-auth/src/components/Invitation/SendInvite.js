import React, {Component} from 'react'
import { Formik, Form, Field } from "formik";
import TextField from '@material-ui/core/TextField';

import AlertDialog from '../Helpers/AlertDialog.js';
import HeaderComponent from '../Header/HeaderComponent.js';
import AdminNavbarComponent from '../Navbar/AdminNavbarComponent.js';
import InvitationService from '../../services/Invitation/InvitationService.js'
import AuthenticationService from '../../services/Authentication/AuthenticationService.js'
import InvitePic from '../../assets/invite.svg'

import './SendInvite.css'

class SendInvite extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email : '',
            successMsg : '',
            errorMsg : '',
        }

        this.sendInvitation = this.sendInvitation.bind(this)
        this.validate = this.validate.bind(this)
    }

    sendInvitation(values) {
        AuthenticationService.setupAxiosInterceptors()
        
        InvitationService.sendInvitation(
            {
                email : values.email 
            }
        )
        .then(() => {
            this.setState({
                successMsg : `Поканата е изпратена успешно !`
            })
        }).catch(error => {
            this.setState({
                errorMsg : `Възникна някаква грешка ! Моля, опитайте отново.`
            })
        })
    }

    validate(values) {
        let errors = {};
      
        if (!values.email) {
            errors.email = '* Въведете имейл';
        } 
      
        return errors;
    };
    
    render() {

        let {email} = this.state

        return (
            <>
            <HeaderComponent></HeaderComponent>
            <AdminNavbarComponent></AdminNavbarComponent>
            <Formik 
                initialValues={{email}}
                onSubmit={this.sendInvitation}
                validate={this.validate}
                validateOnChange={true}
                enableReinitialize={true}
                > 
                {
                    () => (
                        <Form>
                            <div className="invitationForm">
                            {this.state.successMsg !== '' && <AlertDialog alert="alert alert-success alert-dismissible" message={this.state.successMsg}></AlertDialog>}
                                {this.state.errorMsg !== '' &&  <AlertDialog alert="alert alert-danger alert-dismissible" message={this.state.errorMsg}></AlertDialog>}          
                                <div className="invitation">
                                    <Field as={TextField} className="form-group" placeholder="Имейл" type="text" name="email" 
                                    autoComplete="off" id="outlined-textarea" variant="outlined" label="Имейл"></Field>
                                    <button className="invitationButton" type="submit" align="center">Покани</button>
                                </div>   
                                
                                <div className="invitationImage">
                                    <img src={InvitePic} alt="invite"></img>
                                </div>  
                            </div>
                        </Form>
                    )
                }
            </Formik>   
            </>
        )
    }
}

export default SendInvite