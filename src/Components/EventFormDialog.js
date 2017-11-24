import React, { Component } from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import axios from 'axios';

class EventFormDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      start_time: '12:00',
      end_time: '13:00',
      userId: props.userId,
      authTok: props.authTok,
      day: props.day,
      baseUri: props.baseUri,
      openSuccessDialog: false,
    }

  }

  handleRequestClose = () => {
    this.props.onRequestClose();
  };

  handleCloseSuccessDialog = () => {
    this.setState({openSuccessDialog: false, });
    this.props.onRequestClose();
  };

  handleAddEvent = () => {
    let fixedDay;
    if (this.state.day < 10) {
      fixedDay = '0' + this.state.day
    }
    else {
      fixedDay = this.state.day
    }
    let sTime = '2017-11-' + fixedDay + 'T' + this.state.start_time + 'Z';
    let eTime = '2017-11-' + fixedDay + 'T' + this.state.end_time + 'Z';
    let payload = {
      "user_id": this.state.userId,
      "title": this.state.title,
      "description": this.state.description,
      "start_time": sTime,
      "end_time": eTime,
      "notes": ''
    };

    console.log('eventform payload');
    console.log(payload);

    let authStr = 'JWT ' + this.state.authTok;
    let self = this;
    axios.post(this.props.baseUri + '/users/'+ this.state.userId + '/events', payload, { headers: { Authorization: authStr }})
      .then(function(response) {
        if(response.status === 200) {
          self.setState({openSuccessDialog: true});
        }
      })
      .catch(function(err) {
        console.log(err);
      })
  };

  render() {
    const { open } = this.props;
    return (
      <div>
        <Dialog onRequestClose={this.handleRequestClose} open={open}>
          <DialogTitle>Add Event</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              label="Title"
              onChange = {(event) => this.setState({title: event.target.value})}
            />
            <br/>
            <TextField
              label="Description"
              onChange = {(event) => this.setState({description: event.target.value})}
            />
            <br/>
            <TextField
              label="Start Time"
              type="time"
              defaultValue="12:00"
              onChange = {(event) => this.setState({start_time: event.target.value})}
            />
            <br/>
            <TextField
              label="End Time"
              type="time"
              defaultValue="13:00"
              onChange = {(event) => this.setState({end_time: event.target.value})}
            />
            <br/>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleAddEvent}>
              Accept
            </Button>
            <Button color="accent" onClick={this.handleRequestClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.openSuccessDialog}>
          <DialogTitle>
            Event Created
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleCloseSuccessDialog} color="primary" autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )

  }
}

export default EventFormDialog;
