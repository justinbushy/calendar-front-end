import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
     <div>
       <h2>Welcome to the Calendar App</h2>
       <h3>Login</h3>
       <MuiThemeProvider>
         <div>
           <RaisedButton
             label="Login"
             primary={true}
             containerElement={<Link to="/signin"/>}
           />
           <br/>
           <br/>
           <RaisedButton
             label="Register"
             primary={true}
             containerElement={<Link to="/register"/>}
           />
         </div>
       </MuiThemeProvider>
     </div>
    );
  }
}

export default HomePage;