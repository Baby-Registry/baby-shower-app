import React from 'react';
import LogIn from './logIn';
import SignUp from './signUp';
import SignOut from './signOut';
import MediaQuery from 'react-responsive';
import {
    Link
} from 'react-router-dom';

// <Header user={this.state.user} signOutUser={this.signOutUser} />
class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <header className='layout__opposite clearfix'>
                    {/* Change from "Baby Registry" text to the logo */}
                    <div><Link to="/">
                        <MediaQuery minWidth={801}>
                            <h1>Baby Registry</h1>
                        </MediaQuery>
                        <MediaQuery maxWidth={800}>
                            <img src="/assets/svg-babyGirl-black.svg" alt="Graphic of baby girl" className="graphics logo" />
                        </MediaQuery>
                    </Link></div>

                    {/* Display different items on the right of header if logged in) */}
                    {this.props.user  ?
                        <div className="header__right">
                        {/* user is logged in, show user's email, link to dashboard, sign out button */}
                            <span className="text__header">{this.props.user.email}</span>
                            <Link to="/dashboard">Dashboard</Link>
                            <SignOut signOutUser={this.props.signOutUser} />
                        </div>
                    : 
                        <div className="header__right">
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