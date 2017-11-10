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
import Grid from 'material-ui/Grid';

import Calendar from './Calendar';

const listStyle = {
  width: 150,
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    console.log(props.location.state.userId);
    this.state = {
      drawerOpen : false,
      baseUri: this.props.baseUri,
      userId: props.location.state.userId,
      authTok: props.location.state.authTok
    };

    console.log(this.state);
   this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  render() {

    return (
      <div>
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
        <Grid container>
          <Grid item xs={12}>
            <Grid
              container
              alignItems="center"
              justify="flex-end"
            >
              <Grid item>
                <Button raised dense>
                  Month
                </Button>
                <Button raised dense>
                  Week
                </Button>
                <Button raised dense>
                  Day
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Calendar baseUri={this.state.baseUri} userId={this.state.userId} authTok={this.state.authTok}/>
      </div>
    );
  }
}

export default Dashboard;