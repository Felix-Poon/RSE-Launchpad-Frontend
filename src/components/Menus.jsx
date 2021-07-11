import React from 'react';
import { SecondaryButton } from '../styles/Styled';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export function LoginMenu() {

  return(
    <div>
      <SecondaryButton 
        text="Sign In"
      />
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