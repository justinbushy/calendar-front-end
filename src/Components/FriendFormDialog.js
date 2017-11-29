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
      baseUri: props.baseUri
    }
  }

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
      </div>
    )
  }
}

export default FriendFormDialog;