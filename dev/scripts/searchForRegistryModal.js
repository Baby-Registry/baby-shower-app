import React from 'react';
import { Redirect } from 'react-router';
import { SSL_OP_PKCS1_CHECK_2 } from 'constants';

class SearchForRegistryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            existingEvents: [],
            foundEvents: [],
            redirect: false,
            eventKey: '',
            searchTriggered: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchRegistry = this.searchRegistry.bind(this);
        this.joinEvent = this.joinEvent.bind(this);
        this.renderSearchResults = this.renderSearchResults.bind(this);
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
            if (event.hostName === this.state.search) {
                if((this.props.userHostEvents.indexOf(event.key)>=0) === false) {
                        events.push(event);
                }
            }
        })

        this.setState ({
            foundEvents: events,
            searchTriggered: true
        }) 
    }

    renderSearchResults() {
        if(this.state.searchTriggered) {
            if(this.state.foundEvents.length > 0) {
                return this.state.foundEvents.map((foundEvent) => {
                    return (
                        <div key={foundEvent.key}>
                            <p>{foundEvent.eventName}</p>
                            <p>{foundEvent.hostName}</p>
                            <button onClick={(event) => this.joinEvent(event, foundEvent.key, foundEvent.eventName, foundEvent.hostName)}>JOIN EVENT</button>
                        </div>
                    )
                });
            }
            else {return <div>No results returned for search criteria</div>}
        }

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
        if(this.state.redirect) {
            return <Redirect to={{pathname: `/dashboard/${this.state.eventKey}`, eventId: this.state.eventKey, userId: this.props.user.uid, isHost: false}}/>}
        return(
            <div>
                <form onSubmit={(event) => this.searchRegistry(event)}>
                    <input type="text" onChange={(event) => this.handleChange(event, "search")}/>
                    <button>Search</button>
                    {this.renderSearchResults()}
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
            }
            this.setState({
                existingEvents: copyOfDB
            });
        });
    }
}

export default SearchForRegistryModal;