import React from 'react';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: "#E4816B",
    position:'absolute',
    left:0,
    bottom:0,
    right:0,
  },  
  flex: {
    flex: 1,
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
    <div style={{paddingBottom: '60px'}}>
      <AppBar position="static" className={classes.root} >
        <Toolbar>
          <div className={classes.flex}/>
          <p className={classes.teamName}>
            Accenture Team 1
          </p>
        </Toolbar>
      </AppBar>
    </div>
  );
  
}