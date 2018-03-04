import React from 'react';
import LogIn from './logIn';
import SignUp from './signUp';
import SignOut from './signOut';

// <Header user={this.state.user} signOutUser={this.signOutUser} />
class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className='layout__opposite clearfix'>
                <div><h1>Baby Registry</h1></div>
                {/* Display different items on the right side of header if logged in) */}
                {/* to do: show button, toggle show form */}
                {this.props.user ?
                    <div className="layout__beside">
                    {/* user is logged in, show user's email, link to dashboard, sign out button */}
                        <span>{this.props.user.email}</span>
                        <a href="/dashboard">Dashboard</a>
                        <SignOut signOutUser={this.props.signOutUser} />
                    </div>
                : 
                    <div className="layout__beside">
                    {/* (user is logged out, show log in button and sign up button) */}
                        <p>(user is logged out..buttons for log in and sign up go here)</p>
                        <LogIn logIn={this.props.LogInUser} handleChange={this.props.handleChange}  className="layout__beside" />
                        {/* <SignUp className="layout__beside" /> */}
                    </div>
                }
            </header>   
        )
    }
}

export default Header;