import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { MenuItem } from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button';
import List, { ListItem } from 'material-ui/List';

import Calendar from './Calendar';

const listStyle = {
  width: 150,
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen : false
    }

   this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {/*<AppBar
            title="Dashboard"
            onLeftIconButtonTouchTap={this.toggleDrawer}
          />*/}
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu" onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={this.state.drawerOpen}
          onRequestClose={this.toggleDrawer}
        >
          <div style={listStyle}>
          <List>
            <ListItem button>
              Friends
            </ListItem>
            <ListItem button>
              Tasks
            </ListItem>
          </List>
          </div>
        </Drawer>
          <h3>Welcome to the application!</h3>
        <Calendar/>
      </div>
    );
  }
}

export default Dashboard;