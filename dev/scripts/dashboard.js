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
                <SearchForRegistryModal user={this.props.user} userHostEvents = {this.state.userHostEvents} handleSearchClick={this.handleSearchClick} />
            )
        }
    }

    render() {
        return(
            <main>
                {this.renderModal()}
                {this.renderSearchModal()}
                <div className="wrapper">
                    <h1>Events Dashboard</h1>
                    <div className="dashboardControls">
                        <button onClick={(event) => this.handleClick(event)}>Host a New Event</button>
                        <button onClick={(event) => this.handleSearchClick(event)} >Join an Event</button>
                    </div>
                    <section className="eventList">
                    {/** iterate through array of user's events and for each event render a div container */}

                    {   (this.props.userEvents.length > 0 && this.props.user) ?
                                (this.props.userEvents.map((event) => {
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
                </div>
            </main>
        )
    }
    // if refreshing dashboard
    componentWillReceiveProps(props) {
        if(props.user !== undefined && props.user !== null) {
            this.setState({
                userHostEvents: props.userHostEvents
            })
        }
    }

    // if arriving at dashboard from another page
    componentDidMount() {
        if(this.props.user !== undefined && this.props.user !== null) {
            this.setState({
                userHostEvents: this.props.userHostEvents
            })
        }
    }
}

export default Dashboard;