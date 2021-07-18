import React from 'react';
import { SearchCard } from '../components/SearchCard';
import { UserContext  } from '../components/UserContext';
//import { makeStyles } from '@material-ui/core/styles';

export function UserResources() {
  //const classes = useStyles();
  const[resources, setResources] = React.useState([]);
  const context = React.useContext(UserContext);
  const[secondLoad, setSecondLoad] = React.useState(false);
  let [usernameToken, setUsernameToken] = context;
  if (usernameToken === '' && localStorage.getItem('userName')) {
    usernameToken = localStorage.getItem('userName')
  }
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    if(firstRender.current) {
      firstRender.current = false;
    }
    console.log("res: ", resources);
  },[resources])


  React.useEffect(() => {
    getResources();
  },[])

  async function getResources () {
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // call api to get resources based on author
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
    try {
      const response = await fetch(`https://ggvpaganoj.execute-api.ap-southeast-2.amazonaws.com/Development/resource?SearchKey=author&Input=${usernameToken}`, requestOptions)
      if (response['status'] === 200) {
        const res = await response.json();
        await setResources(res)
      } else {
        alert(`error: ${response['status']} Failed to fetch`);
      }
    } catch (error) {
      alert("error: ", error)
    }
  }

  /* function renderCard(title, link, text, author, rating) {
    return 
  } */
  
  return(
    <div >
      <div>
        <div style={{margin:'30px 40px'}}>
          <h2>Your Resources</h2>
        </div>
        {secondLoad && (
          <>
            {resources.map((val, idx) => {
              return <SearchCard 
                        key={idx}        
                        title={val['ID']}
                        link={val['Location']}
                    />
            })}
          </>
        )}

        <SearchCard 
          title='TITLE'
          link='linkkk'
          text='heyyy'
          author='author'
          rating='2'
        />
        <SearchCard 
          title='TITLE'
          link='linkkk'
          text='heyyy'
          author='author'
          rating='2'
        />
        <SearchCard 
          title='TITLE'
          link='linkkk'
          text='heyyy'
          author='author'
          rating='2'
        />
      </div>
    </div>
  );
}