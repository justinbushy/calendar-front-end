import React, { Component } from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import axios from 'axios';

class FriendFormDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friend_user_name: '',
      userId: props.userId,
      authTok: props.authTok,
      baseUri: props.baseUri,
      openSuccessDialog: false
    }
  }

  handleAddEvent = () => {
    let payload = {
      "user_name": this.state.friend_user_name
    };

    let authStr = 'JWT ' + this.state.authTok;
    let self = this;
    axios.post(this.state.baseUri + '/users/'+ this.state.userId + '/friends', payload,
      { headers: { Authorization: authStr } })
      .then(function(response) {
        if(response.status === 200) {
          self.setState({openSuccessDialog: true});
        }
      })
      .catch(function(err) {
        console.log(err);
      })
  };

  handleCloseSuccessDialog = () => {
    this.setState({openSuccessDialog: false});
    this.props.onRequestClose();
  };

  handleRequestClose = () => {
    this.props.onRequestClose();
  };

  render() {
    const { open } = this.props;
    return (
      <div>
        <Dialog onRequestClose={this.handleRequestClose} open={open}>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              label="User Name"
              onChange = {(event) => this.setState({friend_user_name: event.target.value})}
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
            Friend Request Sent
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

export default FriendFormDialog;