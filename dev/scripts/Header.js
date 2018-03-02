import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className='header__loggedOut'>
                <p>This is the header component</p>
            </header>
        )
    }
}

export default Header;