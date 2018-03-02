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
        user: {}
      }
    }

    render() {
      return (
        <Router>
          <div>
            <Header />
            {/* these are here temporarily */}
            <LogIn />
            {/* <SignUp /> */}
            <SignOut user={this.state.user}/>
            <Dashboard user={this.state.user} loggedIn={this.state.loggedIn}/>
            <Route path="/dashboard/:eventid" exact component={RegistryPage}/>

              <RegistryPage />
          </div>
        </Router>
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
