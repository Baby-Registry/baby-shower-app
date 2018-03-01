import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './logIn';
import SignUp from './signUp';
import SignOut from './signOut';
import Dashboard from './dashboard';
import { 
  BrowserRouter as Router, 
  Route, Link } from 'react-router-dom';
import variables from "./config.js";
import axios from "axios";
import Data from "./data.js";

 const config = {
  apiKey: "AIzaSyAqWbiYS8Zx2pFxm9T9Fj_NMC-9YQRRSfg",
  authDomain: "baby-registry-b41ed.firebaseapp.com",
  databaseURL: "https://baby-registry-b41ed.firebaseio.com",
  projectId: "baby-registry-b41ed",
  storageBucket: "baby-registry-b41ed.appspot.com",
  messagingSenderId: "69422388260"
};

firebase.initializeApp(config);

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        loginEmail: '',
        loginPassword: '',
        loggedIn: false,
        createEmail: '',
        createPassword: '',
        user: {}
      }
      this.handleChange = this.handleChange.bind(this);
      this.signIn = this.signIn.bind(this);
      this.createUser = this.createUser.bind(this);
      this.signOut = this.signOut.bind(this);
    }

    handleChange(event, field) {
      const newState = Object.assign({}, this.state);
      newState[field] = event.target.value;
      this.setState(newState);
    }

    signIn(event) {
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

    createUser(event) {
      event.preventDefault();
      const email = this.state.createEmail;
      const password = this.state.createPassword;
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch((error) => console.log(error.code, error.message));
      this.setState ({
        createEmail: '',
        createPassword: ''
      });
    }

    signOut() {
      firebase.auth().signOut().then(function(res) {
        console.log('Signed out!')
      }, function(error) {
        console.log(error);
      });
    }
    
    render() {
      return (
        <div>
          {
            this.state.loggedIn === false?
            <section>
              <SignIn signIn={this.signIn} signInStatus={this.state.loggedIn} handleChange={this.handleChange} />
              <SignUp createUser={this.createUser} handleChange={this.handleChange} />
            </section>
            : 
            <section>
              <SignOut signOut={this.signOut} />
              <Dashboard user={this.state.user} />
            </section>
            }
            <Data />
        </div>
      )
    }

    componentDidMount() {
      firebase.auth().onAuthStateChanged((res) => {
        if (res) {
            this.setState({
              loggedIn: true,
              user: res
            });
          } else {
            this.setState({
              loggedIn: false,
              user: res
            });
          }
      })
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
