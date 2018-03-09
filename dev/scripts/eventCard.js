import React from 'react';
import { Redirect } from 'react-router';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class EventCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            updatedName: this.props.eventName,
    // Copy-to-clipboard states
            value: `https://baby-registry-b41ed.firebaseapp.com/invite/${this.props.eventId}`,
            copied: false
        }
        this.allowEdit = this.allowEdit.bind(this);
        this.showForm = this.showForm.bind(this);
        this.updateData = this.updateData.bind(this);
        this.closeEditView = this.closeEditView.bind(this);
    }

    allowEdit(e) {
        e.preventDefault();
        this.setState({
            isEditing: true
        })
    }

    handleChange(event, field) {
        const newState = Object.assign({}, this.state);
        newState[field] = event.target.value;
        this.setState(newState);
    }

    updateData(event) {
        event.preventDefault();
        const updatedEvent = {
            eventName: this.state.updatedName,
            hostName: this.props.hostName,
            isHost: this.props.isHost,
            eventLocation: this.props.location,
            eventDate: this.props.datetime
        }
        const dbref = firebase.database().ref(`/Users/${this.props.user.uid}/events/${this.props.eventId}`);
        dbref.set(updatedEvent);
        this.setState({
            isEditing: false
        })
    }

    closeEditView(event) {
        event.preventDefault();
        this.setState({
            isEditing:false
        });
    }

    showForm(eventName) {
        if (this.state.isEditing) {
            return (
                    <form>
                        <input type="text" defaultValue={this.props.eventName} onChange={(event) => this.handleChange(event, "updatedName")} />
                        <a href="" onClick={(event) => this.updateData(event)}>
                            <i className="fas fa-check"></i>
                            <span className="hide">Save Changes</span>
                        </a>
                        <a href="" onClick={(event) => this.closeEditView(event)}>
                            <i class="fas fa-times"></i>
                            <span className="hide">Discard Changes</span>
                        </a>
                    </form>
            )
        } else {
            return (
                <h2>{eventName}</h2>
            )
        }
    }


    render() {
        return(
            (this.props.isHost === true) ?
                <div className="event">
                    <div className="eventDetails">
                        <p className="hostBadge">Host</p>
                        {this.showForm(this.props.eventName)}
                        <a href="#" className={this.state.isEditing ? 'hide': 'editEvent'} onClick={(e) => this.allowEdit(e)}>
                            <i class="fas fa-pencil-alt"></i>
                        </a>
                        <p className="eventDateLocation"><span className="em">Event:</span> {`${this.props.datetime} at the ${this.props.location}`}</p>
                        <p value={this.state.value}><span className="em">Invite Link</span>: {`https://baby-registry-b41ed.firebaseapp.com/invite/${this.props.eventId}`}</p>
                        <CopyToClipboard text={this.state.value} onCopy={() => this.setState({copied: true})}>
                            {/* <button style={this.state.copied?{backgroundColor: 'green'}: null}>Copy Invite Link</button>
                         */}
                            <a href="#" style={this.state.copied?{color: 'purple'}: null}>
                                <i className="far fa-clone"></i>
                            </a>
                        </CopyToClipboard>

                    </div>
                    <Link className="eventAction" to={{pathname: `/dashboard/${this.props.eventId}`, eventId: this.props.eventId, userId: this.props.user.uid, isHost: true}}>
                        <button>Edit My Registry</button>
                    </Link>
                </div>
            : 
            (this.props.isHost === false?
                <div className="event">
                    <div className="eventDetails">
                        <h2>{this.props.eventName}</h2>
                        <p>{`Host: ${this.props.hostName}`}</p>
                        <p className="eventDateLocation"><span className="em">Event:</span>{`at the ${this.props.location}`}</p>
                    </div>
                    <Link className="eventAction" to={{pathname: `/dashboard/${this.props.eventId}`, eventId: this.props.eventId, userId: this.props.user.uid, isHost: false, hostId:this.props.hostId}}>
                        <button>See Registry</button>
                    </Link>
                </div>
            :   
                <div key='error'>
                    <p>isHost property has invalid value</p>
                </div>
            )
            
        )
    }
}

export default EventCard;