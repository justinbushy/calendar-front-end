import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import List, { ListItem } from 'material-ui/List';

const styles = {
  width: 150
};

class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.location.state.userId,
      authTok: props.location.state.authTok,
      drawerOpen: false
    };

    console.log('Friends');
    console.log(this.state.userId);
    console.log(this.state.authTok);
  }

  toggleDrawer = () => {
    this.setState({drawerOpen: !this.state.drawerOpen});
  };

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu" onClick={this.toggleDrawer}>
              <MenuIcon/>
            </IconButton>
            <Typography type="title" color="inherit">
              Friends
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={this.state.drawerOpen}
          onRequestClose={this.toggleDrawer}
        >
          <List style={styles}>
            <ListItem button component={Link} to={{
              pathname: '/dashboard',
              state: { userId: this.state.userId, authTok: this.state.authTok }
            }}>
              Dashboard
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

export default Friends;