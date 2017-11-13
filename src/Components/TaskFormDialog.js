import React, { Component } from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import axios from 'axios';

class TaskFormDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      task_date: '',
      completed: false,
      userId: props.userId,
      authTok: props.authTok,
      day: props.day,
      baseUri: props.baseUri,
      openSuccessDialog: false
    };

  }

  handleRequestClose = () => {
    this.props.onRequestClose();
  };

  handleAddTask = () => {
    let date;
    if(this.state.day < 10) {
      date = '2017-11-0' + this.state.day + 'T00:00:00Z';
    }
    else {
      date = '2017-11-' + this.state.day + 'T00:00:00Z';
    }

    let payload = {
      "user_id": this.state.userId,
      "title": this.state.title,
      "description": this.state.description,
      "task_date": date,
      "completed": false
    }

    let authStr = 'JWT ' + this.state.authTok;
    let self = this;
    axios.post(this.props.baseUri + '/users/' + this.state.userId + '/tasks', payload,
      { headers: { Authorization: authStr }})
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
          <DialogTitle>Add Task</DialogTitle>
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
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleAddTask}>
              Accept
            </Button>
            <Button color="accent" onClick={this.handleRequestClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default TaskFormDialog;