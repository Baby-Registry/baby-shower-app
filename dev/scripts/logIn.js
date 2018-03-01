import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="signIn">
              <form onSubmit={(event) => this.props.signIn(event)}>
                <h1>SignIn Form</h1>
                <input type="text" placeholder="E-mail address" onChange={(event) => this.props.handleChange(event, "loginEmail")} />
                <input type="password" placeholder="Password" onChange={(event) => this.props.handleChange(event, "loginPassword")} />
                <button>Login</button>
              </form>
            </div>
        )
    }
    
}

export default SignIn;