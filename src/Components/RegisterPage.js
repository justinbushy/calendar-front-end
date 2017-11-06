import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
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
        {/*<AppBar title="Register"/>*/}
          <AppBar position="static">
            <Toolbar>
              <IconButton color="contrast" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit">
                Register
              </Typography>
            </Toolbar>
          </AppBar>
          <div>
            <TextField
              label="First Name"
              placeholder="First Name"
              margin="dense"
              onChange={(event, newValue) => this.setState({first_name:newValue})}
            />
            <br/>
            <TextField
              label="Last Name"
              placeholder="Last Name"
              margin="dense"
              onChange={(event, newValue) => this.setState({last_name:newValue})}
            />
            <br/>
            <TextField
              label="Email"
              placeholder="Email"
              margin="dense"
              onChange={(event, newValue) => this.setState({email:newValue})}
            />
            <br/>
            <TextField
              label="User Name"
              placeholder="User Name"
              margin="dense"
              onChange={(event, newValue) => this.setState({user_name:newValue})}
            />
            <br/>
            <TextField
              label="Password"
              type="password"
              margin="dense"
              onChange={(event, newValue) => this.setState({password:newValue})}
            />
            <br/>
            <br/>
            {/*
            <RaisedButton
              label="Register"
              primary={true}
              onClick={(event) => this.handleClick(event)}
            />
            */}
            <Button raised color="primary" onClick={(event) => this.handleClick(event)}>
              Register
            </Button>
          </div>
      </div>
    );
  }
}

export default RegisterPage;