import React, { Component } from 'react';


class UsersPage extends Component {
    componentDidMount() {
        // fetch `/api/users` to get users and then set state...
        fetch(`/api/users/`, {
                method: 'GET'
            })
            .then(res => res.json())
            .then(obj => this.setState({ success: true, users: obj }))
            .catch(error => console.log(error));
    }

    state = {
        users: [],
    }

    render() {
        if(!this.state.users || this.state.users.length === 0) {
            return <div>No users found</div>
        }
        return(
            <div>Users
            {this.state.users.map((v, i) =>
                <li key={i}><a href={`#/users/${i+1}`}>User {i+1}</a></li>
            )}
      </div>
        );
    }
}

export default UsersPage;
