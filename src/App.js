import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Calendar Front End</h1>
        </header>
        <p className="App-intro">
            This is the front-end for a calendar web app. 
        </p>
      </div>
    );
  }
}

export default App;
