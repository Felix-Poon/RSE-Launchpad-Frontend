import React, { useState } from 'react';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { LoginMenu, LogoutMenu } from './Menus';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: "#242135" 
  },  
  title: {
    flexGrow: 1,
    fontWeight: "bolder",
    color: "#E4816B",
    fontSize: '2rem',
    fontFamily: 'Work Sans',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
  signin: {
    fontWeight: "bolder",
    fontFamily: "Arial, sans-serif",
    color: "#E4816B",
  },
}));

const loginMenu = (<LoginMenu/>);
const logoutMenu = (<LogoutMenu/>);


// Put header here
export function Header() {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = React.useState(false);

  /* Check if user logged in */
  let menu = loggedIn ? logoutMenu : loginMenu;

  return(

    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <h1 className={classes.title}>launchpad.</h1>
        <div style={{flex:1}}/>
        {menu}
        {/* <Button className={classes.signin}>SIGN IN</Button> */}
      </Toolbar>
    </AppBar>

  );
  
}