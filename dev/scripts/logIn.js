import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginEmail : '',
            loginPassword: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.LogInUser = this.LogInUser.bind(this);
    }

    handleChange(event, field) {
        const newState = Object.assign({}, this.state);
        newState[field] = event.target.value;
        this.setState(newState);
    }

    LogInUser(event) {
      event.preventDefault();
      const email = this.state.loginEmail;
      const password = this.state.loginPassword;
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(`Logged in as ${res.email}`);
        }), (error) => {
          console.log(error);
      }
    }

    render() {
        return (
            <div className="signIn modal">
              <form onSubmit={(event) => this.LogInUser(event)}>
                <h1>SignIn Form</h1>
                <input type="text" placeholder="E-mail address" onChange={(event) => this.handleChange(event, "loginEmail")} />
                <input type="password" placeholder="Password" onChange={(event) => this.handleChange(event, "loginPassword")} />
                <button>Login</button>
              </form>
            </div>
        )
    }
    
}

export default SignIn;