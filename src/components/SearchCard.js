import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { CardActionArea, Box } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: 'white'
  },
  box: {
    textAlign: 'left',
    justifyContent: 'left',
    borderRadius: '5px',
    boxShadow: '0 3px 5px 2px rgba(0,0,0,.3)',
    padding: '20px',
    margin: '30px 40px',
    width: '55vw',
    '&:hover': {
      background: "#c1bfec",       
      }
  },
  cardHeader: {
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'row',
  },
  cardTitle: {
    margin: 0,
  },
  cardText: {
    margin: 0,
  },
  cardAuthor: {
    margin: '25px 0 0 0',
    fontSize: '0.75rem'
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
  },
  rating: {
    margin: '20px 0 0 0',
    float: 'right'
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
}));


export function SearchCard(props) {
  const classes = useStyles();
  const href = `/view_resource/${props.title}`;
  const rating = `${Math.round(props.rating,2)}/10`
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // console.log(props.categories)

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleDelete = () => {
    props.deleteRes(props.title)
  }


  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  return(
    <div>
      <a href={props.owner ? "#" : `/view_resource/${props.title}`}>
        <Box bgcolor='white' color="black" className={classes.box} key={props.key}>
          <div>
            <div className={classes.cardHeader}>
              <h2 className={classes.cardTitle}>{props.title}</h2>
              {/* <a href={href}>
                <u>{props.link}</u>
              </a> */}
              {props.owner && (
                <>
                <div style={{flex:1}}/>
                <div>
                  <IconButton
                    ref={anchorRef} 
                    aria-label="more" 
                    size="medium"
                    aria-haspopup="true"
                    aria-controls={open ? 'menu-list-grow': undefined}
                    onClick={handleToggle}
                  >
                    <MoreVertIcon style={{color: '#1a181a', fontSize: '18pt'}}/>
                  </IconButton>
                  <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                              <Link to={`/${props.title}/edit_resource`}>
                                <MenuItem onClick={handleClose} className={classes.menuItem}>Edit</MenuItem>
                              </Link>
                              <MenuItem onClick={handleDelete} className={classes.menuItem}>Delete</MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
                </>
              )}
            </div>
            <p className={classes.cardText}>{props.text}</p>
          </div>
          <h3>Tags</h3>
          <div className={classes.tagContainer}>
            {props.categories.map((val) => {
              return (<p style={{margin:'0px 5px'}}>{val}</p>)
            })}
          </div>
          <div className={classes.footer}>
            <p className={classes.cardAuthor}>Submitted by {props.author}</p>
            <div style={{flex:1}}/>
            <h4 className={classes.rating}>
              {rating}
            </h4>
          </div>
          <div className={classes.footer}> 
            <div style={{flex:1}}/>
          </div>
        </Box>
      </a>    
    </div>
    
  );
}