import React from 'react';

class RegistryInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <button onClick={(event) => this.props.handleClick(event)}>Close</button>
                <h1>New Event</h1>
                <input type="text" placeholder="Name of event"/>
                <input type="text" placeholder="Date"/>
                <input type="text" placeholder="Location"/>
                {/* <button to="">Create My Event!</button> */}
            </div>
        )
    }
}

export default RegistryInfo;