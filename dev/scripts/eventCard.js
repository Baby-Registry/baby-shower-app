import React from 'react';

class EventCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        }
        this.allowEdit = this.allowEdit.bind(this);
        this.showForm = this.showForm.bind(this);
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
            return (
                <p>{eventName}</p>
            )
        }
    }


    render() {
        return(
            <div className="event">
                <p>Host</p>
                <a href="#" className="btn__edit" onClick={(e) => this.allowEdit(e)}>Edit</a>
                {this.showForm(this.props.eventName)}
                <button>Add to Registry</button>
            </div>
        )
    }
}

export default EventCard;