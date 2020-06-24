import React, { Component } from "react"

import './NavbarComponent.css'

class NavbarComponent extends Component {

    render() {
        return (
            <>
            <div className="nav-side-menu">
                <ul className="sidebar-nav">
                    <li><a href="/invite"><i className="fa fa-envelope fa-lg"></i> INVITE </a></li>
                    <li><a href="/invitations"><i className="fa fa-users fa-lg"></i> USERS </a></li>
                    <li><a href="/invitations/archive"><i className="fa fa-archive fa-lg"></i> ARCHIVE </a></li>
                </ul>
            </div>
            </>
        )
    }
}

export default NavbarComponent