import React from 'react';
import { Container, Box } from '@material-ui/core';
import { StyledText, StyledInput, PrimaryButton } from '../styles/Styled';
//import TextField from '@material-ui/core/TextField';
import { validateEmail } from '../helpers/validation';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Icon from '@mdi/react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

import Grid from '@material-ui/core/Grid';
import { mdiRocketOutline } from '@mdi/js';


const useStyles = makeStyles((theme) => ({
  placement: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '75vh',
  },
  container: {
    /* textAlign: 'center', */
    width: '50%',
    padding: '0 90px',
  },
  heading: {
    fontSize: '3rem'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: 'none',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,

  },
}));

/* Check if user is existing */
function checkExistingUser(email) {
  /* fetch from endpoint */
  const dummy = true;
  
  return dummy; // If existing
}


export function Login() {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [validEmail, setValidEmail] = React.useState(false);
  const [existingUser, setExistingUser] = React.useState(null);

  let emailError = error ? "Invalid email" : "Email";
  let passwordError = error ? "Incorrect password" : "Password";

  const handleEmail = (e) => {
    e.preventDefault();
    const emailCheck = validateEmail(email);
    if (!emailCheck) { 
      setError(true)
    } else {
      setError(false);
      setValidEmail(true);
      /* EMAIL IS VALID CHECK FOR EXISTING USER */
      if (checkExistingUser(email)) {
        setExistingUser(true);
      } else {
        setExistingUser(false);
      }
    }
  }

  const handlePassword = (e) => {
    e.preventDefault();
    /* Check login */

  }

  const toRegister = () => {
    console.log('to rego');
    return (
      <Redirect to={{
        pathname: '/register',
        state: { emailInput: email }
      }} />
    );
  }

  const emailDialogue = (
    <div>
      <div>
        <StyledText>What is your email?</StyledText>
        <StyledInput 
          label={emailError} 
          placeholder="sample@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
      </div>
      <PrimaryButton 
        text="Next"
        onClick={handleEmail}
      />
    </div>
  );

  const passwordDialogue = (
    <div>
      <div>
      <StyledText>Welcome back!</StyledText>
      <StyledInput 
        label={passwordError} 
        type="password"
        placeholder="Password"
        value={password}
        error={error}
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <PrimaryButton 
        text="Sign In"
        onClick={handlePassword}
      />
    </div>
  );

  return(
    <div className={classes.placement}>
      <div className={classes.container}>
        <h1 className={classes.heading}>
          Welcome back!
        </h1>
        <h3>Be a part of the world's most inspired community of self-learners.</h3>
      </div>
      <div className={classes.container}>
        <Container maxWidth='sm'>
          <Box bgcolor='white' color="black" className='box-generic'>
          <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item >
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                  </Grid>
                </Grid>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Launch
                    <Icon path={mdiRocketOutline}
                      size={1}
                      color="white"
                      rotate='90'
                      style={{margin: '0 0 0 10px'}}
                    />
                  </Button>
                </div>
              </form>
            </div>
          </Box>
        </Container>
      </div>

    </div>
    /* <Container maxWidth='sm'>
      <Box color='black' bgcolor='#E4816B' className='box-generic'>
          {(!existingUser && validEmail) ? toRegister : (existingUser && validEmail ? passwordDialogue : emailDialogue)}
      </Box>
    </Container> */
  );
}