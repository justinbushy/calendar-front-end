import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import axios from 'axios';

var apiBaseUrl = "http://localhost:5000/api";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleClick(event) {
    console.log('clicked');
    var payload = {
      "email":this.state.email,
      "password":this.state.password
    }
    axios.post(apiBaseUrl + '/users/signin', payload)
      .then(function(response) {
        console.log(response);
        if(response.data.code === 200) {
          console.log('Login successful');
        }
      })
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="Login"/>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <div>
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            onChange = {(event, newValue) => this.setState({email:newValue})}
          />
          <br/>
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            onChange = {(event, newValue) => this.setState({password: newValue})}
          />
          <br/>
          <RaisedButton
            label="Submit"
            primary={true}
            onClick={(event) => this.handleClick(event)}
          />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default LoginPage;