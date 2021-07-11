import React from 'react';
import { SecondaryButton } from '../styles/Styled';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from 'react-router-dom';

export function LoginMenu() {
  return(
    <div>
      <Link to='login'>
        <SecondaryButton 
          text="Sign In"
        />
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