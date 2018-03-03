import React from 'react';

class LogIn extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="logIn modal">
              <form onSubmit={(event) => this.props.logIn(event)}>
                <h1>SignIn Form</h1>
                <input type="text" placeholder="E-mail address" onChange={(event) => this.props.handleChange(event, "loginEmail")} />
                <input type="password" placeholder="Password" onChange={(event) => this.props.handleChange(event, "loginPassword")} />
                <button>Login</button>
              </form>
            </div>
        )
    }
    
}

export default LogIn;