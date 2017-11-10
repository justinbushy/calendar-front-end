import React, { Component } from 'react';
import Button from 'material-ui/Button';
import DayDialog from "./DayDialog";
import axios from 'axios';

const buttonStyles = {
  padding: 0
};

class Day extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      day: props.day,
      baseUri: props.baseUri,
      userId: props.userId,
      authTok: props.authTok,
      events: '',
      buttonColor: 'default'
    };
  }

  componentDidMount() {
    this.dayChanged();
  }

  dayChanged = () => {
    console.log(this.state)
    let authStr = 'JWT '.concat(this.state.authTok);
    let dateStr;
    if(this.state.day < 10) {
      dateStr = '2017-11-0' + this.state.day + 'T00:00:00.000Z';
    }
    else {
      dateStr = '2017-11-' + this.state.day + 'T00:00:00.000Z';
    }
    let self = this;
    axios.get(this.state.baseUri + '/users/' + this.state.userId + '/events/date/' + dateStr,
      { headers: { Authorization: authStr }})
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
        <Button style={buttonStyles} color={this.state.buttonColor} disableRipple={true} onClick={() => this.handleDialogOpen()}>
          {this.state.day}
        </Button>
        <DayDialog
          open={this.state.dialogOpen}
          day={this.state.day}
          onRequestClose={this.handleRequestClose}
          events={this.state.events}
          userId={this.state.userId}
          authTok={this.state.authTok}
          baseUri={this.state.baseUri}
          dayChanged={this.dayChanged}
        />
      </div>
    );
  }

}

export default Day;
