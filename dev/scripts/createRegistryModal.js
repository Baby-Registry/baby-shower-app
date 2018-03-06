import React from 'react';
import Datetime from 'react-datetime';
import { Redirect } from 'react-router';

let today = new Date();
let formattedDate = ("0"+(today.getMonth()+1)).slice(-2) + "-" + ("0"+(today.getDate())).slice(-2) + "-" + today.getFullYear() + " " + ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2);

class CreateRegistryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            eventDate: formattedDate,
            eventLocation: '',
            hostName: '',
            isHost: false,
            eventKey:  '',
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.createEvent= this.createEvent.bind(this);
        this.createUserEvent= this.createUserEvent.bind(this);
    }

    
    handleChange(event, field) {
        const newState = Object.assign({}, this.state);
        newState[field] = event.target.value;
        this.setState(newState);
    }

    handleDate(date){
        console.log(date);
        this.setState({eventDate: ("0"+(date._d.getMonth()+1)).slice(-2) + "-" + ("0"+(date._d.getDate())).slice(-2) + "-" + date._d.getFullYear() + " " + ("0" + date._d.getHours()).slice(-2) + ":" + ("0" + date._d.getMinutes()).slice(-2)});
     };

     createUserEvent(event, userid) {
        event.preventDefault();
        const userevent ={
            hostName: this.state.hostName,
            eventName: this.state.eventName,
            isHost: true,
            eventDate: this.state.eventDate.toString(),
            eventLocation: this.state.eventLocation,
            items: ''
        }

        const dbref = firebase.database().ref(`/Users/${userid}/events`).push(userevent);
        this.setState({eventKey: dbref.key});
        this.createEvent(dbref.key);
    }

    createEvent(userEventId) {
        const event = {
            eventKey: userEventId,
            hostId: this.props.user.uid,
            hostName: this.state.hostName,
            eventName: this.state.eventName,
            eventDate: this.state.eventDate.toString(),
            eventLocation: this.state.eventLocation
        }
        const dbref = firebase.database().ref('/events').child(userEventId);
	    dbref.set(event);
        this.setState({
            hostName: '',
            eventName: '',
            eventDate: '',
            eventLocation: ''
        });
        this.setState({redirect: true});
    }

    render() {
        var date = new Date();
        if(this.state.redirect) {return <Redirect to={{pathname: `/dashboard/${this.state.eventKey}`, eventId: this.state.eventKey, userId: this.props.user.uid, isHost: true}}/>}

        return(
            <div>
                <button onClick={(event) => this.props.handleClick(event)}>Close</button>
                <h1>New Event</h1>
                <form onSubmit={(event) => this.createUserEvent(event, this.props.user.uid)}>
                    <input type="text" placeholder="Host name" onChange={(event) => this.handleChange(event, "hostName")} />
                    <input type="text" placeholder="Name of event" onChange={(event) => this.handleChange(event, "eventName")} />
                    <input type="text" placeholder="Location" onChange={(event) => this.handleChange(event, "eventLocation")} />
                    <Datetime onChange={this.handleDate} closeOnSelect={true} />
                        <button>Create My Event!</button>
                </form>
            </div>
        )
    }
}

export default CreateRegistryModal;