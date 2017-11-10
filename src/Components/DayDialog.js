import React, { Component } from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import ControlPoint from 'material-ui-icons/ControlPoint';
import EventFormDialog from './EventFormDialog';

class DayDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [0],
      events: props.events,
      addDialogOpen: false,
      userId: props.userId,
      authTok: props.authTok,
      baseUri: props.baseUri,
      day: props.day,
      dayChanged: props.dayChanged
    }

    console.log('Daydailog state');
    console.log(this.state);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.events !== this.props.events) {
      this.setState({events: nextProps.events})
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

  handleAddEvent = () => {
    this.setState({addDialogOpen: true});
  };

  handleAddRequestClose = () => {
    this.setState({addDialogOpen: false});
    this.props.dayChanged();
  };

  createEventList() {
    let len = this.state.events.length;
    let eventsList = [];
    for(let i = 0; i < len; i++) {
      let title = this.state.events[i].title;
      eventsList.push(<ListItem key={i} button>{title}</ListItem>);
    }
    return eventsList;
  }

  render() {
    const { open, day } = this.props;

    const eList = this.createEventList();
    return (
      <div>
        <Dialog onRequestClose={this.handleRequestClose} open={open}>
          <DialogTitle>Nov. {day}</DialogTitle>
          <List>
            {eList}
            {/*<ListItem button>
              Physical Therapy - 3:00 pm
            </ListItem>
            <ListItem button>
              Nerve Blocks - 4:30 pm
            </ListItem>*/}

            <ListItem button onClick={this.handleAddEvent}>
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
        <EventFormDialog
          open={this.state.addDialogOpen}
          onRequestClose={this.handleAddRequestClose}
          userId={this.state.userId}
          authTok={this.state.authTok}
          baseUri={this.state.baseUri}
          day={this.state.day}
        />
      </div>
    )
  }
}

export default DayDialog