import React, { Component } from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import ControlPoint from 'material-ui-icons/ControlPoint';

class DayDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [0]
    }
  }

  handleCheckedToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if(currentIndex === -1) {
      newChecked.push(value);
    }
    else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({checked: newChecked})
  }

  handleRequestClose = () => {
    this.props.onRequestClose();
  };

  render() {
    const { onRequestClose, day, ...other } = this.props;

    return (
      <Dialog onRequestClose={this.handleRequestClose} {...other}>
        <DialogTitle>Nov. {day}</DialogTitle>
        <List>
          <ListItem button>
            Physical Therapy - 3:00 pm
          </ListItem>
          <ListItem button>
            Nerve Blocks - 4:30 pm
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ControlPoint/>
            </ListItemIcon>
            <ListItemText primary="Add Appt"/>
          </ListItem>
          <Divider/>
          <ListItem key={0} button disableRipple onClick={this.handleCheckedToggle(0)}>
            <Checkbox
              checked={this.state.checked.indexOf(0) !== -1}
              tabIndex={-1}
              disableRipple={true}
            />
            <ListItemText primary="10 min walk"/>
          </ListItem>
          <ListItem key={1} button disableRipple onClick={this.handleCheckedToggle(1)}>
            <Checkbox
              checked={this.state.checked.indexOf(1) !== -1}
              tabIndex={-1}
              disableRipple={true}
            />
            <ListItemText primary="Eat Breakfast"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ControlPoint/>
            </ListItemIcon>
            <ListItemText primary="Add Task"/>
          </ListItem>
        </List>
      </Dialog>
    )
  }
}

export default DayDialog