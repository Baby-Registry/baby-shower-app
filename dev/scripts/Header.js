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
            <React.Fragment>
                <header className='layout__opposite clearfix'>
                    <div><a href="/"><h1>Baby Registry</h1></a></div>
                    {/* Display different items on the right of header if logged in) */}
                    {this.props.user  ?
                        <div className="layout__beside">
                        {/* user is logged in, show user's email, link to dashboard, sign out button */}
                            <span>{this.props.user.email}</span>
                            <a href="/dashboard">Dashboard</a>
                            <SignOut signOutUser={this.props.signOutUser} />
                        </div>
                    : 
                        <div className="layout__beside">
                        {/* (user is logged out, show log in button and sign up button) */}
                            <button className="btn" onClick={this.props.showLogin}>Log In</button>
                            <button className="btn" onClick={this.props.showSignUp}>Sign Up</button>
                        </div>
                    }
                </header>  
                
                
            </React.Fragment> 
        )
    }
}

export default Header;