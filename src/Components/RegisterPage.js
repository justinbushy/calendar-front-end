import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';

var apiBaseUrl = "http://localhost:5000/api";

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      user_name: '',
      password: ''
    }
  }

  handleClick(event) {
    var payload ={
      "first_name": this.state.first_name,
      "last_name": this.state.last_name,
      "email": this.state.email,
      "user_name": this.state.user_name,
      "password": this.state.password
    }
    console.log(payload);
    axios.post(apiBaseUrl + '/users', payload)
      .then(function(response){
        console.log(response);
        if(response.data.code === 2000) {
          console.log('Registered User');
        }
      })
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="Register"/>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="First Name"
              floatingLabelText="First Name"
              onChange={(event, newValue) => this.setState({first_name:newValue})}
            />
            <br/>
            <TextField
              hintText="Last Name"
              floatingLabelText="Last Name"
              onChange={(event, newValue) => this.setState({last_name:newValue})}
            />
            <br/>
            <TextField
              hintText="Email"
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({email:newValue})}
            />
            <br/>
            <TextField
              hintText="User Name"
              floatingLabelText="User Name"
              onChange={(event, newValue) => this.setState({user_name:newValue})}
            />
            <br/>
            <TextField
              hintText="Password"
              floatingLabelText="Password"
              type="password"
              onChange={(event, newValue) => this.setState({password:newValue})}
            />
            <br/>
            <br/>
            <RaisedButton
              label="Register"
              primary={true}
              onClick={(event) => this.handleClick(event)}
            />
          </div>
        </MuiThemeProvider>

      </div>
    );
  }
}

export default RegisterPage;