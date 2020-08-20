import React, {Component} from 'react'

import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';

import HeaderComponent from '../Header/HeaderComponent.js';
import NavbarComponent from '../Navbar/NavbarComponent.js';
import InvitationService from '../../services/Invitation/InvitationService.js'
import AuthenticationService from '../../services/Authentication/AuthenticationService.js'
import LoadingIndicator from '../Utils/LoadingIndicator'
import SearchField from '../Helpers/SearchField.js';
import UsersImage from '../../images/users.png'

import './Invitations.css'

class Invitations extends Component {

    constructor(props) {
        super(props)

        this.state = {
            successMsg : '',
            errorMsg : '',
            isLoading : false,
            users : []
        }
        
        this.getAllInvitations = this.getAllInvitations.bind(this)
        this.deleteInvitationById = this.deleteInvitationById.bind(this)
    }

    componentDidMount() {
        this.getAllInvitations()
    }

    getAllInvitations() {
        AuthenticationService.setupAxiosInterceptors()
        this.setState({
            isLoading : true
        });

        InvitationService.getAllInvitations()
        .then(response => {
            this.setState({
                isLoading : false,
                users : response.data
            })
        })
    }

    resendInvitation(invitationId) {
        AuthenticationService.setupAxiosInterceptors()

        InvitationService.resendInvitation(invitationId)
        .then(response => {
            this.setState({
                successMsg : response.data.successMsg
            })
        }).catch(() => {
            this.setState({
                errorMsg : `An error occurred. Please try again !`
            })
        })
    }

    deleteInvitationById(invitationId) {
        AuthenticationService.setupAxiosInterceptors()
        this.setState({
            isLoading : true
        });
    
        InvitationService.deleteInvitationById(invitationId)
        .then(response => {
            this.setState({
                isLoading : false,
                successMsg : response.data.successMsg
            })
            this.getAllInvitations()
        })
        .catch(() => {
            this.setState({
                errorMsg : `An error occurred. Please try again !`
            })
        })
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator/>
        }
        return (
            <>
            <HeaderComponent></HeaderComponent>
            <NavbarComponent></NavbarComponent>
            <div className="users">
                <div className="bs-example">
                    <img className="usersImage" alt="" src={UsersImage}></img>
                    <SearchField></SearchField>
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
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th width='30%'>Email</th>
                                <th width='10%'>Status</th>
                                <th width='5%'>Resend</th>
                                <th width='5%'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map(
                                user => 
                                    <tr key={user.uid}>
                                        <td>{user.email}</td>
                                        <td>{user.status}</td>
                                        <td>
                                            <IconButton
                                                disabled={user.status === 'REGISTERED'}>
                                                <EmailIcon onClick={() => 
                                                    this.resendInvitation(user.uid)}>
                                                </EmailIcon>
                                            </IconButton>
                                        </td>
                                        <td>
                                            <IconButton>
                                                <DeleteIcon onClick={() => 
                                                    this.deleteInvitationById(user.uid)}>
                                                </DeleteIcon>
                                            </IconButton>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            </>
        )
    }
}

export default Invitations