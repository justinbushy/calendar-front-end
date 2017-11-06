import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import DayDialog from './DayDialog';

const buttonStyles = {
  padding: 0
};

const gridStyles = {
  flexGrow: 1,
  marginTop: 30,
};

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      selectedDay: 1
    }
  }

  handleDialogOpen = day => {
    this.setState({dialogOpen: true, selectedDay: day})
  };

  handleRequestClose = () => {
    this.setState({dialogOpen: false})
  }

  createWeek(start) {
    let days = [];
    for(let i = 0; i < 7; i++) {
      let comp = i + (7*start) - 2;
      if(comp > 0 && comp < 31) {
        days.push(
          <Grid key={i+(7*start)} item xs={1} sm>
            <Button style={buttonStyles} disableRipple={true} onClick={() => this.handleDialogOpen(comp)}>
              {comp}
            </Button>
          </Grid>)
      }
      else {
        days.push(
          <Grid key={i + (7 * start)} item xs={1} sm>
            <Button disabled disableRipple={true}/>
          </Grid>);
      }
    }
    return days;
  }

  createGrid() {
    let grids = [];
    for(let i =0; i < 5; i++) {
      let days = this.createWeek(i);
      grids.push(<Grid container justify="center" spacing={6}>{days}</Grid>);
    }
    return grids;
  }

  render() {
    const grids = this.createGrid();
    return(
      <div style={gridStyles}>
        {grids}
        <DayDialog
        open={this.state.dialogOpen}
        day={this.state.selectedDay}
        onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default Calendar;