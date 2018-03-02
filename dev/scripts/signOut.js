import React from 'react';

class SignOut extends React.Component {
    constructor(props) {
        super(props);
    }

    signOutUser() {
      firebase.auth().signOut().then(function(res) {
        console.log('Signed out!')
      }, function(error) {
        console.log(error);
      });
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