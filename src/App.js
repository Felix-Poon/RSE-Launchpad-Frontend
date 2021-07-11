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
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
//import Palettefrom './styles/Theme';
/* const theme = createMuiTheme({

}) */



function App() {

  return (
    <Router>
      <div>
        <Header />
        <nav>
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
          </ul>
        </nav>

        <Switch>
          {/* ADD MORE PAGES HERE */}
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
