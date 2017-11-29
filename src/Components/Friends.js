import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import ControlPoint from 'material-ui-icons/ControlPoint';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Divider from 'material-ui/Divider';
import FriendFormDialog from './FriendFormDialog';

const styles = {
  width: 150
};

const groupStyles = {
  marginTop: 20,
  marginLeft: 20
};

class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.location.state.userId,
      authTok: props.location.state.authTok,
      drawerOpen: false,
      friendDialogOpen: false
    };

  }

  toggleDrawer = () => {
    this.setState({drawerOpen: !this.state.drawerOpen});
  };

  handleDialogOpen = () => {
    this.setState({friendDialogOpen: true});
  };

  handleRequestClose = () => {
    this.setState({friendDialogOpen: false});
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
        <div>
          <Typography type="headline" align="left" style={groupStyles}>
            Friends
          </Typography>
          <List>
            <ListItem button>
              <ListItemIcon>
                <AccountCircle/>
              </ListItemIcon>
              <ListItemText primary="Chelsey Bush" align="left"/>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AccountCircle/>
              </ListItemIcon>
              <ListItemText primary="Bart Bush" align="left"/>
            </ListItem>
            <Divider/>
            <ListItem button onClick={this.handleDialogOpen}>
              <ListItemIcon>
                <ControlPoint/>
              </ListItemIcon>
              <ListItemText primary="Add Friend" align="left"/>
            </ListItem>
          </List>
        </div>
        <FriendFormDialog
          open={this.state.friendDialogOpen}
          userId={this.state.userId}
          authTok={this.state.authTok}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default Friends;