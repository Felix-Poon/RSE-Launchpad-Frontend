import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Homepage } from './pages/Homepage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AddResource } from './pages/AddResource';
import { RateResource } from './pages/RateResource';
import { EditResource } from './pages/EditResource';
import { ViewResource } from './pages/ViewResource';
import { ThemeProvider } from '@material-ui/core/styles';
//import Palettefrom './styles/Theme';
/* const theme = createMuiTheme({

}) */
import { Search } from './pages/Search';
import { UserResources } from './pages/UserResources';
import  UserContext  from './components/UserContext';
//import { makeStyles } from '@material-ui/core/styles';


/* CHECK IF USER LOGGED IN */
// If logged in render dashboard
// If not search ?

/* const useStyles = makeStyles({
  bg: {
    margin: '0.5rem 2rem',
    backgroundColor: 'white'
  }
})
 */
function App() {
  return (
    <UserContext>
      <Router>
        <div>
          <Header />
          {/* <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/add_resource">Add Resource</Link>
              </li>
            </ul>
          </nav> */}

        <Switch>
          {/* ADD MORE PAGES HERE */}
          <Route path="/edit_resource">
            <EditResource />
          </Route> 
          <Route path="/rate_resource">
            <RateResource />
          </Route>          
          <Route path="/add_resource">
            <AddResource />
          </Route>
          <Route path="/view_resource">
            <ViewResource />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/search/:query">
            <Search />
          </Route>
          <Route path="/user/resources">
            <UserResources />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>

    </UserContext>
  );
}

export default App;
