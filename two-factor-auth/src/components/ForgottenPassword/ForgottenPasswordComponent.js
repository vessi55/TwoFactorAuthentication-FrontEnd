import React, {Component} from 'react'
import { Formik, Form, Field } from "formik";
import TextField from '@material-ui/core/TextField';

import UserService from '../../services/User/UserService.js'
import AlertDialog from '../Helpers/AlertDialog.js';
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
            errors.email = '* Въведете имейл'
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
                successMsg : `Имейл за забравена парола е изпратен успешно !`
            })
        })
        .catch(error => {
            this.setState({
                errorMsg : `Възникна някаква грешка ! Моля, опитайте отново.`
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
                                <h2>Забравили сте своята парола?</h2>
                                <p>Моля въведете своя имейл в полето отдолу.<br/> Ще получите имейл с по-подробни инструкции как да смените своята парола.</p>
                                {this.state.successMsg !== '' && <AlertDialog alert="alert alert-success alert-dismissible" message={this.state.successMsg}></AlertDialog>}
                                {this.state.errorMsg !== '' &&  <AlertDialog alert="alert alert-danger alert-dismissible" message={this.state.errorMsg}></AlertDialog>}  
                                <Field as={TextField} className="form-control" placeholder="Имейл" type="text" name="email" 
                                    autoComplete="off" id="outlined-textarea" variant="outlined" label="Имейл"></Field>
                                {touched.email && errors.email && <div className="errorField">{errors.email}</div>}
                                <button type="submit" className="sendResetPasswordEmailBtn">
                                    <span>Смени Парола</span></button>
                            </Form>
                            )
                        }
                </Formik>
            </div>
        )
    }
}

export default ForgottenPasswordComponent