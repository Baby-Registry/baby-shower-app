import React from 'react';

class Dashboard extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEvents: []
        }
    }

    render() {
        return(
            <main>
                <h1>Events Dashboard</h1>
                <div className="dashboardControls">
                    <button>Host a New Event</button>
                    <button>Join an Event</button>
                </div>
                <section>
{/** iterate through array of user's events and for each event render a div container**/}
                    {
                        this.state.userEvents.map((event) => {
                        return (
                            event.isHost === true?
                                <div className="event" key={event.key}>
                                    <p>{`${event.eventName} - Host`}</p>
                                </div>
                            :
                                <div className="event" key={event.key}>
                                    <p>{`${event.eventName} - Attandee`}</p>
                                </div>
                        )
                        })
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