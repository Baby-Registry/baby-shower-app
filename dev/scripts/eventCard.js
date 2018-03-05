import React from 'react';
import { Redirect } from 'react-router';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

class EventCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            updatedName: this.props.eventName
        }
        this.allowEdit = this.allowEdit.bind(this);
        this.showForm = this.showForm.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    allowEdit(e) {
        console.log(e.target);
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
        const updatedEvent = {
            eventName: this.state.updatedName,
            hostName: this.props.hostName,
            isHost: this.props.isHost
        }
        const dbref = firebase.database().ref(`/Users/${this.props.user.uid}/events/${this.props.eventId}`);
        dbref.set(updatedEvent);
        this.setState({
            isEditing: false
        })
    }

    showForm(eventName) {
        if (this.state.isEditing) {
            return (
                <form onSubmit={(event) => this.updateData(event)}>
                    <input type="text" defaultValue={this.props.eventName} onChange={(event) => this.handleChange(event, "updatedName")} />
                    <button>Save</button>
                </form>
            )
        } else {
            return (
                <p>{eventName}</p>
            )
        }
    }


    render() {
        return(

            this.props.isHost === true?
                <div className="event">
                    <p>Host</p>
                    {this.showForm(this.props.eventName)}
                    <a href="#" className="btn__edit" onClick={(e) => this.allowEdit(e)}>Edit</a>
                    <Link to={{pathname: `/dashboard/${this.props.eventId}`, eventId: this.props.eventId, userId: this.props.user.uid, isHost: true}}>
                        <button>Edit My Registry</button>
                    </Link>
                </div>
            : 
            (this.props.isHost === false?
                <div className="event">
                    <p>{this.props.eventName}</p>
                    <p>{`Host: ${this.props.hostName}`}</p>
                    <Link to={{pathname: `/dashboard/${this.props.eventId}`, eventId: this.props.eventId, userId: this.props.user.uid, isHost: false}}>
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