import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return(
     <div>
       <h2>Welcome to the Calendar App</h2>
         <div>
           <Button component={Link} raised color="primary" to="/signin">
             Login
           </Button>
           <br/>
           <br/>
           {/*
           <RaisedButton
             label="Register"
             primary={true}
             containerElement={<Link to="/register"/>}
           />
           */}
           <Button component={Link} raised color="primary" to="/register">
             Register
           </Button>
         </div>
     </div>
    );
  }
}

export default HomePage;