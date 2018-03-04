import React from 'react';
import { Redirect } from 'react-router';

class SearchForRegistryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            existingEvents: [],
            foundEvents: [],
            redirect: false,
            eventKey: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchRegistry = this.searchRegistry.bind(this);
        this.joinEvent = this.joinEvent.bind(this);
    }

    handleChange(event, field) {
        const newState = Object.assign({}, this.state);
        newState[field] = event.target.value;
        this.setState(newState);
    }

    searchRegistry(event) {
        event.preventDefault();
        let events = [];
        this.state.existingEvents.map((event) => {
            event.hostName === this.state.search?
            events.push(event)
            : console.log("not a match");
        });
        this.setState ({
            foundEvents: events
        })
    }

    joinEvent(event, eventKey, eventName, eventHost) {
        event.preventDefault();

        const userevent ={
            hostName: eventHost,
            eventName: eventName,
            isHost: false
        }
        const dbref = firebase.database().ref(`/Users/${this.props.user.uid}/events`).child(eventKey).set(userevent);
        this.setState({eventKey: eventKey});
        this.setState({redirect: true});
    }


    render() {
        if(this.state.redirect) {return <Redirect to={{pathname: `/dashboard/${this.state.eventKey}`, eventId: this.state.eventKey, userId: this.props.user.uid, isHost: false}}/>}
        return(
            <div>
                <form onSubmit={(event) => this.searchRegistry(event)}>
                    <input type="text" onChange={(event) => this.handleChange(event, "search")}/>
                    <button>Search</button>
                    {this.state.foundEvents.map((foundEvent) => {
                        return(
                            <div key={foundEvent.key}>
                                    <p>{foundEvent.eventName}</p>
                                    <p>{foundEvent.hostName}</p>
                                    <button onClick={(event) => this.joinEvent(event, foundEvent.key, foundEvent.eventName, foundEvent.hostName)}>JOIN EVENT</button>
                            </div>
                        )
                    })}
                </form>
            </div>
        )
    }

    componentDidMount() {
        const dbref = firebase.database().ref(`/events`);
        dbref.on('value', (snapshot) => {
            const allEventsData = snapshot.val();
            console.log(allEventsData);
            const copyOfDB = [];
            for (let key in allEventsData) {
                allEventsData[key].key = key;
                copyOfDB.push(allEventsData[key]);
                // console.log(copyOfDB);
            }
            this.setState({
                existingEvents: copyOfDB
            });
            // console.log(this.state.existingEvents);
        });
    }
}

export default SearchForRegistryModal;