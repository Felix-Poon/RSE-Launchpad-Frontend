import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: 'white'
  }
}));


export function SearchCard() {
  const classes = useStyles();
  return(
    <div className={classes.card}>
      <h2>TITLE</h2>
      <a>Link</a>
      <p>paragraph</p>
    </div>
  );
}