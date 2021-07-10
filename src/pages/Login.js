import React from 'react';
import { Container, Box } from '@material-ui/core';
import { StyledText, StyledInput, StyledButton } from '../styles/Styled';
import TextField from '@material-ui/core/TextField';


export function Login() {

  return(
    <Container maxWidth='sm'>
      <Box color='black' bgcolor='#E4816B' className='box-generic'>
        <div>
          <StyledText>What is your email?</StyledText>
          {/* <TextField
            label="Email"
            variant="filled"
            /> */}
          <StyledInput label="Email" placeholder="sample@email.com"></StyledInput>
        </div>
        <StyledButton text="Next"/>
      </Box>
    </Container>
  );
}