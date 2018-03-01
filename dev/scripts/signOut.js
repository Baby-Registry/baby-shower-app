import React from 'react';

class SignOut extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='signOut'>
              <button className="signOutButton" onClick={this.props.signOut}>Sign Out</button>
            </div>
        )
    }
}

export default SignOut;