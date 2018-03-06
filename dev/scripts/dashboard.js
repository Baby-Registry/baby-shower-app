import React from 'react';
import EventCard from './eventCard';
import CreateRegistryModal from './createRegistryModal';
import SearchForRegistryModal from './searchForRegistryModal';
import {
    Redirect
} from 'react-router-dom';

class Dashboard extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEvents: [],
            userHostEvents: [],
            showModal: false,
            showSearchModal: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.renderModal= this.renderModal.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.renderSearchModal= this.renderSearchModal.bind(this);
        this.listenToDB = this.listenToDB.bind(this);
    }

    handleClick(event, state) {
        event.preventDefault();
        this.state.showModal === false?
        this.setState({showModal: true })
        :this.setState({showModal: false})
    }

    renderModal() {
        if(this.state.showModal === true) {
            return(
                <CreateRegistryModal handleClick={this.handleClick} user={this.props.user} />
            )
        }
    }

    handleSearchClick(event) {
        event.preventDefault();
        this.state.showSearchModal === false?
        this.setState({showSearchModal: true })
        :this.setState({showSearchModal: false})
    }

    renderSearchModal() {
        if(this.state.showSearchModal === true) {
            return(
                <SearchForRegistryModal user={this.props.user} userHostEvents = {this.state.userHostEvents} />
            )
        }
    }

    render() {
        return(
            <main>

                    (<div className="wrapper">
                        {this.renderModal()}
                        {this.renderSearchModal()}
                        <h1>Events Dashboard</h1>
                        <div className="dashboardControls">
                            <button onClick={(event) => this.handleClick(event)}>Host a New Event</button>
                            <button onClick={(event) => this.handleSearchClick(event)} >Join an Event</button>
                        </div>
                        <section className="eventList">
        {/** iterate through array of user's events and for each event render a div container */}
                        {   this.state.userEvents.length > 0 ?
                                    (this.state.userEvents.map((event) => {
                                    return (
                                        <EventCard key={event.key} eventId={event.key} eventName={event.eventName} isHost={event.isHost} hostName={event.hostName} user={this.props.user} location={event.eventLocation} datetime={event.eventDate} hostId={event.hostId}/>
                                        )
                                    })
                                )
                                :
                                    <div className="noEventsMessage">
                                      <p>NO EVENTS</p>
                                    </div>
                            }
                        </section>
                    </div>)

            </main>
        )
    }
    // if refreshing dashboard
    componentWillReceiveProps(props) {
        console.log(`inside componrnet will reviece props`)
        if(props.user !== undefined && props.user !== null) {
            this.listenToDB();
            console.log(`running componenet will recieving props`);
        }
    }
    listenToDB() {
        console.log(`running listentoDB`,this.props);
        const dbref = firebase.database().ref(`/Users/${this.props.user.uid}/events`);
        // console.log(`/users/${this.props.user.uid}/events`);
        dbref.on('value', (snapshot) => {
            // console.log('In the db value')
            const eventsData = snapshot.val();
            const copyOfDB = [];
            const hostedEvents = [];
            for (let key in eventsData) {
                eventsData[key].key = key;
                copyOfDB.push(eventsData[key]);
            }
            for (let key in eventsData) {
                eventsData[key].key = key;
                if (eventsData[key].isHost === true) {
                    hostedEvents.push(eventsData[key].key);
                }
            }
            this.setState({
                userEvents: copyOfDB,
                userHostEvents: hostedEvents
            });
        });
    }

    // if arriving at dashboard from another page
    componentDidMount() {
        console.log(`inside component did mount`);
        if(this.props.user !== undefined && this.props.user !== null) {
            this.listenToDB();
            console.log(`running component did mount`);
        }
    }
}

export default Dashboard;