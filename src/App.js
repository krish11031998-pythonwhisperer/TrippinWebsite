import React from 'react'
import {Route, BrowserRouter  as Router, Switch} from 'react-router-dom'
import HomePage from './Components/HomePage';
import FeaturesPage from './Components/FeaturesPage'
import NavBar from './Components/NavBar/NavBar'
import { GlobalStyle } from './style';
function App() {
  return (
    <Router>
      <GlobalStyle/>
        <NavBar/>
        <Switch>
            <Route path='/' exact component={HomePage}/>
            <Route path='/features' exact component={FeaturesPage}/>
        </Switch>
    </Router>
  );
}

export default App;
