import React, { Component } from 'react';
import Button from 'material-ui/Button';
import DayDialog from "./DayDialog";
import axios from 'axios';
import IconButton from 'material-ui/IconButton'

const buttonStyles = {
  padding: 0,
  marginLeft: -10
};

class Day extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      day: props.day,
      dateStr: this.createDateString(props.day),
      baseUri: props.baseUri,
      userId: props.userId,
      authTok: props.authTok,
      authStr: this.createAuthString(props.authTok),
      events: [],
      tasks: [],
      buttonColor: 'default'
    };

    console.log(this.state);
  }

  componentDidMount() {
    this.dayChanged();
  }

  dayChanged = () => {
    let self = this;
    axios.get(this.state.baseUri + '/users/' + this.state.userId + '/events/date/' + this.state.dateStr,
      { headers: { Authorization: this.state.authStr }})
      .then(function(response) {
        if(response.status === 200) {
          if(response.data.data.length === 0) {
            self.setState({events: response.data.data});
          }
          else {
            self.setState({events: response.data.data, buttonColor: "accent"});
          }
        }
      })
      .catch(function(err) {
        console.log(err);
      })

  };

  taskChanged = () => {
    let self = this;
    axios.get(this.state.baseUri + '/users/' + this.state.userId + '/tasks/date/' + this.state.dateStr,
      { header: { Authorization: this.state.authStr }})
      .then(function(response) {
        if(response.status === 200) {
          if(response.data.data.length === 0) {
            self.setState({tasks: response.data.data})
          }
          else {
            self.setState({tasks: response.data.data, buttonColor: "accent"})
          }
        }
      })
      .catch(function(err) {
        console.log(err);
      })
  };

  createDateString(day) {
    if(day < 10)
      return '2017-11-0' + day + 'T00:00:00.000Z';
    else
      return '2017-11-' + day + 'T00:00:00.000Z';
  }

  createAuthString(authTok) {
    return 'JWT '.concat(authTok);
  }

  handleDialogOpen = () => {
    this.setState({dialogOpen: true});
  };

  handleRequestClose = () => {
    this.setState({dialogOpen: false});
  };

  render() {
    return (
      <div>
        <IconButton style={buttonStyles} color={this.state.buttonColor} disableRipple={true} onClick={() => this.handleDialogOpen()}>
          {this.state.day}
        </IconButton>
        <DayDialog
          open={this.state.dialogOpen}
          day={this.state.day}
          onRequestClose={this.handleRequestClose}
          events={this.state.events}
          userId={this.state.userId}
          authTok={this.state.authTok}
          baseUri={this.state.baseUri}
          dayChanged={this.dayChanged}
          tasks={this.state.tasks}
        />
      </div>
    );
  }

}

export default Day;
