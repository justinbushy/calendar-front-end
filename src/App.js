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

class App extends Component {
  render() {
    return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
