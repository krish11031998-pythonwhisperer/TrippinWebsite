import React from 'react'
import {Route, BrowserRouter  as Router, Switch} from 'react-router-dom'
import HomePage from './Components/HomePage';
import FeaturesPage from './Components/FeaturesPage'
import Introduction from './Components/Introduction'
import NavBar from './Components/NavBar/NavBar'
import { GlobalStyle } from './style';

String.prototype.hexTorgb = function(){
  let hex = this.toLowerCase()

  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}


function App() {
  return (
    <Router>
      <GlobalStyle/>
        <NavBar/>
        <Switch>
            <Route path='/' exact component={HomePage}/>
            <Route path='/intro' exact component={Introduction}/>
            <Route path='/features' exact component={FeaturesPage}/>
        </Switch>
    </Router>
  );
}

export default App;
