import React, { useState } from 'react';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { LoginMenu, LogoutMenu } from './Menus';
import Icon from '@mdi/react'
import { mdiRocketLaunch } from '@mdi/js';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },  
  title: {
    flexGrow: 1,
    fontWeight: 600,
    fontSize: '2rem',
    fontFamily: 'Poppins, sans-serif',/* 
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)', */
    letterSpacing: '0.5pt'
  },
  signin: {
    fontWeight: "bolder",
    fontFamily: "Arial, sans-serif",
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

    <AppBar position="static" color="transparent" className={classes.root}>
      <Toolbar>
        <Icon path={mdiRocketLaunch}
          title="User Profile"
          size={3}
          color="white"
          style={{margin:'0 10px'}}
        />
        <h1 className={classes.title}>
          launchpad.
        </h1>
        <div style={{flex:1}}/>
        {menu}
      </Toolbar>
    </AppBar>

  );
  
}