import React from 'react';

class RegistryInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            eventDate: '',
            eventLocation: ''
        }
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
    }

    render() {
        return(
            <div>
                <button onSubmit={(event) => this.props.handleClick(event)}>Close</button>
                <h1>New Event</h1>
                <form onSubmit={(event) => this.createEvent(event)}>
                    <input type="text" placeholder="Name of event" onChange={(event) => this.handleChange(event, "eventName")} />
                    <input type="text" placeholder="Date" onChange={(event) => this.handleChange(event, "eventDate")} />
                    <input type="text" placeholder="Location" onChange={(event) => this.handleChange(event, "eventLocation")} />
                    <button>Create My Event!</button>
                </form>
            </div>
        )
    }
}

export default RegistryInfo;