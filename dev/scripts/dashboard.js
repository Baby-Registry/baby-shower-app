import React from 'react';
import EventCard from './eventCard';
import RegistryInfo from './registryInfo';

class Dashboard extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEvents: [],
            showModal: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.renderModal= this.renderModal.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.state.showModal === false?
        this.setState({showModal: true })
        :this.setState({showModal: false})
    }

    renderModal() {
        if(this.state.showModal === true) {
            return(
                <RegistryInfo handleClick={this.handleClick} user={this.props.user} />
            )
        }
    }

    render() {
        return(
            <main>
                {this.renderModal()}
                <h1>Events Dashboard</h1>
                <div className="dashboardControls">
                    <button onClick={(event) => this.handleClick(event)}>Host a New Event</button>
                    <button>Join an Event</button>
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