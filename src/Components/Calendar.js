import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Day from './Day';

const gridStyles = {
  flexGrow: 1,
  marginTop: 30,
};

class Calendar extends Component {
  constructor(props) {
    super(props);

    console.log('Calendar props: ');
    console.log(props);

    this.state = {
      dialogOpen: false,
      selectedDay: 1,
      baseUri: props.baseUri,
      userId: props.userId,
      authTok: props.authTok
    }

    console.log('calendar state:');
    console.log(this.state);
  }

  handleDialogOpen = day => {
    this.setState({dialogOpen: true, selectedDay: day})
  };

  handleRequestClose = () => {
    this.setState({dialogOpen: false})
  };

  createWeek(start) {
    let days = [];
    for(let i = 0; i < 7; i++) {
      let comp = i + (7*start) - 2;
      if(comp > 0 && comp < 31) {
        days.push(
          <Grid key={i+(7*start)} item xs={1} sm>
            <Day day={comp} baseUri={this.state.baseUri} userId={this.state.userId} authTok={this.state.authTok}/>
          </Grid>)
      }
      else {
        days.push(
          <Grid key={i + (7 * start)} item xs={1} sm>
            <Button disabled disableRipple={true}>
            </Button>
          </Grid>);
      }
    }
    return days;
  }

  createGrid() {
    let grids = [];
    for(let i =0; i < 5; i++) {
      let days = this.createWeek(i);
      grids.push(<Grid key={i} container justify="space-around" alignItems="center">{days}</Grid>);
    }
    return grids;
  }

  render() {
    const grids = this.createGrid();
    return(
      <div style={gridStyles}>
        <Grid container justify="space-around" alignItems="center">
          <Grid item xs={1} sm>
            Su
          </Grid>
          <Grid item xs={1} sm>
            M
          </Grid>
          <Grid item xs={1} sm>
            Tu
          </Grid>
          <Grid item xs={1} sm>
            W
          </Grid>
          <Grid item xs={1} sm>
            Th
          </Grid>
          <Grid item xs={1} sm>
            F
          </Grid>
          <Grid item xs={1} sm>
            Sa
          </Grid>
        </Grid>
        {grids}
      </div>
    );
  }
}

export default Calendar;