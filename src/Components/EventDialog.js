import React, { Component } from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

class EventDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      description: props.description,
      start_time: props.start_time,
      end_time: props.end_time
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
          <DialogContent>
            {this.state.title}
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default EventDialog