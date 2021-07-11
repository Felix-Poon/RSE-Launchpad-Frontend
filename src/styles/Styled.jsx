import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

const useStyles = makeStyles({
  text: {
    fontSize: 'x-large',
    color: 'white',
    fontFamily: 'Work Sans',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '2px 2px 4px rgba(0,0,0,0.1)',
    width: '20rem',
    margin: '1rem'
  },
  button: {
    background: 'linear-gradient(45deg, #242135 30%, #403b5e 80%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: '10px',
    boxShadow: '1px 1px 3px rgba(0,0,0,0.5)',
    stroke: '1',
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0px 0px 15px 5px rgba(255,255,255,0.71)',
    }
  },
  orangeBtn: {
    background: 'linear-gradient(45deg, #db7962 30%, #ff9a83 80%)',
    border: 0,
    borderRadius: 3,
    color: '#242135',
    height: 48,
    padding: '0 30px',
    margin: '10px',
    boxShadow: '1px 1px 3px rgba(0,0,0,0.5)',
    stroke: '1',
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0px 0px 15px 5px rgba(255,255,255,0.3)',
    }
  }
})


export function StyledText({children}) {
  const classes = useStyles();
  return(
    <h1 className={classes.text}>{children}</h1>
  );
}

export function StyledInput(params) {
  const classes = useStyles();
  return(
    <TextField 
      className={classes.input}
      label={params.label}
      variant='filled'
      placeholder={params.placeholder}
      error={params.error}
      onBlur={params.onBlur}
      type={params.type}
      value={params.value}
      onChange={params.onChange}
      />
  );
}

export function PrimaryButton(params) {
  const classes = useStyles();
  return(
    <Button 
      onClick={params.onClick} 
      className={classes.button} 
      onBlur={params.onBlur}
      >
      {params.text}
    </Button>
  );
}

export function SecondaryButton(params) {
  const classes = useStyles();
  return(
    <Button 
      onClick={params.onClick} 
      className={classes.orangeBtn} 
      onBlur={params.onBlur}
      startIcon={params.startIcon}
      >
      {params.text}
    </Button>
  );
}