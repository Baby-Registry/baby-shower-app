import React from 'react';

class SearchForRegistryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            existingEvents: [],
            foundEvents: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchRegistry = this.searchRegistry.bind(this);
    }

    handleChange(event, field) {
        const newState = Object.assign({}, this.state);
        newState[field] = event.target.value;
        this.setState(newState);
    }

    searchRegistry(event) {
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


    render() {
        return(
            <div>
                <form onSubmit={(event) => this.searchRegistry(event)}>
                    <input type="text" onChange={(event) => this.handleChange(event, "search")}/>
                    <button>Search</button>
                    {this.state.foundEvents.map((foundEvent) => {
                        return(
                            <div key={foundEvent.key}>
                                <p>{foundEvent.eventName}</p>
                                <p>{foundEvent.eventHost}</p>
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