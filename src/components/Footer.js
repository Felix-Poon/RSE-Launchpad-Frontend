import React from 'react';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: "#E4816B",

  },  
  teamName: {
    fontWeight: "bold",
    fontSize: "15px",
    fontFamily: "Arial, sans-serif",
    color: "#242135"
  },
}));

export function Footer() {
  const classes = useStyles();

  return(

    <AppBar position="static" className={classes.root} >
      <Toolbar>
        <p className={classes.teamName}>
          Accenture Team 1
        </p>
      </Toolbar>
    </AppBar>

  );
  
}