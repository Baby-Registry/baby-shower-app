import React from 'react';

class SearchForRegistryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            existingEvents: []
        }
    }

    handleChange(event, field) {
        const newState = Object.assign({}, this.state);
        newState[field] = event.target.value;
        this.setState(newState);
    }


    render() {
        return(
            <div>
                <form>
                    <input type="text" onChange={(event) => this.handleChange(event, "search")}/>
                    <button>Search</button>
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
                console.log(copyOfDB);
            }
            this.setState({
                existingEvents: copyOfDB
            });
            console.log(this.state.existingEvents);
        });
    }
}

export default SearchForRegistryModal;