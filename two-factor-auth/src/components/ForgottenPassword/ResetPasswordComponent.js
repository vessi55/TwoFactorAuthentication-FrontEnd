import React, {Component} from 'react'
import { Formik, Form, Field } from 'formik';

import UserService from '../../services/User/UserService.js'
import AlertDialog from '../Helpers/AlertDialog.js';
import PopUp from '../Helpers/PopUp.js'
import ResetPassPic from '../../images/password.PNG'

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
            errors.password = '* Въведете парола'
        } 
        if(!values.repeatPassword) {
            errors.repeatPassword = '* Въведете парола'
        }
        if(values.password.length < 6) {
            errors.password = 'Паролата трябва да съдържа поне 6 символа'
        } 
        if(values.repeatPassword.length < 6) {
            errors.repeatPassword = 'Паролата трябва да съдържа поне 6 символа'
        }
        if(values.password !== values.repeatPassword) {
            errors.repeatPassword = 'Двете пароли НЕ съвпадат !'
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
        .then(
            this.handleOpenModal()
        )
        .catch(error => {
            this.setState({
                errorMsg : `Възникна някаква грешка ! Моля, опитайте отново.`
            })
        })
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }
    
    handleCloseModal () {
        this.setState({ showModal: false });
    }

    goToLoginPage() {
        this.props.history.push(`/login`)
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
                                     <h1>Смяна на парола</h1>
                                        <label>Нова парола</label>
                                        <div className="passIcon">
                                            <i className="fa fa-lock fa-lg fa-fw"></i>
                                            <Field className="form-control" type="password" name="password" ></Field>
                                        </div>
                                        {touched.password && errors.password && <div className="errorField">{errors.password}</div>} 
                                        <label>Потвърди новата парола</label>
                                        <div className="passIcon">
                                            <i className="fa fa-lock fa-lg fa-fw"></i>
                                            <Field className="form-control" type="password" name="repeatPassword" ></Field>
                                        </div>
                                        {touched.repeatPassword && errors.repeatPassword && <div className="errorField">{errors.repeatPassword}</div>}
                                        <button type="submit" className="resetPasswordBtn" onClick={this.sendResetPasswordEmail}>
                                            <span>Продължи</span></button>
                                    </div>
                                </div>
                                <PopUp 
                                    showModal={this.state.showModal} title='Смяна на парола' 
                                    body='Вашата парола беше сменена успешно ! 
                                    Моля използвате новата си парола, за да влезете в системата и да продължите напред.' 
                                    customStyles={popUpStyles}
                                    closeAction={this.handleCloseModal}
                                    buttonAction={this.goToLoginPage} buttonName='Вход в системата'>
                                </PopUp>
                                {this.state.errorMsg !== '' &&  <AlertDialog alert="alert alert-danger alert-dismissible" message={this.state.errorMsg}></AlertDialog>}
                            </Form>
                        )
                    }
                </Formik>
            </div>
        )
    }
}

const popUpStyles = {
    overlay: {
        position: 'fixed',
      },
      content: {
        position: 'absolute',
        margin: 'auto',
        top: '100px',
        left: '100px',
        right: '100px',
        bottom: '100px',
        width: '50%',
        height: 'fit-content',
        overflow: 'auto',
        outline: 'none',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '1em',
        background: '#fafbfc',
        WebkitOverflowScrolling: 'touch',
      }
};

export default ResetPasswordComponent