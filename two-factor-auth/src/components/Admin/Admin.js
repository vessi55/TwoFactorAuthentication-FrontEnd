import React, {Component} from 'react';
import './Admin.css'

export default class AdminComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: 
            [
                {id : 1 , name: 'Test User 1'},
                {id : 2 , name: 'Test User 2'},
                {id : 3 , name: 'Test User 3'},
                {id : 4 , name: 'Test User 4'},
            ]
        }
    }

    render() {
        return (
            <div>
                <h1>Users List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(
                                user => 
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}