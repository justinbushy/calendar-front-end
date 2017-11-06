import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const paperStyles = {
  padding: 24,
  height: 100
};

class Calendar extends Component {
  constructor(props) {
    super(props);

  }

  createWeek(start) {
    let days = [];
    for(let i = 0; i < 7; i++) {
      let comp = i + (7*start) - 2;
      if(comp > 0 && comp < 31) {
        days.push(<Grid key={i+(7*start)} item xs><Paper style={paperStyles}>{comp}</Paper></Grid>)
      }
      else {
        days.push(<Grid key={i + (7 * start)} item xs><Paper style={paperStyles}></Paper></Grid>);
      }
    }
    return days;
  }

  createGrid() {
    let grids = [];
    for(let i =0; i < 5; i++) {
      let days = this.createWeek(i);
      grids.push(<Grid container justify="center" spacing={12}>{days}</Grid>);
    }
    return grids;
  }

  render() {
    const grids = this.createGrid();
    return(
      <div>
        <Grid container >
          <Grid item xs={12}>
            <Grid container justify="center" spacing={Number('6')}>
              {grids}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Calendar;