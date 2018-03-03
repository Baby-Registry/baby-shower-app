import React from 'react';

class SignOut extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            loggedIn: false,
        }
        this.signOutUser = this.signOutUser.bind(this);
    }

    signOutUser() {
      firebase.auth().signOut().then(function(res) {
        console.log('Signed out!')
      }, function(error) {
        console.log(error);
      });

      this.setState({
          user: {},
          loggedIn: false
      })
    }

    render() {
        return(
            <div className='signOut'>
              <button className="signOutButton" onClick={this.signOutUser}>Sign Out</button>
            </div>
        )
    }
}

export default SignOut;