import React from 'react';
import { SecondaryButton } from '../styles/Styled';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  btn: {
    textTransform: 'none',
    color: '#8708BD',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    width: '110px',
    margin: '0 10px',
    backgroundColor: 'white'
  }
})

export function LoginMenu() {
  const classes=useStyles();
  return(
    <div>
      <Link to='login'>
        <Button
          variant="contained"
          className={classes.btn}
          >
            Log In
        </Button>
      </Link>
      <Link to='register'>
        <Button
          variant="contained"
          className={classes.btn}
          >
            Sign Up
          </Button>
      </Link>
    </div>
  );
}

export function LogoutMenu() {
  return(
    <div>
      <SecondaryButton 
        text="Add New Resource"
        startIcon={<AddCircleIcon />}
      />
      <SecondaryButton 
        text="Log Out"
      />
    </div>
  );
}