import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import List, { ListItem } from 'material-ui/List';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

const styles = {
  width: 150
}

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      successful: false,
      drawerOpen: false,
      userId: '',
      authTok: ''
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({drawerOpen: !this.state.drawerOpen});
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
          var uID = response.data.user_id;
          console.log("uID: " + uID);
          self.setState({userId: uID, authTok: response.data.token});
          console.log('userId');
          console.log(self.state.userId)
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
        <Redirect to={{
          pathname: "/dashboard",
          state: { userId: this.state.userId, authTok: this.state.authTok }
        }}/>
      )
    }
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu" onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit">
              Login
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={this.state.drawerOpen}
          onRequestClose={this.toggleDrawer}
        >
          <List style={styles}>
           <ListItem button component={Link} to="/">
             Home
           </ListItem>
          </List>
        </Drawer>
        <div>
          <TextField
            label="Email"
            placeholder="Email"
            margin="normal"
            type="email"
            onChange = {(event) => this.setState({email: event.target.value})}
          />
          <br/>
          <TextField
            label="Password"
            type="Password"
            margin="normal"
            onChange = {(event) => this.setState({password: event.target.value})}
          />
          <br/>
          <Button raised color="primary" onClick={(event) => this.handleClick(event)}>
            Submit
          </Button>
          <br/>
          <br/>
          <Button raised component={Link} color="primary" to="/register">
            Register
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LoginPage);