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
            eventHostId: '',
            searchTriggered: false,
            resultsReturned: false
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
            searchTriggered: true,
            resultsReturned: true
        }) 
    }

    renderSearchResults() {
        if(this.state.searchTriggered) {
            if(this.state.foundEvents.length > 0) {
                return this.state.foundEvents.map((foundEvent) => {
                    return (
                        <div key={foundEvent.key} className="searchResult">
                            <p><span>Event Name: </span>{foundEvent.eventName}</p>
                            <p><span>Host Name: </span>{foundEvent.hostName}</p>
                            <button onClick={(event) => this.joinEvent(event, foundEvent.key, foundEvent.eventName, foundEvent.hostName, foundEvent.hostId,foundEvent.eventDate, foundEvent.eventLocation)}>JOIN EVENT</button>
                        </div>
                    )
                });
            }
            else {return <p>No results returned for search criteria</p>}
        }

    }

    joinEvent(event, eventKey, eventName, eventHost, eventHostId, eventDate, eventLocation) {
        event.preventDefault();

        const userevent ={
            hostName: eventHost,
            hostId: eventHostId,
            eventName: eventName,
            isHost: false,
            eventDate: eventDate,
            eventLocation: eventLocation
        }
        const dbref = firebase.database().ref(`/Users/${this.props.user.uid}/events`).child(eventKey).set(userevent);
        this.setState({eventKey: eventKey});
        this.setState({eventHostId:eventHostId});
        this.setState({redirect: true});
    }


    render() {
        if(this.state.redirect) {
            return <Redirect to={{pathname: `/dashboard/${this.state.eventKey}`, eventId: this.state.eventKey, userId: this.props.user.uid, isHost: false, hostId:this.state.eventHostId}}/>}
        return(
            <div className="modal">
                <div className="layout__XYCenter eventForm">
                    <a href="#" onClick={(event) => this.props.handleSearchClick(event)}><i className="fas fa-times eventFormControl link__black"></i></a>
                    <div className="centeredContent">
                        <h1>Search For a Registry</h1>
                        <form className="searchForm">
                            <input type="text" placeholder="Host Name" onChange={(event) => this.handleChange(event, "search")}/>
                            <a href="#" className="searchIcon" onClick={(event) => this.searchRegistry(event)}>
                                <i className="fas fa-search"></i>
                            </a>
                        </form>
                        {this.renderSearchResults()}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        const dbref = firebase.database().ref(`/events`);
        dbref.on('value', (snapshot) => {
            const allEventsData = snapshot.val();
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