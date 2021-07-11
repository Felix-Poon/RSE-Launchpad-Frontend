import React, { useState } from 'react';
import { Container, Box } from '@material-ui/core';
import { StyledText, StyledInput, PrimaryButton } from '../styles/Styled';
//import TextField from '@material-ui/core/TextField';
import { validateEmail } from '../helpers/validation';
import { Redirect } from 'react-router-dom';

/* Check if user is existing */
function checkExistingUser(email) {
  /* fetch from endpoint */
  const dummy = true;
  
  return dummy; // If existing
}


export function Login() {
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
    <Container maxWidth='sm'>
      <Box color='black' bgcolor='#E4816B' className='box-generic'>
          {(!existingUser && validEmail) ? toRegister : (existingUser && validEmail ? passwordDialogue : emailDialogue)}
      </Box>
    </Container>
  );
}