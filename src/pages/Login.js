import React, { useState } from 'react';
import { Container, Box } from '@material-ui/core';
import { StyledText, StyledInput, PrimaryButton } from '../styles/Styled';
//import TextField from '@material-ui/core/TextField';
import { validateEmail } from '../helpers/validation';




export function Login() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [validEmail, setValidEmail] = React.useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
    console.log(email)
    console.log(validateEmail(email))

    console.log(password)

    const emailCheck = validateEmail(email);
    if (!emailCheck) { 
      setError(true)
    } else {
      setError(false)
    }
    setValidEmail(emailCheck);
  }

  const emailDialogue = (
    <div>
      <div>
        <StyledText>What is your email?</StyledText>
        <StyledInput 
          label="Email" 
          placeholder="sample@email.com"
          onBlur={(e) => setEmail(e.target.value)}
          error={error}
        />
      </div>
      <PrimaryButton 
        text="Next"
        onClick={handleSubmit}
      />
    </div>
  );

  const passwordDialogue = (
    <div>
      <div>
      <StyledText>Welcome back!</StyledText>
      <StyledInput 
        label="Password" 
        type="password"
        placeholder="password"
        error={error}
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <PrimaryButton 
        text="Sign In"
        onClick={handleSubmit}
      />
    </div>
    
  );

  return(
    <Container maxWidth='sm'>
      <Box color='black' bgcolor='#E4816B' className='box-generic'>
          {validEmail ? passwordDialogue : emailDialogue}
        
      </Box>
    </Container>
  );
}