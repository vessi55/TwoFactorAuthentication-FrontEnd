import React, {Component} from 'react'
import { Formik, Form, Field } from 'formik';

import UserService from '../../services/User/UserService.js'
import ResetPassPic from '../../images/password.PNG'
import PopUp from '../Helpers/PopUp.js'

import './ResetPasswordComponent.css'

class ResetPasswordComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id : this.props.match.params.id,
            password : '',
            repeatPassword : '',
            successMsg : '',
            errorMsg : '',
            showModal: false
        }

        this.validate = this.validate.bind(this)
        this.onResetPasswordClick = this.onResetPasswordClick.bind(this)
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.goToLoginPage = this.goToLoginPage.bind(this)
    }

    componentDidMount() {
         this.setState({ showModal: true });
        UserService.checkIfResetPassLinkIsValid(this.props.match.params.id)
        .then(response => {
            if(response.data.urlExpired === true) {
                this.props.history.push(`/expired`)
            }
        })
    }

    validate(values) {
        let errors = {}

        if(!values.password) {
            errors.password = '* Password Required'
        } 

        if(!values.repeatPassword) {
            errors.repeatPassword = '* Password Required'
        }

        if(values.password !== values.repeatPassword) {
            errors.repeatPassword = 'Passwords DO NOT Match !'
        }
        
        return errors
    }

    onResetPasswordClick(values) {
        UserService.resetPassword(
            {
                id : this.props.match.params.id,
                password : values.password,
                repeatPassword : values.repeatPassword
            }
        )
        this.handleOpenModal()
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }
    
    handleCloseModal () {
        this.setState({ showModal: false });
    }

    goToLoginPage() {
        this.props.history.push('/login')
    }

    render() {
        let {password, repeatPassword} = this.state

        return( 
            <div className="resetPassForm">
                <Formik 
                    initialValues={{password, repeatPassword}}
                    onSubmit={this.onResetPasswordClick}
                    validateOnCFhange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                    > 
                    {
                        ({ errors, touched }) => (
                            <Form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <img src={ResetPassPic} alt="resetPassword"></img>
                                    </div>
                                    <div className="form-group col-md-4">
                                     <h1>Reset Password</h1>
                                        <label>New Password</label>
                                        <div className="passIcon">
                                            <i className="fa fa-lock fa-lg fa-fw"></i>
                                            <Field className="form-control" type="password" name="password" ></Field>
                                        </div>
                                        {touched.password && errors.password && <div className="errorField">{errors.password}</div>} 
                                        <label>Confirm New Password</label>
                                        <div className="passIcon">
                                            <i className="fa fa-lock fa-lg fa-fw"></i>
                                            <Field className="form-control" type="password" name="repeatPassword" ></Field>
                                        </div>
                                        {touched.repeatPassword && errors.repeatPassword && <div className="errorField">{errors.repeatPassword}</div>}
                                        <button type="submit" className="resetPasswordBtn" onClick={this.sendResetPasswordEmail}>
                                            <span>Reset Password</span></button>
                                    </div>
                                </div>
                                <PopUp 
                                    showModal={this.state.showModal} title='Reset Password' body='Your password has been changed successfully ! 
                                    Please use your new password to log in to your account and continue.' closeAction={this.handleCloseModal}
                                    buttonAction={this.goToLoginPage} buttonName='Go To Login'>
                                </PopUp>
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
                            </Form>
                        )
                    }
                </Formik>
            </div>
        )
    }
}



export default ResetPasswordComponent