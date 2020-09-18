import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'

import AuthenticationService from '../../services/Authentication/AuthenticationService.js'

import './HeaderComponent.css'

class Header extends Component {
    
    render() {

        //const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-default">
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {/* {isUserLoggedIn && <i className="fa fa-sign-out" aria-hidden="true"></i>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" 
                            onClick={AuthenticationService.successfulLogout}>Logout</Link></li>} */}

                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                        <li className="nav-item"><Link className="nav-link" to="/logout" 
                            onClick={AuthenticationService.successfulLogout}>Изход</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(Header)