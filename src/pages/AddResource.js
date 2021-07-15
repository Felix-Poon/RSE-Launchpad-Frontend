import React from 'react';
import { Container, FormControl } from '@material-ui/core';
import { StyledText, StyledInput, PrimaryButton } from '../styles/Styled';
import { Redirect } from 'react-router-dom';
import Select from '@material-ui/core/Select';

/* Check if user is existing */
function checkExistingUser(email) {
  /* fetch from endpoint */
  const dummy = true;
  
  return dummy; // If existing
}


export function AddResource() {
  const [resourceName, setResourceName] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [resourceType, setResourceType] = React.useState("");

  // define the callAPI function that takes a first name and last name as parameters
  var handleSubmit = () =>{
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify ({
      "name":'Ready steady Cook 2!!',
      "categories":['Cooking', 'MasterChef'], 
      "description": 'Learng to cook', 
      "location": 'https://10play.com.au/masterchef',
      "resourceType": "website",
      "author": "User1"
    });
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://ggvpaganoj.execute-api.ap-southeast-2.amazonaws.com/Development/-upload-resource", requestOptions)
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));
  }

  return(
    <Container maxWidth='sm'>
      <h1>Add your own resource: </h1>
      <div>
        <Form>
        <StyledInput 
          placeholder="Title"
          value={resourceName}
          onChange={(e) => setResourceName(e.target.value)}
        />
        <StyledInput 
          placeholder="Resource Type"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <StyledInput 
          placeholder="Link to resource"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <StyledInput 
          placeholder="Description"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <StyledInput 
          label={emailError} 
          placeholder="Review"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <StyledInput 
          label={emailError} 
          placeholder="Add tags"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <StyledText>Rating:</StyledText>
        <StyledInput 
          label={emailError} 
          placeholder="sample@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
      
      <PrimaryButton 
        text="Upload Resource"
        onClick={handleSubmit}
      />
      </Form>
      </div>
    </Container>
  );
}