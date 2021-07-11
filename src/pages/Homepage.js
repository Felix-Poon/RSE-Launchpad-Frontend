import React from 'react';
import { Container } from '@material-ui/core';
import { StyledInput } from '../styles/Styled';

export function Homepage() {

  return(
    <Container maxWidth='sm'>
      <StyledInput 
        label="What are you looking for?"
      />
    </Container>
  );
}