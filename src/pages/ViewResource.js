import React, { useEffect, useState }from 'react';
import { Container, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { StyledText, StyledInput, PrimaryButton } from '../styles/Styled';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { InputLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import MenuItem from "@material-ui/core/MenuItem";
import { Typography, Slider, Tooltip } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Icon from '@mdi/react'
import { mdiRocketOutline } from '@mdi/js';

const useStyles = makeStyles((theme) => ({
  placement: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '50%',
    padding: '0 90px',
  },
  heading: {
    fontSize: '3rem'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(1),
    minWidth: 120
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: 'none',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    margin: '10px 0 0 0',
    fontSize: '1.25rem',
    border: 1,
  },
  resourceDisplay: {
      textAlign: 'left',
      paddingLeft: 10
  },
  ratingTitle: {
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 10,
  }
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value} min={0} max={10}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const marks = [
  {
    value: 0,
  },
  {
    value: 5,
  },
  {
    value: 10,
  }
];

const filter = createFilterOptions();

export function ViewResource(props) {
  const classes = useStyles();

  const [rating, setRating] = useState({
                                        "understanding": "3", 
                                        "difficulty": "3", 
                                        "reliability": "3" })

  // define the callAPI function that takes a first name and last name as parameters
  async function handleSubmit (event) {
    event.preventDefault();

    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify ({
        rating: rating,
    });
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    const response = await fetch("https://ggvpaganoj.execute-api.ap-southeast-2.amazonaws.com/Development/resource", requestOptions)
    console.log(response);
  }

  return (
    <Container maxWidth='sm'>
      <Box bgcolor='white' color="black" className='box-generic'>
        <div className={classes.paper}>
          <h1 style={{margin:0}}>TITLE</h1>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <h4 className={classes.resourceDisplay}>URL LINK </h4>
            <h4 className={classes.resourceDisplay}>Type of Resource </h4>
            <h4 className={classes.resourceDisplay}>Original Submitter's Description </h4>
            
            <h2 className={classes.ratingTitle}>Rating:</h2>
            <Typography gutterBottom>Ease of Understanding</Typography>
            <Slider
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={3}
              min = {0}
              max={5}
              disabled
              onChange = {(e, val) => setRating({...rating, "understanding": `${val}`})}
            />
            <Typography gutterBottom>Level of difficulty</Typography>
            <Slider
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={3}
              min = {0}
              max={5}
              disabled
              onChange = {(e, val) => setRating({...rating, "difficulty": `${val}`})}
            />
            <Typography gutterBottom>Reliability</Typography>
            <Slider
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={3}
              min = {0}
              max={5}
              disabled
              onChange = {(e, val) => setRating({...rating, "reliability": `${val}`})}
            />
          </form>
        </div>
      </Box>

      <div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          fullWidth
          style={{
            margin: '25px 0 0 0', 
            fontSize: '1.25rem', 
            backgroundColor: '#242135',
            border: 1,
            borderColor: 'white'
          }}
        >
          Did you use this resource? Give your own rating!
        </Button>
      </div>
    </Container>
  );
}