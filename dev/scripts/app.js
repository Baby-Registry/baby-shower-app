import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router, 
  Route, Link } from 'react-router-dom';

 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyAqWbiYS8Zx2pFxm9T9Fj_NMC-9YQRRSfg",
  authDomain: "baby-registry-b41ed.firebaseapp.com",
  databaseURL: "https://baby-registry-b41ed.firebaseio.com",
  projectId: "baby-registry-b41ed",
  storageBucket: "baby-registry-b41ed.appspot.com",
  messagingSenderId: "69422388260"
};
firebase.initializeApp(config);

class App extends React.Component {
    render() {
      return (
        <div>
          <p>Hello</p>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
