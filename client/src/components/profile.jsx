import React, { Component } from 'react';
class Profile extends Component {

    render() {
        const {user} = this.props;

        return (
            <div>
                ProfilePage
                {user && <h1>{user.name}{user.email}{user.phone}</h1>}
            </div>
        );
    }
}

export default Profile;