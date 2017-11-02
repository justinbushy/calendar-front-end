import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';


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
    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            title="Dashboard"
            onLeftIconButtonTouchTap={this.toggleDrawer}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Drawer
            docked={false}
            open={this.state.drawerOpen}
            width={'10%'}
            onRequestChange={this.toggleDrawer}>
            <MenuItem>Tasks</MenuItem>
            <MenuItem>Friends</MenuItem>
          </Drawer>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <h3>Welcome to the application!</h3>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Dashboard;