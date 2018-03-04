import React from 'react';
import Datetime from 'react-datetime';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';


class CreateRegistryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            eventDate: '',
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
        this.setState({eventDate: date._d}); 
     };

    createEvent(e) {
        e.preventDefault();
        const event = {
            hostName: this.state.hostName,
            eventName: this.state.eventName,
            eventDate: this.state.eventDate.toString(),
            eventLocation: this.state.eventLocation
        }
        const dbref = firebase.database().ref('/events');
	    dbref.push(event);
        this.setState({
            hostName: '',
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
            isHost: true,
            items: ''
        }

        const dbref = firebase.database().ref(`/Users/${userid}/events`).push(userevent);
        this.setState({eventKey: dbref.key});
        this.setState({
            hostName: '',
            eventName: '',
            isHost: false
        });
        this.setState({redirect: true});
            
    }

    render() {
        var date = new Date();
        if(this.state.redirect) {return <Redirect to={{pathname: `/dashboard/${this.state.eventKey}`, eventId: this.state.eventKey, userId: this.props.user.uid, isHost:true}}/>}
        return(
            <div>
                <button onClick={(event) => this.props.handleClick(event)}>Close</button>
                <h1>New Event</h1>
                <form onSubmit={(event) => this.createEvent(event)}>
                    <input type="text" placeholder="Host name" onChange={(event) => this.handleChange(event, "hostName")} />
                    <input type="text" placeholder="Name of event" onChange={(event) => this.handleChange(event, "eventName")} />
                    <input type="text" placeholder="Location" onChange={(event) => this.handleChange(event, "eventLocation")} />
                    <Datetime onChange={this.handleDate} defaultValue={date} />
                        <button>Create My Event!</button>
                </form>
            </div>
        )
    }
}

export default CreateRegistryModal;