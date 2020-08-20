import React, {Component} from 'react'
import { Formik, Form, Field } from "formik";
import TextField from '@material-ui/core/TextField';

import HeaderComponent from '../Header/HeaderComponent.js';
import NavbarComponent from '../Navbar/NavbarComponent.js';
import InvitationService from '../../services/Invitation/InvitationService.js'
import AuthenticationService from '../../services/Authentication/AuthenticationService.js'
import InvitePic from '../../assets/invite.svg'

import './SendInvite.css'

const validate = (values) => {
    const errors = {};
  
    if (!values.email) {
      errors.email = 'Please enter an email !';
    } 
  
    return errors;
  };

class SendInvite extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email : '',
            successMsg : '',
            errorMsg : '',
        }

        this.sendInvitation = this.sendInvitation.bind(this)
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
                successMsg : `Invitation has been successfully send to user with email : ` + values.email
            })
        }).catch(error => {
            this.setState({
                errorMsg : error.response.data.message
            })
        })
    }
    
    render() {

        let {email} = this.state

        return (
            <>
            <HeaderComponent></HeaderComponent>
            <NavbarComponent></NavbarComponent>
            <Formik 
                initialValues={{email}}
                onSubmit={this.sendInvitation}
                validate={validate}
                validateOnChange={true}
                enableReinitialize={true}
                > 
                {
                    () => (
                        <Form>
                            <div className="invitationForm">        
                                <div className="invitation">
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
                                    <Field as={TextField} className="form-group" placeholder="Email" type="text" name="email" 
                                    autoComplete="off" id="outlined-textarea" variant="outlined" label="Email"></Field>
                                    <button className="invitationButton" type="submit" align="center">INVITE</button>
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