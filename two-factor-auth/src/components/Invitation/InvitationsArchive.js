import React, {Component} from 'react'

import HeaderComponent from '../Header/HeaderComponent.js';
import NavbarComponent from '../Navbar/NavbarComponent.js';
import InvitationService from '../../services/Invitation/InvitationService.js'
import AuthenticationService from '../../services/Authentication/AuthenticationService.js';

import './InvitationsArchive.css'

class InvitationsArchive extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message : '',
            errorMsg : '',
            users: []
        }
        
        this.getInvitationsArchive = this.getInvitationsArchive.bind(this)
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

    render() {

        return (
            <>
            <HeaderComponent></HeaderComponent>
            <NavbarComponent></NavbarComponent>
            <div className="bs-example">
                <h1 className="usersArchive">Archive</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                {this.state.errorMsg && <div className="alert alert-warning">{this.state.errorMsg}</div>} 
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Recover</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    user => 
                                        <tr key={user.uid}>
                                            <td>{user.email}</td>
                                            <td>
                                                <i class="fa fa-undo" aria-hidden="true"></i>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default InvitationsArchive