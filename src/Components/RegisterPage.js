import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      user_name: '',
      password: '',
      successful: false
    }
  }

  handleClick(event) {
    let payload ={
      "first_name": this.state.first_name,
      "last_name": this.state.last_name,
      "email": this.state.email,
      "user_name": this.state.user_name,
      "password": this.state.password
    };

    let self = this;
    console.log(payload);
    axios.post(this.props.baseUri + '/users', payload)
      .then(function(response){
        console.log(response);
        if(response.status === 200) {
          console.log('Registered User');
          self.setState({successful: true});
        }
      })
  }

  render() {
    if(this.state.successful) {
      return <Redirect to="dashboard"/>
    }
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