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

    console.log('day props:');
    console.log(props);
    this.state = {
      dialogOpen: false,
      day: props.day,
      baseUri: props.baseUri,
      userId: props.userId,
      authTok: props.authTok
    }

    console.log('day state');
    console.log(this.state);
  }

  componentDidMount() {
    let authStr = 'JWT '.concat(this.state.authTok);
    axios.get(this.state.baseUri + '/users/' + this.state.userId + '/events',
      { headers: { Authorization: authStr }})
      .then(function(response) {
        console.log(response);
        if(response.status === 200) {
          console.log('Success');
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
        <Button style={buttonStyles} disableRipple={true} onClick={() => this.handleDialogOpen()}>
          {this.state.day}
        </Button>
        <DayDialog
          open={this.state.dialogOpen}
          day={this.state.day}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }

}

export default Day;
