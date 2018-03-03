import React from 'react';

class SignOut extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='signOut'>
              <button className="signOutButton" onClick={this.props.signOutUser}>Sign Out</button>
            </div>
        )
    }
}

export default SignOut;