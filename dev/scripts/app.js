import React from 'react';
import ReactDOM from 'react-dom';
import LogIn from './logIn';
import SignUp from './signUp';
import SignOut from './signOut';
import Dashboard from './dashboard';
import { 
  BrowserRouter as Router, 
  Route, Link, Redirect } from 'react-router-dom';
import variables from "./config.js";
import axios from "axios";
import RegistryPage from "./registryPage.js";
import InviteLandingPage from "./inviteLandingPage";
import Header from "./Header";
import Homepage from "./HomePage"

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
        loginPassword: '',
        showLogin: false,
        showSignUp: false,
        redirectToDashboard: false,
      }
      this.logInUser = this.logInUser.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.signOutUser = this.signOutUser.bind(this);
      this.showLogin = this.showLogin.bind(this);
      this.showSignUp = this.showSignUp.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.googleSignIn = this.googleSignIn.bind(this);
      this.redirectUserToDashBoard = this.redirectUserToDashBoard.bind(this);
      this.firebaseListener = this.firebaseListener.bind(this);
    }

    logInUser(event) {
      event.preventDefault();
      const email = this.state.loginEmail;
      const password = this.state.loginPassword;
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(`Logged in as ${res.email}`);
          // close modal after login
          this.setState({
             showLogin: false,
          });
        }), (error) => {
          console.log(error);
        }
    }

    googleSignIn() {
      const provider = new firebase.auth.GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: 'select_account'
      });

      firebase.auth().signInWithPopup(provider)
        .then((user) => {
          this.closeModal();
        }), (error) => {
          alert(error);
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

      // return  <p><Redirect to="/" /></p> ;
      this.redirectUserToDashBoard();
    }

    // 3 methods for showing/hiding the log in /sign up modals
    showLogin() {
      this.setState({ showLogin: true });
    }

    showSignUp() {
      this.setState({ showSignUp: true });
    }

    //need to pass this to SignOut and LogIn
    closeModal() {
      this.setState({ showLogin: false, showSignUp: false, });
    }

    // redirect user to dashboard after they log in
    redirectUserToDashBoard() {
      this.setState({
        redirectToDashboard: true,
      });
    }


    render() {
      return (
        <Router>
          <React.Fragment>
            {/* always show header */}
            <Header user={this.state.user} signOutUser={this.signOutUser} showLogin={this.showLogin} showSignUp={this.showSignUp} closeModal={this.closeModal} googleSignIn={this.googleSignIn} />

            {/* always show/toggle log in or sign out modals */}
            {this.state.showLogin ?
              <LogIn logIn={this.logInUser} handleChange={this.handleChange} closeModal={this.closeModal} googleSignIn={this.googleSignIn}/>
            : null}
  
            {this.state.showSignUp ?
              <SignUp closeModal={this.closeModal} googleSignIn={this.googleSignIn} redirectUserToDashBoard={this.redirectUserToDashBoard} />
            : null }


            <Route path="/dashboard/:eventid" exact component={RegistryPage} />

            <Route
              path="/invite/:eventid" exact
              render={(props) => (
              <InviteLandingPage {...this.state.user} 
              {...props}
              showLogin= { this.showLogin }
              showSignUp = { this.showSignUp }
              closeModal = { this.closeModal }
              /> )} 
            />

            <Route
              path="/dashboard" exact
              render={(props) => (
                <Dashboard user={this.state.user}
                  loggedIn={this.state.loggedIn}
                />)}
            />
            
            {/* redirectToDashboard once user signs in. Otherwise reload this page */}
            {
              (this.state.redirectToDashboard === true) ?
                <div>
                  <Redirect to="/dashboard" />
                </div>
                :
                  <Redirect to="/" />
            }
            
            {/* added this to fix bug with page not refreshing when loggin out on registry page */}
            {
              this.state.loggedIn ?
                <Redirect to="/dashboard" />
              :
              <Homepage />
            }


          </React.Fragment>
        </Router>
      )
    }

    // componentWillReceiveProps() {
    //   this.firebaseListener();
    // }
    
    firebaseListener() {
      firebase.auth().onAuthStateChanged((res) => {
        if (res) {
          this.setState({
            loggedIn: true,
            user: res
          },() => {
            this.redirectUserToDashBoard();
          });
        } else {
          this.setState({
            loggedIn: false,
            user: res,
            redirectToDashboard: false
          });
        }
      })
    }

    componentDidMount() {
      this.firebaseListener();
    }
  }

ReactDOM.render(<App />, document.getElementById('app'));
