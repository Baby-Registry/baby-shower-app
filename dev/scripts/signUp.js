import React from 'react';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createEmail: '',
            createPassword: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.createUser = this.createUser.bind(this);

    }

    createUser(event) {
        event.preventDefault();
        const email = this.state.createEmail;
        const password = this.state.createPassword;
        console.log("creating user now")
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((error) => console.log(error.code, error.message));
        this.setState({
            createEmail: '',
            createPassword: ''
        });
    }

    handleChange(event, field) {
        const newState = Object.assign({}, this.state);
        newState[field] = event.target.value;
        this.setState(newState);
    }

    render() {
        return(
            <div className = "signUp modal">
                <form onSubmit={(event) => this.createUser(event)}>
                    <input type="text" value={this.state.createEmail} placeholder="Please enter e-mail address" onChange={(event) => this.handleChange(event, "createEmail")} />
                    <input type="password" value={this.state.createPassword} placeholder="Please enter password" onChange={(event) => this.handleChange(event, "createPassword")} />
                    <button>Create User</button>
                </form>
            </div>
        )
    }
}

export default SignUp;