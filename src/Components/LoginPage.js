import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      successful: false
    };
  }

  handleClick(event) {
    console.log('clicked');
    var payload = {
      "email":this.state.email,
      "password":this.state.password
    };

    var self = this;
    console.log(payload);
    axios.post(this.props.baseUri + '/users/signin', payload)
      .then(function(response) {
        console.log(response);
        if(response.status === 200) {
          console.log('Login successful');
          self.setState({successful: true});
        }
      })
      .catch(function(err) {
        console.log(err);
      })
  }

  render() {
    if(this.state.successful) {
      return (
        <Redirect to="/dashboard"/>
      )
    }
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
            <br/>
            <br/>
            <RaisedButton
              label="Register"
              primary={true}
              containerElement={<Link to="/register"/>}
            >
            </RaisedButton>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default LoginPage;