import React from 'react';
import RegistryInfo from './registryInfo';

class Dashboard extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEvents: [],
            isEditing : false,
            showModal: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.renderModal= this.renderModal.bind(this);
        this.allowEdit = this.allowEdit.bind(this);
        this.showForm = this.showForm.bind(this);
    }


    handleClick(event) {
        event.preventDefault();
        this.state.showModal === false?
        this.setState({showModal: true })
        :this.setState({showModal: false})
    }

    allowEdit(e) {
        console.log(e.target);
        this.setState({
            isEditing: true
        })
    }

    showForm(eventName) {
        if (this.state.isEditing) {
            return (
            <form className="editEventDescription" onSubmit={this.edit}>
                <input type="text" defaultValue={this.state.eventDescription} />
                <input type="text" defaultValue={this.state.eventTitle} />
                <button>Save</button>
            </form>
            )
        } else {
            return (<React.Fragment>
                <p>{eventName}</p>
            </React.Fragment>)
        }
    }

    renderModal() {
        if(this.state.showModal === true) {
            return(
                <RegistryInfo handleClick={this.handleClick}/>
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
                                event.isHost === true?
                                    <div className="event" key={event.key}>
                                        {/* <p>{event.eventName}</p> */}
                                        <p>Host</p>
                                        <a href="#" className="btn__edit" onClick={(e) => this.allowEdit(e)}>Edit</a>
                                        {this.showForm(event.eventName)}
                                        <button>Add to Registry</button>
                                    </div>
                                : 
                                    (event.isHost === false?
                                        <div className="event" key={event.key}>
                                            <p>{`${event.eventName} - Attandee`}</p>
                                            <button>See Registry</button>
                                        </div>
                                    :   
                                        <div key='error'>
                                            <p>isHost property has invalid value</p>
                                        </div>
                                    )
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