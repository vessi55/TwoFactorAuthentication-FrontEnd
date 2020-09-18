import React, { Component } from "react"

import './NavbarComponent.css'

class AdminNavbarComponent extends Component {

    render() {
        return (
            <>
            <div className="nav-side-menu">
                <ul className="sidebar-nav">
                    <li><a href="/invite"><i className="fa fa-envelope fa-lg"></i> Изпрати Покана </a></li>
                    <li><a href="/invitations"><i className="fa fa-users fa-lg"></i> Потребители </a></li>
                    <li><a href="/invitations/archive"><i className="fa fa-archive fa-lg"></i> Архив </a></li>
                </ul>
            </div>
            </>
        )
    }
}

export default AdminNavbarComponent