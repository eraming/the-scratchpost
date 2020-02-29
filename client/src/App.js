import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import './App.css';
import LandingPage from './components/pages/LandingPage/LandingPage.js'
import TopNav from './components/TopNav/TopNav.js';


class App extends Component {
  componentDidMount(){
   document.title = "scratchPost"
  }
          state = {
            newCards: [],
            availableCards: [],
            isStarred: true,
            isHidden: true
          }

  render() {
    return (

      <div className="App">

      <TopNav />
      <Switch>
        <Route exact path='/' component={LandingPage} />
      </Switch>

      </div>
    );
  }
}




export default App;
