import React from 'react';
import { SecondaryButton } from '../styles/Styled';

export function LoginMenu() {

  return(
    <div>
      <SecondaryButton 
        text="Log In"
      />
    </div>
  );
}

export function LogoutMenu() {
  return(
    <div>
      <SecondaryButton 
        text="Add New Resource"
      />
      <SecondaryButton 
        text="Log Out"
      />
    </div>
  );
}