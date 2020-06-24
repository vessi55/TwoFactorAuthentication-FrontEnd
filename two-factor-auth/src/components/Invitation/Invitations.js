import React, {Component} from 'react'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';

import HeaderComponent from '../Header/HeaderComponent.js';
import NavbarComponent from '../Navbar/NavbarComponent.js';
import InvitationService from '../../services/Invitation/InvitationService.js'
import AuthenticationService from '../../services/Authentication/AuthenticationService.js'
import LoadingIndicator from '../Utils/LoadingIndicator'

import './Invitations.css'

class Invitations extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message : '',
            errorMsg : '',
            isLoading: false,
            users: []
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
            isLoading: true
        });

        InvitationService.getAllInvitations()
        .then(
            response => {
                this.setState({
                    isLoading: false,
                    users : response.data
                })
            }
        )
    }

    resendInvitation(invitationId) {
        console.log("I am at resend method")

        AuthenticationService.setupAxiosInterceptors()

        InvitationService.resendInvitation(invitationId)
        .then(() => {
            this.setState({
                message : `An invitation email has been successfully sent !`
            })
            this.getAllInvitations()

        }).catch(() => {
            this.setState({
                errorMsg : `An error occurred. Please try again !`
            })
        })
    }

    deleteInvitationById(invitationId) {
        console.log("I am at delete method")
        AuthenticationService.setupAxiosInterceptors()
        this.setState({
            isLoading: true
        });
    
        InvitationService.deleteInvitationById(invitationId)
        .then(() => {
            this.setState({
                isLoading: false,
                message : `The invitation has been successfully deleted !`
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
                    <h1 className="usersList">Users</h1>
                    {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                    {this.state.errorMsg && <div className="alert alert-warning">{this.state.errorMsg}</div>} 
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Resend</th>
                                <th>Delete</th>
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
                                            <IconButton>
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