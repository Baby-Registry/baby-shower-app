import React from 'react';
import Datetime from 'react-datetime';


class CreateRegistryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            eventDate: '',
            eventLocation: '',
            hostName: '',
            isHost: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.createEvent= this.createEvent.bind(this);
        this.createUserEvent= this.createUserEvent.bind(this);
    }

    
    handleChange(event, field) {
        const newState = Object.assign({}, this.state);
        newState[field] = event.target.value;
        this.setState(newState);
    }

    createEvent(e) {
        e.preventDefault();
        const event = {
            eventName: this.state.eventName,
            eventDate: this.state.eventDate,
            eventLocation: this.state.eventLocation
        }
        const dbref = firebase.database().ref('/events');
	    dbref.push(event);
        this.setState({
            eventName: '',
            eventDate: '',
            eventLocation: ''
        });
        this.createUserEvent(this.props.user.uid);
    }

    createUserEvent(userid) {
        const userevent ={
            hostName: this.state.hostName,
            eventName: this.state.eventName,
            isHost: true
        }

        const dbref = firebase.database().ref(`/Users/${userid}/events`);
        dbref.push(userevent);

        this.setState({
            hostName: '',
            eventName: '',
            isHost: false
        });
            
    }

    render() {
        var date = new Date();
        return(
            <div>
                <button onClick={(event) => this.props.handleClick(event)}>Close</button>
                <h1>New Event</h1>
                <form onSubmit={(event) => this.createEvent(event)}>
                    <input type="text" placeholder="Host name" onChange={(event) => this.handleChange(event, "hostName")} />
                    <input type="text" placeholder="Name of event" onChange={(event) => this.handleChange(event, "eventName")} />
                    <input type="text" placeholder="Date" onChange={(event) => this.handleChange(event, "eventDate")} />
                    <input type="text" placeholder="Location" onChange={(event) => this.handleChange(event, "eventLocation")} />
                    <Datetime />
                    <button>Create My Event!</button>
                </form>
            </div>
        )
    }
}

export default CreateRegistryModal;