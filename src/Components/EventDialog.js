import React, { Component } from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import moment from 'moment';

class EventDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      description: props.description,
      start_time: moment.utc(props.start_time).format("LT"),
      end_time: moment.utc(props.end_time).format("LT")
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props) {
      this.setState({title: nextProps.title,
        description: nextProps.description,
        start_time: moment.utc(nextProps.start_time).format("LT"),
        end_time: moment.utc(nextProps.end_time).format("LT")
      });
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
          <DialogTitle>
            {this.state.title}
          </DialogTitle>
          <DialogContent>
            <Typography type="caption">
              Description
            </Typography>
            <Typography type="subheading" align="center">
              {this.state.description}
            </Typography>
            <Typography type="caption">
              Start Time
            </Typography>
            <Typography type="headline" align="center">
              {this.state.start_time}
            </Typography>
            <Typography type="caption">
              End Time
            </Typography>
            <Typography type="headline" align="center">
              {this.state.end_time}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button color="primary">
              Share
            </Button>
            <Button color="accent">
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default EventDialog