import React, { useState } from 'react';
import { Container, Box } from '@material-ui/core';
import { StyledText, StyledInput, PrimaryButton } from '../styles/Styled';
import TextField from '@material-ui/core/TextField';


export function Login() {
  const [email, setEmail] = React.useState("");

  return(
    <Container maxWidth='sm'>
      <Box color='black' bgcolor='#E4816B' className='box-generic'>
        <div>
          <StyledText>What is your email?</StyledText>
          {/* <TextField
            label="Email"
            variant="filled"
            /> */}
          <StyledInput 
            label="Email" 
            placeholder="sample@email.com"
            onBlur={(e) => setEmail(e.target.value)}
          ></StyledInput>
        </div>
        <PrimaryButton text="Next"/>
      </Box>
    </Container>
  );
}