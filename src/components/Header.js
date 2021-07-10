import React from 'react';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: "#242135" 
  },  
  title: {
    flexGrow: 1,
    fontWeight: "bolder",
    fontSize: "38px",
    fontFamily: "Arial, sans-serif",
    color: "#E4816B"
  },
  signin: {
    fontWeight: "bolder",
    fontFamily: "Arial, sans-serif",
    color: "#E4816B",
  },
}));



// Put header here
export function Header() {
  const classes = useStyles();

  return(

    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <headerLogo className={classes.title}>launchpad.</headerLogo>
        <Button className={classes.signin}>SIGN IN</Button>
      </Toolbar>
    </AppBar>

  );
  
}