import React from 'react';

// user arrives at this page from baby.com/dashboard/eventid
// user sees this page if they do not already have this event in their account (otherwise redirect to dashboard)

class InviteLandingPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            uid : this.props.uid,
            loggedIn: this.props.loggedIn,
        }
    }

    render() {
        return (
            <main>
                <div className="wrapper">
                    {/* h2 and h3 are always shown */}
                    <h2>You are invited!</h2>
                    <h3>Join Mary and Sam's Baby Shower Event</h3>
                    <img src="./assets/ryan-tiger-photo.png" alt=""/>

                    {/* conditionally show buttons based on loggedIn */}
                    {this.state.loggedIn ?
                        //if user is already logged in, show button which direectly adds this event to their firebase
                        <button>Join Event</button>
                    :
                        // if user is not logged in, ask them to log in first
                        // after login, re-render page and it should show "Join event" button
                        <React.Fragment>
                            <p>Please log into your account to see the baby registry list.</p>
                            <button>Log In</button>
                            <button>Create An Account</button>
                        </React.Fragment>
                    }
                </div>
            </main>
        )
    }
}

export default InviteLandingPage;