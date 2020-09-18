import React, {Component} from 'react'
import { Formik, Form, Field } from "formik";

import UserService from '../../services/User/UserService.js'
import InvitationService from '../../services/Invitation/InvitationService.js'
import PopUp from '../Helpers/PopUp.js'

import './RegisterComponent.css'

class RegisterComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id : this.props.match.params.id,
            email : '',
            firstName : '',
            lastName : '',
            password : '',
            repeatPassword : '',
            gender : '',
            phone : '',
            verificationCode : '',
            errorMsg : '',
            showModal: false
        }

        this.onRegisterClick = this.onRegisterClick.bind(this)
        this.validate = this.validate.bind(this)
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.goToLoginPage = this.goToLoginPage.bind(this)
    }

    componentDidMount() {
        InvitationService.checkIfSetUpAccountLinkIsValid(this.props.match.params.id)
        .then(response => {
            if(response.data.urlExpired === true) {
                this.props.history.push(`/expired`)
            }
        })
        
        InvitationService.getInvitationById(this.state.id)
        .then(response => {
            this.setState({
                email : response.data.email
            })
        })
    }

    onRegisterClick(values) {
        UserService.registerUser(
            {
                firstName : values.firstName,
                lastName : values.lastName,
                email : values.email,
                password : values.password,
                repeatPassword : values.repeatPassword,
                phone : values.phone, 
                gender : values.gender,
                verificationCode : values.verificationCode
            }   
        )
        .then(() => { 
            this.handleOpenModal()
        })
        .catch(error => {
            this.setState({
                errorMsg : error.response.data.message
            })
            console.log(values);
        })
    }

    validate(values) {
        let errors = {}

        if(!values.firstName) {
            errors.firstName = '* Въведете име'
        } 
        if(!values.lastName) {
            errors.lastName = '* Въведете фамилия'
        } 
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
        if(!values.phone) {
            errors.phone = '* Въведете телефонен номер'
        }
        if (!/(\+359)8[789]\d{1}(|-| )\d{3}(|-| )\d{3}/.test(values.phone)) {
            errors.phone = 'Невалиден телефонен номер';
        } 
        if(!values.verificationCode) {
            errors.verificationCode = '* Въведете код за верификация'
        }
        if(values.password !== values.repeatPassword) {
            errors.repeatPassword = 'Двете пароли НЕ съвпадат !'
        }
        
        return errors
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

        let {email, firstName, lastName, password, repeatPassword, gender, verificationCode} = this.state

        return (
            
            <div className="register">
                {this.state.errorMsg !== '' && 
                <div className="alert alert-danger alert-dismissible" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong>{this.state.errorMsg}</strong>
                </div>}
                <h1></h1>
                <Formik 
                    initialValues={{email, firstName, lastName, password, repeatPassword, gender, phone: "+359", verificationCode}}
                    onSubmit={this.onRegisterClick}
                    validateOnChange={false}
                    validateOnBlur={true}
                    validate={this.validate}
                    enableReinitialize={true}
                    > 
                    {
                        ({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label><b>Имейл</b></label><br/>
                                    <div className="emailIcon">
                                        <i className="fa fa-envelope fa-lg fa-fw leftSide"></i>
                                        <Field className="registerEmail" type="text" name="email" disabled={true}></Field>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label><b>Име</b></label><br/>
                                        <div className="userIcon">
                                            <Field className="registerFirstName" type="text" name="firstName" ></Field>
                                            <i className="fa fa-user fa-lg fa-fw"></i>
                                        </div>
                                        {touched.firstName && errors.firstName && <div className="errorField">{errors.firstName}</div>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label><b>Фамилия</b></label><br/>
                                        <div className="userIcon">
                                            <i className="fa fa-user fa-lg fa-fw"></i>
                                            <Field className="registerLastName" type="text" name="lastName" ></Field>
                                        </div>
                                        {touched.lastName && errors.lastName && <div className="errorField">{errors.lastName}</div>}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="genderLabel"><b>Пол</b></label><br/>
                                        <div className="genderIcon">
                                            <i className="fa fa-venus-mars fa-lg fa-fw"></i>
                                        </div>
                                        <div className="form-check">
                                            <Field type="radio" className="form-check-input" id="materialInline1" 
                                            name="gender" value="MALE"></Field>
                                            <label className="radio-inline" checked="checked">Мъж</label>
                                        </div>
                                        <div className="form-check">
                                            <Field type="radio" className="form-check-input" id="materialInline2" 
                                            name="gender" value="FEMALE"></Field>
                                            <label className="radio-inline">Жена</label>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label><b>Телефонен Номер</b></label><br/>
                                        <div className="phoneIcon">
                                            <i className="fa fa-phone fa-lg fa-fw"></i>
                                            <Field  id="phone" className="registerPhone" type="text" name= "phone"/>
                                        </div>
                                        {touched.phone && errors.phone && <div className="errorField">{errors.phone}</div>}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label><b>Парола</b></label><br/>
                                        <div className="passIcon">
                                            <i className="fa fa-lock fa-lg fa-fw"></i>
                                            <Field className="registerPass" type="password" name="password" ></Field>
                                        </div>
                                        {touched.password && errors.password && <div className="errorField">{errors.password}</div>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label><b>Потвърди Парола</b></label><br/>
                                        <div className="passIcon">
                                            <i className="fa fa-lock fa-lg fa-fw" ></i>
                                            <Field className="registerConfirmPass" type="password" name="repeatPassword" ></Field>
                                        </div> 
                                        {touched.repeatPassword && errors.repeatPassword && <div className="errorField">{errors.repeatPassword}</div>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label><b>Код за Верификация</b></label><br/>
                                    <p className="codeMsg">( За по-голяма сигурност, този код за верификация е валиден в рамките на 24 часа. )</p>
                                    <div className="codeIcon">
                                        <Field className="registerCode" type="text" name="verificationCode"></Field>
                                        <i className="fa fa-key fa-lg fa-fw"></i>
                                    </div>
                                    {touched.verificationCode && errors.verificationCode && <div className="errorField">{errors.verificationCode}</div>}
                                </div>
                                <button className="registerButton" type="submit" align="center"><span>Регистрация</span></button>
                                <PopUp
                                    showModal={this.state.showModal} 
                                    title='Успешна регистрация' 
                                    body='Поздравления ! Вашата регистрация беше успешна. Сега можете да използвате своите данни, за да се впишете в системата и да продължите напред.' 
                                    customStyles={popUpStyles}
                                    closeAction={this.handleCloseModal}
                                    buttonAction={this.goToLoginPage} buttonName='Вход в системата'>
                                </PopUp>
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

export default RegisterComponent