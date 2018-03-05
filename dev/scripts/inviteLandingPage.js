import React from 'react';

// user arrives at this page from baby.com/dashboard/eventid
// user sees this page if they do not already have this event in their account (otherwise redirect to dashboard)
// <InviteLandingPage user={this.state.user} showLogin={this.showLogin} showSignUp={this.showSignUp} closeModal={this.closeModal}/>

class InviteLandingPage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            invitedEvent : {},
        }

        this.joinEvent = this.joinEvent.bind(this);

    }

    // add this movie's id and details to the user's account in Firebase
    joinEvent(e) {
        e.preventDefault();
        const userevent = {
            hostName: this.state.invitedEvent.hostName,
            eventName: this.state.invitedEvent.eventName,
            isHost: false
        }
        const movieId = this.props.match.params.eventid;

        const dbref = firebase.database().ref(`/Users/${this.props.uid}/events`).child(movieId).set(userevent);
    }

    // find event info store in Firebase using movieId, save it in state
    componentDidMount() {
        const movieId = this.props.match.params.eventid;
        const dbref = firebase.database().ref(`/events/${movieId}`);
        dbref.on('value', (snapshot) => {
            const invitedEvent = snapshot.val();
 
            this.setState({
                invitedEvent : invitedEvent,
            });
        });
    }

    render() {
        console.log(this.props)
        return (
            <main className="inviteLandingPage">
                <div className="wrapper">
                    <h2 className="heading__page">You are invited!</h2>
                    <h3>Join Mary and Sam's Baby Shower Event</h3>
                    <img src="./assets/ryan-tiger-photo.png" alt="Baby in tiger costume"/>

                    {this.props.uid ?
                        //if user is already logged in, show button which direectly adds this event to their firebase
                        <div className="wrap__button">
                            <button className="btn" onClick={(e) => this.joinEvent(e)}>Join Event</button>
                        </div>
                    :
                        // if user is not logged in, ask them to log in first
                        // after login, re-render page and it should show "Join event" button
                        <React.Fragment>
                            <p>Please log into your account to see the baby registry list.</p>
                            <div className="layout__beside">
                                <button className="btn" onClick={this.props.showLogin}>Log In</button>
                                <button className="btn" onClick={this.props.showSignUp}>Sign Up</button>
                            </div>
                        </React.Fragment>
                    }
                </div>
            </main>
        )
    }
}

export default InviteLandingPage;