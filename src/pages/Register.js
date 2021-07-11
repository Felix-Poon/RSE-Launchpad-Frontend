import React from 'react';
import { Container, Box } from '@material-ui/core';
import { StyledText, StyledInput, PrimaryButton } from '../styles/Styled';
import { ifEmpty, passwordMatch } from '../helpers/validation';

export function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [usernameErr, setUsernameErr] = React.useState("");
  const [passwordErr, setPasswordErr] = React.useState("");

  function handleSubmit() {
    setUsernameErr("");
    setPasswordErr("")
    if (ifEmpty(username)) {
      setUsernameErr("Invalid username");
    }
    if (ifEmpty(password) || ifEmpty(confirmPass)) {
      setPasswordErr("Enter password")
    }
    if (!passwordMatch(password, confirmPass)) {
      setPasswordErr("Passwords must match");
    }
    /* USERNAME TAKEN ERR */
  }


  return(
    <Container maxWidth='sm'>
      <Box color='black' bgcolor='#E4816B' className='box-generic'>
          <div>
            <StyledText>Create New Account</StyledText>
            <StyledInput
              label={usernameErr || "Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameErr}
            />
            <StyledInput
              label={passwordErr || "Password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordErr}
            />
            <StyledInput
              label={passwordErr || "Confirm Password"}
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              error={passwordErr}
            />
          </div>
          <PrimaryButton 
            text="Next"
            onClick={handleSubmit}
          />
      </Box>
    </Container>
  );
}