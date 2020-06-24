import React, {Component} from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";

import HeaderComponent from '../Header/HeaderComponent.js';
import NavbarComponent from '../Navbar/NavbarComponent.js';
import InvitationService from '../../services/Invitation/InvitationService.js'
import AuthenticationService from '../../services/Authentication/AuthenticationService.js'
import InputField from '../Helpers/InputField.js';
// import InvitePic from '../../images/invite.png'

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
            message : '',
            errorMsg : '',
        }

        this.sendInvitation = this.sendInvitation.bind(this)
    }

    sendInvitation(values) {
        AuthenticationService.setupAxiosInterceptors()

        console.log(values)
        InvitationService.sendInvitation(
            {
                email : values.email 
            }
        )
        .then(() => {
            this.setState({
                message : `Invitation has been successfully send to user with email : ` + values.email
            })
        }).catch((error) => {
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
                                    {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                                    {this.state.errorMsg && <div className="alert alert-warning">{this.state.errorMsg}</div>}  
                                    <InputField className="invitationEmail" name="email" label="Email" placeholder="Email" width="100%"></InputField>
                                    <button className="invitationButton" type="submit" align="center">INVITE</button>
                                </div>   
                                
                                <div className="invitationImage">
                                    <img src={InvitePic}></img>
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