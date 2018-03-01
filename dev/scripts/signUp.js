import React from 'react';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="signUp">
                <form onSubmit={(event) => this.props.createUser(event)}>
                    <input type="text" value = {this.props.createEmail} placeholder="Please enter e-mail address" onChange={(event) => this.props.handleChange(event, "createEmail")} />
                    <input type="password" value = {this.props.createPassword} placeholder="Please enter password" onChange={(event) => this.props.handleChange(event, "createPassword")} />
                    <button>Create User</button>
                </form>
            </div>
        )
    }
}

export default SignUp;