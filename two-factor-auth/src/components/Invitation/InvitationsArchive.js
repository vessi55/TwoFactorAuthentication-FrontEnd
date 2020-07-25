import React, {Component} from 'react'
import { IconButton } from '@material-ui/core';
import UndoIcon from '@material-ui/icons/Undo';

import HeaderComponent from '../Header/HeaderComponent.js';
import NavbarComponent from '../Navbar/NavbarComponent.js';
import InvitationService from '../../services/Invitation/InvitationService.js'
import AuthenticationService from '../../services/Authentication/AuthenticationService.js';
import LoadingIndicator from '../Utils/LoadingIndicator'
import SearchField from '../Helpers/SearchField.js';
import ArchiveImage from '../../images/archive.png'

import './InvitationsArchive.css'

class InvitationsArchive extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message : '',
            errorMsg : '',
            isLoading: false,
            users: []
        }
        
        this.getInvitationsArchive = this.getInvitationsArchive.bind(this)
        this.recoverInvitationById = this.recoverInvitationById.bind(this)
    }

    componentDidMount() {
        this.getInvitationsArchive()
    }

    getInvitationsArchive() {
        AuthenticationService.setupAxiosInterceptors()
        this.setState({
            isLoading: true
        });

        InvitationService.getInvitationsArchive()
        .then(
            response => {
                this.setState({
                    isLoading: false,
                    users : response.data
                })
            }
        )
    }

    recoverInvitationById(invitationId) {
        AuthenticationService.setupAxiosInterceptors()
        this.setState({
            isLoading: true
        });
    
        InvitationService.recoverInvitationById(invitationId)
        .then(() => {
            this.setState({
                isLoading: false,
                message : `The user has been recovered and an email has been successfully sent !`
            })
            this.getInvitationsArchive()
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
            <div className="archive">
                <div className="bs-example">
                    <img className="archiveImage" src={ArchiveImage}></img>
                    <SearchField></SearchField>
                    {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                    {this.state.errorMsg && <div className="alert alert-warning">{this.state.errorMsg}</div>} 
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th width='40%'>Email</th>
                                <th width='10%'>Recover</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    user => 
                                        <tr key={user.uid}>
                                            <td>{user.email}</td>
                                            <td>
                                            <IconButton>
                                                <UndoIcon onClick={() => 
                                                    this.recoverInvitationById(user.uid)}>
                                                </UndoIcon>
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

export default InvitationsArchive