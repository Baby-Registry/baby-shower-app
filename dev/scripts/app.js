import React from 'react';
import ReactDOM from 'react-dom';
import LogIn from './logIn';
import SignUp from './signUp';
import SignOut from './signOut';
import Dashboard from './dashboard';
import { 
  BrowserRouter as Router, 
  Route, Link } from 'react-router-dom';
import variables from "./config.js";
import axios from "axios";
import RegistryPage from "./registryPage.js";
import InviteLandingPage from "./inviteLandingPage";
import Header from "./header";

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
        loggedIn: false,
        user: {},
        loginEmail: '',
        loginPassword: ''
      }
      this.LogInUser = this.LogInUser.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.signOutUser = this.signOutUser.bind(this);
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
  
    handleChange(event, field) {
      const newState = Object.assign({}, this.state);
      newState[field] = event.target.value;
      this.setState(newState);
    }

    signOutUser() {
      firebase.auth().signOut().then(function(res) {
        console.log('Signed out!')
      }, function(error) {
        console.log(error);
      });

      this.setState({
          user: {},
          loggedIn: false
      })
    }

    render() {
      return (
        <Router>
          <div>
            <Route path="/" exact component={Header} />

            {/* <SignUp /> */}
            {
            this.state.loggedIn === true?
            <section>
              <SignOut signOutUser={this.signOutUser}/>
              <Dashboard user={this.state.user} loggedIn={this.state.loggedIn}/>
            </section>
            :
              <LogIn logIn={this.LogInUser} handleChange={this.handleChange}/>

            }

            <Route path="/dashboard/:eventid" exact component={RegistryPage}/>
          </div>
        </Router>
      )
    }
  
    componentDidMount() {
      firebase.auth().onAuthStateChanged((res) => {
        console.log(res);
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
