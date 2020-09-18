import React, {Component} from 'react'
import { IconButton, TextField, InputAdornment } from '@material-ui/core';
import UndoIcon from '@material-ui/icons/Undo';
import SearchIcon from "@material-ui/icons/Search";

import AlertDialog from '../Helpers/AlertDialog.js';
import HeaderComponent from '../Header/HeaderComponent.js';
import AdminNavbarComponent from '../Navbar/AdminNavbarComponent.js';
import InvitationService from '../../services/Invitation/InvitationService.js'
import AuthenticationService from '../../services/Authentication/AuthenticationService.js';

import ArchiveImage from '../../images/usersArchive.png'

import './InvitationsArchive.css'

class InvitationsArchive extends Component {

    constructor(props) {
        super(props)

        this.state = {
            successMsg : '',
            errorMsg : '',
            searchFieldValue : '',
            users : []
        }
        
        this.getInvitationsArchive = this.getInvitationsArchive.bind(this)
        this.recoverInvitationById = this.recoverInvitationById.bind(this)
        this.updateSearchFieldValue = this.updateSearchFieldValue.bind(this)
        this.searchUsersByEmail = this.searchUsersByEmail.bind(this)
    }

    componentDidMount() {
        this.getInvitationsArchive()
    }

    getInvitationsArchive() {
        AuthenticationService.setupAxiosInterceptors()

        InvitationService.getInvitationsArchive()
        .then(response => {
            this.setState({
                isLoading : false,
                users : response.data
            })
        })
    }

    recoverInvitationById(invitationId) {
        AuthenticationService.setupAxiosInterceptors()

        InvitationService.recoverInvitationById(invitationId)
        .then(() => {
            this.setState({
                successMsg : `Успешно подновихте достъпа на този потребител. Имейл до потребителя беше изпратен успешно !`
            })
            this.getInvitationsArchive()
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
            this.getInvitationsArchive()
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
            <div className="archive">
                <div className="bs-example">
                    {/* <img className="archiveImage" alt="archive" src={ArchiveImage}></img> */}
                    <TextField type="search" placeholder="Имейл" aria-describedby="button-addon1" 
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
                                <th width='40%'>Имейл</th>
                                <th width='10%'>Поднови достъп</th>
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