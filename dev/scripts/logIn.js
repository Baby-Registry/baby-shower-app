import React from 'react';

class SignIn extends React.Component {
    constructor() {
        super();
    }

    // LogInUser(event) {
    //   event.preventDefault();
    //   const email = this.state.loginEmail;
    //   const password = this.state.loginPassword;
    //   firebase.auth().signInWithEmailAndPassword(email, password)
    //     .then((res) => {
    //       console.log(`Logged in as ${res.email}`);
    //     }), (error) => {
    //       console.log(error);
    //   }
    // }

    render() {
        return (
            <div className="signIn modal">
              <form onSubmit={(event) => this.props.SignIn(event)}>
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