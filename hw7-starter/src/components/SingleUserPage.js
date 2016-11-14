import React, { Component, PropTypes } from 'react';


class SingleUserPage extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
    };

    state = {
        success: false,
        user: {},
    };

    componentDidMount() {
        // fetch `/api/users/${id}` to get user and then set state...
        if(!this.props.id) {
            return;
        }

        fetch(`/api/users/${this.props.id}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .then(obj => this.setState({ success: true, user: obj }))
            .catch(error => console.log(error));
    }

    render() {
        if(!this.state.success) {
            return <div>User with id = {this.props.id} not found.</div>;
        } else {
            return <div>Find user id = {this.props.id}, avatar "{this.state.user.avator}", name "{this.state.user.name}", age "{this.state.user.age}"</div>
        }
    }
}

export default SingleUserPage;
