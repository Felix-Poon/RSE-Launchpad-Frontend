import React from 'react';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Avatar from '@material-ui/core/Avatar'; // for avatar logout menu
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';


const useStyles = makeStyles({
  btn: {
    textTransform: 'none',
    color: '#8708BD',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    width: '110px',
    margin: '0 10px',
    backgroundColor: 'white'
  },
  clearBtn: {
    textTransform: 'none',
    color: 'white',
    fontFamily: 'Poppins, sans-serif',
    /* fontWeight: 500, */
    padding: '0 10px',
  },
  avatar: {
    color: 'rgba(139,7,189,1)',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: 'white'
  },
  menuItem: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '0.9rem',
    color: 'black'
  }
})

export function LoginMenu() {
  const classes=useStyles();
  return(
    <div>
      <Link to='/login'>
        <Button
          variant="contained"
          className={classes.btn}
          >
            Log In
        </Button>
      </Link>
      <Link to='/register'>
        <Button
          variant="contained"
          className={classes.btn}
          >
            Sign Up
          </Button>
      </Link>
    </div>
  );
}

export function LogoutMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return(
    <div>
      <div>
        <Link>
          <Button className={classes.clearBtn}>
            <PostAddIcon style={{margin:'0 5px'}}/>
            <h4>Add resource</h4>
          </Button>
        </Link>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Avatar className={classes.avatar}>J</Avatar>
          {open ? <ArrowDropUpIcon style={{color: 'white'}}/> : <ArrowDropDownIcon style={{color: 'white'}}/>}
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <a href="/user/resources">
                      <MenuItem onClick={handleClose} className={classes.menuItem}>Your resources</MenuItem>
                    </a>
                    <MenuItem onClick={handleClose} className={classes.menuItem}>Your ratings</MenuItem>
                    <MenuItem onClick={handleClose} className={classes.menuItem}>Account settings</MenuItem>
                    <hr style={{borderColor:'lightgrey', borderBottom: 0}}/>
                    <MenuItem onClick={handleClose} className={classes.menuItem}>Log Out</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}