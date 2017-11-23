import React, { Component } from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import ControlPoint from 'material-ui-icons/ControlPoint';
import EventFormDialog from './EventFormDialog';
import TaskFormDialog from './TaskFormDialog';
import EventDialog from './EventDialog';

class DayDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [],
      events: props.events,
      tasks: props.tasks,
      addDialogOpen: false,
      taskDialogOpen: false,
      eventDialogOpen: false,
      userId: props.userId,
      authTok: props.authTok,
      baseUri: props.baseUri,
      day: props.day,
      dayChanged: props.dayChanged,
      eventsList: [],
      tasksList: [],
      selectedEvent: 0
    };

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props) {
      const eList = this.createEventList();
      const tList = this.createTaskList();
      console.log('elist');
      console.log(eList);
      this.setState({events: nextProps.events,
        tasks: nextProps.tasks,
        eventsList: eList,
        tasksList: tList
      })
    }
  }

  handleCheckedToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    console.log('checked toggle');
    console.log(value);
    if(currentIndex === -1) {
      newChecked.push(value);
    }
    else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({checked: newChecked});
  };

  handleRequestClose = () => {
    this.props.onRequestClose();
  };

  handleAddEvent = () => {
    this.setState({addDialogOpen: true});
  };

  handleAddTask = () => {
    this.setState({taskDialogOpen: true});
  };

  handleAddRequestClose = () => {
    this.setState({addDialogOpen: false});
    this.props.dayChanged();
  };

  handleTaskRequestClose = () => {
    this.setState({taskDialogOpen: false});
    this.props.dayChanged();
  };

  handleEventRequestClose = () => {
    this.setState({eventDialogOpen: false});
  };

  handleOpenEventDialog = value => () => {
    this.setState({eventDialogOpen: true, selectedEvent: value})
  };

  createEventList() {
    let len = this.state.events.length;
    let eventsList = [];
    for(let i = 0; i < len; i++) {
      let title = this.state.events[i].title;
      eventsList.push(<ListItem key={i} button onClick={this.handleOpenEventDialog(i)}>{title}</ListItem>);
    }
    return eventsList;
  }

  createTaskList() {
    let len = this.state.tasks.length;
    let tasksList = [];
    for(let i = 0; i < len; i++) {
      let title = this.state.tasks[i].title;
      tasksList.push(<ListItem key={i} button disableRipple onClick={this.handleCheckedToggle(i)}>
        <Checkbox checked={this.state.checked.indexOf(i) !== -1} tabIndex={-1} disableRipple={true}/>
        <ListItemText primary={title}/>
      </ListItem>);
    }
    return tasksList;
  }

  render() {
    const { open, day } = this.props;

    const tList = this.createTaskList();

    let eventDial = null;
    if(this.state.events.length > 0) {
      eventDial = <EventDialog
        title={this.state.events[this.state.selectedEvent].title}
        description={this.state.events[this.state.selectedEvent].description}
        start_time={this.state.events[this.state.selectedEvent].start_time}
        end_time={this.state.events[this.state.selectedEvent].end_time}
        onRequestClose={this.handleEventRequestClose}
        open={this.state.eventDialogOpen}
        />;
    }

    if(this.state)
    return (
      <div>
        <Dialog onRequestClose={this.handleRequestClose} open={open}>
          <DialogTitle>Nov. {day}</DialogTitle>
          <List>
            {/*this.state.events.length*/}
            {this.state.eventsList}
            <ListItem button onClick={this.handleAddEvent}>
              <ListItemIcon>
                <ControlPoint/>
              </ListItemIcon>
              <ListItemText primary="Add Event"/>
            </ListItem>
            <Divider/>
              {tList}
            <ListItem button>
              <ListItemIcon>
                <ControlPoint/>
              </ListItemIcon>
              <ListItemText primary="Add Task" onClick={this.handleAddTask}/>
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
        <TaskFormDialog
          open={this.state.taskDialogOpen}
          onRequestClose={this.handleTaskRequestClose}
          userId={this.state.userId}
          authTok={this.state.authTok}
          baseUri={this.state.baseUri}
          day={this.state.day}
        />
        {eventDial}
      </div>
    )
  }
}

export default DayDialog