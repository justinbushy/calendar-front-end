import React, { Component } from 'react';
import './App.css';
import LoginPage from './Components/LoginPage'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import RegisterPage from "./Components/RegisterPage";
import HomePage from "./Components/HomePage";
import Dashboard from "./Components/Dashboard";
import Friends from './Components/Friends';

class App extends Component {
  render() {
    /*var baseUri = "https://immense-eyrie-34156.herokuapp.com/api";*/
    let baseUri = "http://10.249.207.217:5000/api";
    return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" render={(props) => (<LoginPage baseUri={baseUri} {...props}/>)} />
          <Route path="/register" render={(props) => (<RegisterPage baseUri={baseUri} {...props}/>)} />
          <Route path="/dashboard" render={(props) => (<Dashboard baseUri={baseUri} {...props}/>)} />
          <Route path="/friends" render={(props) => (<Friends baseUri={baseUri} {...props}/>)} />
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
