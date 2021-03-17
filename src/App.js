import React, { useEffect, useReducer } from 'react'
import {Route, BrowserRouter  as Router, Switch} from 'react-router-dom'
import HomePage from './Components/HomePage';
import FeaturesPage from './Components/FeaturesPage'
import Introduction from './Components/Introduction'
import NavBar from './Components/NavBar/NavBar'
import { GlobalStyle } from './style';
import firebase from  './firebase'

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

export const PostContext = React.createContext()

function App() {
  const initialState = {
    images: []
  }
  const reducer = (state,action) => {
    let {type,val} = action
    switch(type){
      case "images":
        if(val) state = {...state,images:val}
        break;
      default:
        console.log('Default Case!')
    }
    return state
  }
  const [state,dispatch] = useReducer(reducer,initialState);
  const ref = firebase.firestore().collection("posts")

  var getImages = () => {
    ref.onSnapshot((querySnapshot) => {
      const items = []
      var count = 0
      querySnapshot.forEach(queryDocument => {
        items.push({id:count++,post:queryDocument.data()})
      })
      console.log('items : ',items)
      items.length > 0 && dispatch({type:'images',val:items})
    })
  }
  
  useEffect(() => {
      if(state.images.length == 0) getImages()
  },[])
  return (
    <PostContext.Provider value={{mainStates: state, mainStateDispatch: dispatch}}>
      <Router>
        <GlobalStyle/>
          <NavBar/>
          <Switch>
              <Route path='/' exact component={HomePage}/>
              <Route path='/intro' exact component={Introduction}/>
              <Route path='/features' exact component={FeaturesPage}/>
          </Switch>
      </Router>
    </PostContext.Provider>
    
  );
}

export default App;
