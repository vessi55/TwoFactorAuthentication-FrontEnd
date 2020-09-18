import React, {Component} from 'react'

import { IconButton, TextField, InputAdornment } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import SearchIcon from "@material-ui/icons/Search";

import AlertDialog from '../Helpers/AlertDialog.js';
import HeaderComponent from '../Header/HeaderComponent.js';
import AdminNavbarComponent from '../Navbar/AdminNavbarComponent.js';
import InvitationService from '../../services/Invitation/InvitationService.js'
import AuthenticationService from '../../services/Authentication/AuthenticationService.js'

import UsersImage from '../../images/users.png'

import './Invitations.css'

class Invitations extends Component {

    constructor(props) {
        super(props)

        this.state = {
            successMsg : '',
            errorMsg : '',
            searchFieldValue : '',
            users : []
        }
        
        this.getAllInvitations = this.getAllInvitations.bind(this)
        this.deleteInvitationById = this.deleteInvitationById.bind(this)
        this.updateSearchFieldValue = this.updateSearchFieldValue.bind(this)
        this.searchUsersByEmail = this.searchUsersByEmail.bind(this)
    }

    componentDidMount() {
        this.getAllInvitations();
    }

    getAllInvitations() {
        AuthenticationService.setupAxiosInterceptors()
    
        InvitationService.getAllInvitations()
        .then(response => {
            this.setState({
                users : response.data
            })
        })
    }

    resendInvitation(invitationId) {
        AuthenticationService.setupAxiosInterceptors()

        InvitationService.resendInvitation(invitationId)
        .then(() => {
            this.setState({
                successMsg : `Поканата беше изпратена успешно !`
            })
        }).catch(() => {
            this.setState({
                errorMsg : `Възникна някаква грешка ! Моля, опитайте отново.`
            })
        })
    }

    deleteInvitationById(invitationId) {
        AuthenticationService.setupAxiosInterceptors()
    
        InvitationService.deleteInvitationById(invitationId)
        .then(response => {
            this.setState({
                successMsg : response.data
            })
            this.getAllInvitations()
        })
        .catch(() => {
            this.setState({
                errorMsg : `Възникна някаква грешка ! Моля, опитайте отново.`
            })
        })
    }

    updateSearchFieldValue(event) {
        this.setState({
            searchFieldValue : event.target.value
        })
    }

    searchUsersByEmail() {
        var search = this.state.searchFieldValue

        if(search === "") {
            this.getAllInvitations()
        }
        var filteredUsers = this.state.users.filter(function(user) {
            return user.email.toLowerCase().includes(search.toLowerCase())
        });
        this.setState({
            users : filteredUsers
        })
    }

    render() {
        return (
            <>
            <HeaderComponent></HeaderComponent>
            <AdminNavbarComponent></AdminNavbarComponent>
            <div className="users">
                <div className="bs-example">
                    {/* <img className="usersImage" alt="" src={UsersImage}></img> */}
                    <TextField id="search-input" type="search" placeholder="Имейл" 
                        variant="outlined" margin="normal" fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"><SearchIcon/></InputAdornment>
                            )
                        }}
                        onChange={event => this.updateSearchFieldValue(event)}
                        onKeyPress={this.searchUsersByEmail}>
                    </TextField>
                    {this.state.successMsg !== '' && <AlertDialog alert="alert alert-success alert-dismissible" message={this.state.successMsg}></AlertDialog>}
                    {this.state.errorMsg !== '' &&  <AlertDialog alert="alert alert-danger alert-dismissible" message={this.state.errorMsg}></AlertDialog>}
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th width='30%'>Имейл</th>
                                <th width='10%'>Статус</th>
                                <th width='5%'>Изпрати покана</th>
                                <th width='5%'>Изтрий потребител</th>
                            </tr>
                        </thead>
                        <tbody id="usersTableBody">
                        {
                            this.state.users.map(
                                user => 
                                    <tr key={user.uid}>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.status === 'INVITED' && (
                                                <div className="status-style-invited">ПОКАНЕН</div>
                                            )}
                                            {user.status === 'REGISTERED' && (
                                                <div className="status-style-registered">РЕГИСТРИРАН</div>
                                            )}
                                        </td>
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