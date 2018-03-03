import React from 'react';
import EventCard from './eventCard';
import CreateRegistryModal from './createRegistryModal';
import SearchForRegistryModal from './searchForRegistryModal';

class Dashboard extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEvents: [],
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
                <SearchForRegistryModal user={this.props.user} />
            )
        }
    }

    render() {
        return(
            <main>
                {this.renderModal()}
                {this.renderSearchModal()}
                <h1>Events Dashboard</h1>
                <div className="dashboardControls">
                    <button onClick={(event) => this.handleClick(event)}>Host a New Event</button>
                    <button onClick={(event) => this.handleSearchClick(event)} >Join an Event</button>
                </div>
                <section>
{/** iterate through array of user's events and for each event render a div container**/}
                    {   this.state.userEvents.length > 0?
                            (this.state.userEvents.map((event) => {
                            return (



                                <EventCard key={event.key} eventId={event.key} eventName={event.eventName} isHost={event.isHost} hostName={event.hostName} user={this.props.user}/>

                                )
                            })
                        )
                        :
                            <div>NO EVENTS</div>
                    }
                </section>
            </main>
        )
    }

    componentDidMount() {
        console.log(this.props.user);
        const dbref = firebase.database().ref(`/Users/${this.props.user.uid}/events`);
        console.log(`/users/${this.props.user.uid}/events`);
        dbref.on('value', (snapshot) => {
            const eventsData = snapshot.val();
            const copyOfDB = [];
            for (let key in eventsData) {
                eventsData[key].key = key;
                copyOfDB.push(eventsData[key]);
            }
            this.setState({
                userEvents: copyOfDB
            });
        });
    }
}

export default Dashboard;