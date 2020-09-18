import React, { Component } from "react"

import './NavbarComponent.css'

class UserNavbarComponent extends Component {

    render() {
        return (
            <>
            <div className="nav-side-menu">
                <ul className="sidebar-nav">
                    <li><a href="/post/article"><i className="fa fa-newspaper-o fa-lg"></i> Създай Статия</a></li>
                    <li><a href="/articles"><i className="fa fa-newspaper-o fa-lg"></i> Моите Статии</a></li>
                    <li><a href="/articles/all"><i className="fa fa-newspaper-o fa-lg"></i> Всички Статии</a></li>
                </ul>
            </div>
            </>
        )
    }
}

export default UserNavbarComponent