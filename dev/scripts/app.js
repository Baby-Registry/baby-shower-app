import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router, 
  Route, Link } from 'react-router-dom';
import variables from "./config.js";
import axios from "axios";
import Qs from 'qs';

 const config = {
  apiKey: "AIzaSyAqWbiYS8Zx2pFxm9T9Fj_NMC-9YQRRSfg",
  authDomain: "baby-registry-b41ed.firebaseapp.com",
  databaseURL: "https://baby-registry-b41ed.firebaseio.com",
  projectId: "baby-registry-b41ed",
  storageBucket: "baby-registry-b41ed.appspot.com",
  messagingSenderId: "69422388260"
};

firebase.initializeApp(config);

class Data extends React.Component {
  constructor() {
    super();
    this.state = {
      search:"",
      categories: {
        accessories:"",
        bath_and_beauty:"",
        children:"",
        clothing:"",
        dolls_and_miniatures:"",
        everything_else:"",
        patterns:"",
        quilts:"",
        toys:""
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }
  handleChange (e) {
    this.setState({
      [e.target.id]:e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const searchInput = this.state.search;
    this.componentDidMount(searchInput);
  }
  handleCategory (e) {
    console.log(e.target.value);
  }
  componentDidMount (searchInput) {
    axios({
      method: 'GET',
      url: 'http://proxy.hackeryou.com',
      dataResponse: 'json',
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
      params: {
        reqUrl: `${variables.apiURL}/listings/active`,
        params: {
          api_key:`${variables.apiKey}`,
          tags:searchInput,
          keywords:searchInput,
          category:"clothing toys"
        },
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false
      }
    }).then(({ data }) => {
      console.log(data);
    });
}
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search">Search</label>
          <input type="text" id="search" value={this.state.search} onChange={this.handleChange} />
          <input type="submit" value="submit"/>
        </form>
        <form>
          <label htmlFor="accessories">Accessories</label>
          <input type="checkbox" name="accessories" id="accessories" value="accessories" onChange={this.handleCategory}/>

          <label htmlFor="bath_and_beauty">Bath and Beauty</label>
          <input type="checkbox" name="bath_and_beauty" id="bath_and_beauty" value="bath_and_beauty"/>

          <label htmlFor="children">Children</label>
          <input type="checkbox" name="children" id="children" value="children"/>

          <label htmlFor="clothing">Clothing</label>
          <input type="checkbox" name="clothing" id="clothing" value="clothing"/>

          <label htmlFor="dolls_and_miniatures">Dolls and Miniatures</label>
          <input type="checkbox" name="dolls_and_miniatures" id="dolls_and_miniatures" value="dolls_and_miniatures"/>

          <label htmlFor="everything_else">Miscellaneous</label>
          <input type="checkbox" name="everything_else" id="everything_else" value="everything_else"/>

          <label htmlFor="patterns">Patterns</label>
          <input type="checkbox" name="patterns" id="patterns" value="patterns"/>

          <label htmlFor="quilts">Quilts</label>
          <input type="checkbox" name="quilts" id="quilts" value="quilts"/>

          <label htmlFor="toys">Toys</label>
          <input type="checkbox" name="toys" id="toys" value="toys"/>

        </form>
      </div>
    )
  }
}

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        loggedIn:false
      }
    }
    render() {
      return (
        <div>
          {/* ternary operator depending on loggedIn */}
          <p>Hello</p>
          <Data />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
